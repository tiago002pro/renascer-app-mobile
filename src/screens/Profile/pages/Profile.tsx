import { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Box, VStack, Image, Text, Icon, View, ScrollView } from "native-base";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import { useAuth } from "../../../contexts/auth";
import UserService from "../service/UserService";

import InfoProfile from "../components/InfoProfile";

import { THEME } from "../../../styles/theme";
const { height } = Dimensions.get('screen');
import data from '../helper/DataProfile';
import { useNavigation } from "@react-navigation/native";

export function Profile() {
  const navigation:any = useNavigation();
  const { user } = useAuth() as any;

  const [person, setPerson] = useState(null) as any;
  const [currentSection, setCurrentSection] = useState(null) as any;
  const [load, setLoad] = useState(false);

  async function getUser() {
    // if (!!load) {
      const data = await UserService.loadUser(parseInt(user.id))
      setPerson(data?.person)
    // }
  }

  useEffect(() => {
    function onInit() {
      navigation.addListener('focus', () => setLoad(!load))
      getUser()
    }
    onInit()
  }, [load, navigation])

  return (
    <VStack style={styles.container}>
      <ScrollView>
        <Box style={styles.containerProfile}>
          <Box style={styles.profile}>
            <Box style={styles.imageArea}>
              {person?.profileImage ? 
                <Image
                  source={{uri: person?.profileImage}}
                  alt="User"
                  style={styles.image}
                />
                :
                <Ionicons
                  name="person-circle"
                  size={130}
                  style={styles.icon}
                  color={THEME.colors.white}
                />
              }
            </Box>
            
            <Box style={styles.textArea}>
              <Text style={styles.name}>{user?.name}</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </Box>
          </Box>
        </Box>

        <Box style={styles.containerData}>
          {data.map(({title, icon, vectorIcon, route, key}) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  setCurrentSection(key === currentSection ? null : key)
                }}
                activeOpacity={0.8}
                style={styles.accordion}
              >
                <Box style={styles.area}>
                  <Box style={styles.data}>
                    <Box style={styles.iconArea}>
                      <Icon
                        as={vectorIcon}
                        name={icon}
                        color={THEME.colors.white}
                        size={7}
                      />
                    </Box>

                    <View style={styles.infoArea}>
                      <Text style={styles.title}>{title}</Text>
                    </View>
                  </Box>

                  <Animated.View
                    style={
                      [styles.arrowArea, {
                        transform: [{rotate: key === currentSection ? '180deg' : '0deg'}]
                      }]
                    }
                  >
                    <SimpleLineIcons name={'arrow-down'} style={styles.arrowIcon} size={20} />
                  </Animated.View>
                </Box>

                {key === currentSection && (
                  <View style={styles.component}>
                    <InfoProfile
                      section={key}
                      person={person}
                    />
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </Box>
      </ScrollView>
    </VStack>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
  },
  containerProfile: {
    
  },
  containerData: {
    height: height * .7,
    paddingLeft: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.backgroud,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  profile: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  imageArea: {
    width: 125,
    height: 125,
    borderRadius: 125,
    marginBottom: 20,
    backgroundColor: THEME.colors.gray[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 130,
    height: 130,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 130,
  },
  textArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#FFF',
    fontWeight:'500',
    fontSize: THEME.fontSizes.lg + 10,
    lineHeight: THEME.fontSizes.lg + 10,
    marginBottom: 5,
  },
  email: {
    color: THEME.colors.gray[400],
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    fontWeight: '500'
  },
  accordion: {
    width: '100%',
    backgroundColor: THEME.colors.header,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: THEME.sizes.paddingPage,
    borderRadius: 10,
  },
  area: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconArea: {
    marginRight: 10,
  },
  infoArea: {
  },
  title: {
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    fontFamily: 'Roboto_700Bold',
    color: THEME.colors.white,
  },
  arrowArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    color: THEME.colors.white,
  },
  component: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
})