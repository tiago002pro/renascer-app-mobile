import { useEffect, useState } from "react";
import { Alert, Dimensions, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Icon, IconButton, Image, Text, View } from "native-base";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { showMessage } from "react-native-flash-message";
import { ActivityIndicator } from "react-native-paper";

import { useAuth } from "../../../contexts/auth";
import { storage } from "../../../../firebaseConfig";

import UserService from "../service/UserService";
import PersonService from "../service/PersonService";

import { THEME } from "../../../styles/theme";
import { useNavigation } from "@react-navigation/native";

const {width, height} = Dimensions.get('screen')

export function Settings() {
  const navigation:any = useNavigation();
  const {signOut, user} = useAuth() as any;

  const [person, setPerson] = useState(null);
  const [load, setLoad] = useState(false);
  const [loadImage, setLoadImage] = useState(false);

  useEffect(() => {
    function onInit() {
      navigation.addListener('focus', () => setLoad(!load))
      getUser()
    }

    onInit()
  }, [load, navigation])

  async function getUser() {
    if (!!load) {
      const data = await UserService.loadUser(parseInt(user.id))
      setPerson(data?.person)
    }
  }

  const options = [
    {
      id: '1',
      vectorIcon: Entypo,
      icon: 'text-document-inverted',
      colorIcon: null,
      label: 'Política de privacidade',
      action: goPrivacyPolicy,
    },
    {
      id: '2',
      vectorIcon: Entypo,
      icon: 'trash',
      colorIcon: THEME.colors.red[500],
      label: 'Excluir conta',
      action: goDeleteAccount,
    },
    {
      id: '3',
      vectorIcon: Entypo,
      icon: 'log-out',
      colorIcon: THEME.colors.red[500],
      label: 'Sair',
      action: alertOut,
    },
  ]

  function goPrivacyPolicy():void {
		Linking.openURL("https://igrejarenacer.blogspot.com/2024/03/terms-conditions-para-idioma-portugues.html");
  }

  function goDeleteAccount():void {
		navigation.navigate('DeleteProdile');
  }

  function alertOut():void {
    Alert.alert(
      'Atenção',
      'Tem certeza que gostaria de sair?',
      [
        {
          text: "Sair",
          onPress: out,
          style: 'default',
        },
        {
          text: "Cancelar",
          onPress: (() => {}),
          style: 'default'
        },
      ],
    )
  }

  function out():void {
    signOut()
    navigation.goBack()
		navigation.navigate('DashboardRoutes', {screen: 'Dashboard'});
  }
  

  return (
    <View style={styles.container}>
      {loadImage?
        <Box flex={1} w={width} h={height} position={'absolute'} zIndex={1} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
          <ActivityIndicator size={"large"} color={THEME.colors.primary} style={{bottom: '20%'}}/>
        </Box>
        : null
      }

      <TouchableOpacity
        key={'0'}
        style={styles.option}
        activeOpacity={.8}
      >
        <Box style={styles.profile}>
          <OpenCamera person={person} setPerson={setPerson} setLoadImage={setLoadImage} />

          <Box style={styles.textArea}>
            <Text style={styles.name}>{user?.name}</Text>
          </Box>
        </Box>
      </TouchableOpacity>

      {options.map(({id, vectorIcon, icon, colorIcon, label, action}) => {
        return (
          <TouchableOpacity
            key={id}
            onPress={action}
            style={styles.option}
            activeOpacity={.8}
          >
            <Icon
              as={vectorIcon}
              name={icon}
              color={colorIcon ? colorIcon : THEME.colors.white}
              size={5}
              mr={2}
            />
            <Text style={styles.label}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.backgroud,
  },
  option: {
    width: '100%',
    backgroundColor: THEME.colors.header,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.sizes.paddingPage,
    borderRadius: 10,
    padding: 15,
  },
  label: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.white,
    fontFamily: 'Roboto_500Medium',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
  },
  textArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: THEME.colors.white,
    fontFamily: 'Roboto_500Medium',
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
  },
})

function OpenCamera({ person, setPerson, setLoadImage }:any) {
  function setProfileImage(image:any) { setPerson({...person, profileImage: image}) }
  
  function handleImageUser() {
    Alert.alert(
      "Selecione",
      "Informe de onde vecê quer pegar a foto",
      [
        {
          text: "Galeria",
          onPress: async () => await pickImageFromGalery(setLoadImage),
          style: 'default'
        },
        {
          text: "Câmera",
          onPress: async () => await pickImageFromCamera(setLoadImage),
          style: 'default'
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  const pickImageFromGalery = async (setLoadImage:Function) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      showMessage({
        message: "São necessárias permissões da galeria",
        type: "warning",
      })
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        uploadImageFirebase(result.assets[0].uri, setLoadImage)
      }
    }
  }

  const pickImageFromCamera = async (setLoadImage:Function) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== "granted") {
      showMessage({
        message: "São necessárias permissões da câmera",
        type: "warning",
      })
      await ImagePicker.requestCameraPermissionsAsync()
    } else {
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
  
      if (!result.canceled) {
        uploadImageFirebase(result.assets[0].uri, setLoadImage)
      }
    }
  }

  const uploadImageFirebase = async (file:any, setLoadImage:Function) => {
    try {
      setLoadImage(true);
      const response = await fetch(file);
      const blob = await response.blob();
      const storageRef  = ref(storage, `users/${person.id}`);
      
      uploadBytesResumable(storageRef, blob).then((snapshot) => getDownloadURL(snapshot.ref).then(async (downloadURL:any) => {
        setProfileImage(downloadURL)
        person.profileImage = downloadURL
        
        await PersonService.update(person).then(() => {
          showMessage({
            message: "Foto do perfil atualizada com sucesso!",
            type: "success",
          })
          setLoadImage(false)
        }).catch(() => {
          showMessage({
            message: "Algo deu errado",
            type: "warning",
          })
          setLoadImage(false)
        })
      }))
    } catch(e) {
      console.log("error", e);
      showMessage({
        message: "Erro ao carregar a imagem",
        type: "warning",
      })
    }
  }
  
  return (
    <View style={stylesOpenCamera.container}>
      <Box style={stylesOpenCamera.imgContainer}>
        {person?.profileImage ?
          <Image
            resizeMode="cover"
            style={stylesOpenCamera.img}
            source={{
              uri: person?.profileImage,
            }}
            alt="user"
          />
          :
          <Ionicons
            name="person-circle"
            size={80}
            style={stylesOpenCamera.icon}
            color={THEME.colors.white}
          />
        }
      </Box>

      <Box position={'absolute'} bottom={-10} right={-10}>
        <IconButton
          onPress={handleImageUser}
          padding={3}
          backgroundColor={THEME.colors.backgroud}
          icon={<Icon as={MaterialIcons} name="add-a-photo"/>}
          borderRadius={'full'}
          _icon={{
            color: THEME.colors.white,
            size: 4
          }}
        />
      </Box>
    </View>
  );
}

export const stylesOpenCamera = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: THEME.sizes.paddingPage * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: 80,
    height: 80,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: THEME.colors.white,
  }
})