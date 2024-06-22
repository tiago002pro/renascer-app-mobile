import { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Icon, Image, Text, View } from "native-base";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/auth";
import UserService from "../service/UserService";
import { THEME } from "../../../styles/theme";
import { useNavigation } from "@react-navigation/native";

export function Settings() {
  const navigation:any = useNavigation();
  const {signOut, user} = useAuth() as any;

  const [person, setPerson] = useState(null) as any;
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
      vectorIcon: Entypo,
      icon: 'text-document-inverted',
      colorIcon: THEME.colors.primary,
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
      <Box style={styles.option}>
        <Box style={styles.profile}>
          <Box style={styles.imgContainer}>
            {person?.profileImage ? 
              <Image
                source={{uri: person?.profileImage}}
                alt="User"
                style={styles.image}
              />
              :
              <Box style={styles.imgContainer}>
                <Box style={styles.circle}></Box>
                <Ionicons
                  name="person-circle-outline"
                  size={180}
                  style={styles.icon}
                  color={THEME.colors.primary}
                />
              </Box>
            }
          </Box>
          <Box style={styles.textArea}>
            <Text style={styles.name}>{user?.name}</Text>
          </Box>
        </Box>
      </Box>

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
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
  },
  imgContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 74,
    width: 74,
    height: 74,
    borderWidth: 5,
    borderColor: THEME.colors.header,
    zIndex: 999999,
    position: 'absolute',
  },
  icon: {
    zIndex: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 95,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  textArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  name: {
    color: THEME.colors.white,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    fontSize: THEME.fontSizes.md,
  },
})