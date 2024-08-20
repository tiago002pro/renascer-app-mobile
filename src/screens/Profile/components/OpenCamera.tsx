import { Box, Image, View } from "native-base";
import { Alert, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../../../styles/theme";
import * as ImagePicker from 'expo-image-picker';
import PersonService from "../service/PersonService";

const widthScreen = Dimensions.get('screen').width - 100;

export function OpenCamera({ person, setPerson, setLoadImage }:any) {
  function setProfileImage(image:any) { setPerson({...person, profileImage: image}) }
  
  function handleImageUser() {
    Alert.alert(
      "Escolha a fonte da imagem",
      "",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
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
        }).catch(() => {
          showMessage({
            message: "Algo deu errado",
            type: "warning",
          })
        }).finally(() => {
          setLoadImage(false)
        })
      }))
    } catch(e) {
      showMessage({
        message: "Erro ao carregar a imagem",
        type: "warning",
      })
    }
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageUser} style={styles.imageContainer}>
        <Box style={styles.circle}></Box>
        <Ionicons
          name="person-circle-outline"
          size={widthScreen}
          color={THEME.colors.primary}
        />
        {
          person?.profileImage && <Image source={{uri: person?.profileImage}} resizeMode="cover" alt="Usuário" style={styles.userImage}/>
        }
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width: widthScreen,
    height: widthScreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: widthScreen - widthScreen * .25,
    width: widthScreen - widthScreen * .25,
    height: widthScreen - widthScreen * .25,
    borderWidth: widthScreen * .05,
    borderColor: THEME.colors.backgroud,
    zIndex: 9999,
    position: 'absolute',
  },
  userImage: {
    width: widthScreen - widthScreen * .30,
    height: widthScreen - widthScreen * .30,
    borderRadius: widthScreen - widthScreen * .30,
    position: 'absolute',
    zIndex: 999999,
  }
})