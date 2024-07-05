import { Box, Icon, Image, Text, View } from "native-base";
import { THEME } from "../../../styles/theme";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
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

  function goScheduleList():void {
    navigation.navigate('ScheduleRoutes', {screen: 'ScheduleList'})
  }

  function goSchedule():void {
    navigation.navigate('ScheduleRoutes', {screen: 'Schedule'})
  }

  const options = [
    {
      id: '1',
      vectorIcon: MaterialCommunityIcons,
      icon: 'calendar-blank',
      colorIcon: THEME.colors.primary,
      label: 'Agenda',
      action: goScheduleList,
    },
    {
      id: '2',
      vectorIcon: MaterialIcons,
      icon: 'event',
      colorIcon: THEME.colors.primary,
      label: 'Eventos',
      action: goSchedule,
    },
  ]

  return(
    <View style={styles.container}>
      {signed ?
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
                  size={100}
                  style={styles.icon}
                  color={THEME.colors.primary}
                />
              </Box>
            }
          </Box>

          <Box style={styles.textArea}>
            <Text style={styles.name}>{person?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </Box>
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
                color={colorIcon ? colorIcon : THEME.colors.font}
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
  option: {
    width: '100%',
    backgroundColor: THEME.colors.header,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: THEME.sizes.paddingPage,
    borderRadius: 10,
    padding: 15,
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
    marginLeft: 10,
  },
  name: {
    color: THEME.colors.font,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    fontSize: THEME.fontSizes.md,
  },
  email: {
    color: THEME.colors.primary,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    fontSize: THEME.fontSizes.sm,
  },
  label: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.font,
    fontFamily: 'InterTight_500Medium',
    fontWeight: '500',
  },
});