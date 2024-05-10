import { Box, Icon, Image, Text, View } from "native-base";
import { THEME } from "../../../styles/theme";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/auth";
import { useEffect, useState } from "react";
import UserService from "../../Profile/service/UserService";

export function More() {
  const navigation:any = useNavigation();
  const { signed, user } = useAuth() as any;
  const [person, setPerson] = useState(null) as any;
  const [load, setLoad] = useState(false);

  async function getUser() {
    const data = await UserService.loadUser(parseInt(user.id))
    setPerson(data?.person)
  }

  useEffect(() => {
    function onInit() {
      navigation.addListener('focus', () => setLoad(!load))
      if (signed) {
        getUser()
      }
    }
    onInit()
  }, [load, navigation]) 

  function goSchedule():void {
		navigation.navigate('ScheduleRoutes', {screen: 'Schedule'});
  }

  const options = [
    {
      id: '1',
      vectorIcon: Entypo,
      icon: 'text-document-inverted',
      colorIcon: THEME.colors.primary,
      label: 'Eventos',
      action: goSchedule,
    },
  ]

  return(
    <View style={styles.container}>
      {signed ?
        <Box style={styles.profile}>
          <Box style={styles.box}>
            <Box style={styles.imgContainer}>
              {person?.profileImage ?
                <Image
                  resizeMode="cover"
                  style={styles.img}
                  source={{uri: person?.profileImage}}
                  alt="User"
                />
                :
                <Box style={styles.imgContainer}>
                  <Box style={styles.circle}></Box>
                  <Ionicons
                    name="person-circle-outline"
                    size={100}
                    style={styles.icon}
                    color={THEME.colors.primary}
                  />
                </Box>
              }
            </Box>
          </Box>

          <Box style={styles.textArea}>
            <Text style={styles.name}>{user?.name}</Text>
          </Box>
        </Box>
        :
        null
      }

      {options.map(({id, vectorIcon, icon, colorIcon, label, action}) => {
        return (
          <TouchableOpacity
            key={id}
            onPress={action}
            style={styles.option}
            activeOpacity={.8}
          >
            <Box flexDir={'row'}>
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
            </Box>

            <Box>
              <MaterialIcons
                name="arrow-forward"
                color={THEME.colors.primary}
                size={20}
              />
            </Box>
          </TouchableOpacity>
        )
      })}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.backgroud,
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: THEME.colors.header,
    borderRadius: 10,
    padding: THEME.sizes.paddingPage,
    marginBottom: 10,
  },
  box: {
    marginRight: THEME.sizes.paddingPage
  },
  imgContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 72,
    width: 72,
    height: 72,
    borderWidth: 5,
    borderColor: THEME.colors.header,
    zIndex: 999999,
    position: 'absolute'
  },
  icon: {
    width: 100,
    height: 100,
    zIndex: 0,
    position: 'absolute'
  },
  img: {
    width: 95,
    height: 95,
    borderRadius: 95,
    borderWidth: 5,
    borderColor: THEME.colors.primary,
  },
  option: {
    width: '100%',
    backgroundColor: THEME.colors.header,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});