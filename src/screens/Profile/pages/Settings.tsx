import { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Icon, IconButton, Image, Text, View } from "native-base";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { showMessage } from "react-native-flash-message";

import { useAuth } from "../../../contexts/auth";
import { storage } from "../../../../firebaseConfig";

import UserService from "../service/UserService";
import PersonService from "../service/PersonService";

import { THEME } from "../../../styles/theme";
import { useNavigation } from "@react-navigation/native";

export function Settings() {
  const navigation:any = useNavigation();
  const {signOut, user} = useAuth() as any;
  const [person, setPerson] = useState(null);
  const [load, setLoad] = useState(false);

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
      vectorIcon: MaterialCommunityIcons,
      icon: 'account-edit',
      colorIcon: null,
      label: 'Editar perfil',
      action: goEditProfile,
    },
    {
      id: '2',
      vectorIcon: MaterialIcons,
      icon: 'logout',
      colorIcon: null,
      label: 'Sair',
      action: out,
    },
    {
      id: '3',
      vectorIcon: MaterialIcons,
      icon: 'delete-outline',
      colorIcon: THEME.colors.red[500],
      label: 'Excluir conta',
      action: () => {},
    },
  ]

  function out():void {
    signOut()
    navigation.goBack()
		navigation.navigate('DashboardRoutes', {screen: 'Dashboard'});
  }

  function goEditProfile():void {
		navigation.navigate('EditProfile');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={'0'}
        style={styles.option}
        activeOpacity={.8}
      >
        <Box style={styles.profile}>
          <OpenCamera person={person} setPerson={setPerson} />

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
    fontWeight: '500',
    color: THEME.colors.white,
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
    color: '#FFF',
    fontWeight:'500',
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
  },
})

function OpenCamera({ person, setPerson }:any) {
  function setProfileImage(image:any) { setPerson({...person, profileImage: image}) }
  
  function handleImageUser() {
    Alert.alert(
      "Selecione",
      "Informe de onde vecê quer pegar a foto",
      [
        {
          text: "Galeria",
          onPress: async () => await pickImageFromGalery(),
          style: 'default'
        },
        {
          text: "Câmera",
          onPress: async () => await pickImageFromCamera(),
          style: 'default'
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  const pickImageFromGalery = async () => {
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
        uploadImageFirebase(result.assets[0].uri)
      }
    }
  }

  const pickImageFromCamera = async () => {
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
        uploadImageFirebase(result.assets[0].uri)
      }
    }
  }

  const uploadImageFirebase = async (file:any) => {
    try {
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
        }).catch(() => {
          showMessage({
            message: "Algo deu errado",
            type: "warning",
          })
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
    marginRight: THEME.sizes.paddingPage,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: THEME.colors.gray[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 70,
  }
})