import { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Box, VStack, Text, Icon, View, ScrollView } from "native-base";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/auth";
import UserService from "../service/UserService";
import { DataAccordion } from "../helper/DataAccordion";
import { THEME } from "../../../styles/theme";
import data from '../helper/DataProfile';
import { OpenCamera } from "../components/OpenCamera";
import { ActivityIndicator } from "react-native-paper";
import NotificationService from "../service/NotificationService";

const {width, height} = Dimensions.get('screen')

export function Profile() {
  const navigation:any = useNavigation();
  const isFocused = useIsFocused();
  const { user } = useAuth() as any;
  const [person, setPerson] = useState(null) as any;
  const [currentSection, setCurrentSection] = useState(null) as any;
  const [loading, setLoading] = useState(false)  as any;

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);

    getUser()
    checkIfThereAreNotifications()
  }, [isFocused, navigation])

  async function getUser() {
    const data = await UserService.loadUser(parseInt(user.id))
    setPerson(data?.person)
  }

  async function checkIfThereAreNotifications() {
    if (user && user.id) {
      NotificationService.checkIfThereAreNotifications(user.id).then((reponse) => {
        navigation.setParams({ hasNotification: reponse });
      })
    }
  }

  function goToEdit(item:any):void {
    navigation.navigate('Edit', { item: item, data: person, })
  }
  
  return (
    <VStack style={styles.container}>
      {loading?
        <Box w={width} h={height - 200} bg={THEME.colors.backgroud} justifyContent={'center'}>
          <ActivityIndicator size={"large"} color={THEME.colors.primary}/>
        </Box>
        : null
      }

      <ScrollView>
        <Box style={styles.containerProfile}>
          <Box style={styles.profile}>
            <OpenCamera person={person} setPerson={setPerson} setLoadImage={setLoading} />
          </Box>
            
          <Box style={styles.textArea}>
            <Text style={styles.name}>{person?.name}</Text>
            <Text style={styles.email}>{person?.email}</Text>
          </Box>
        </Box>

        <Box style={styles.containerData}>
          {data.map(({id, title, icon, vectorIcon, key}) => {
            return (
              <TouchableOpacity
                key={id.toString()}
                id={id.toString()}
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
                        color={THEME.colors.primary}
                        size={10}
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
                    <ScrollView id={key}>
                      {
                        DataAccordion.getData(person, key).map((item:any, i:number) => {
                          return(
                          <TouchableOpacity
                            key={i}
                            style={styles.item}
                            onPress={() => goToEdit(item)}
                          >
                            <Text style={styles.label}>{item.label}</Text>
                            <Text style={styles.value}>{item.getValue}</Text>
                          </TouchableOpacity>
                          );
                        })
                      }
                      {/* <ButtonComponent
                        bg={THEME.colors.gray[500]}
                        label="Editar"
                        bntFunction={() => navigation.navigate('EditProfile', {data: DataAccordion.getData(person, key)})}
                      /> */}
                    </ScrollView>
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
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 30,
  },
  containerData: {
    paddingLeft: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.backgroud,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  textArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: THEME.colors.font,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    fontSize: THEME.fontSizes.lg,
  },
  email: {
    color: THEME.colors.primary,
    fontFamily: 'InterTight_300Light',
    fontWeight: '300',
    fontSize: THEME.fontSizes.sm,
  },
  accordion: {
    width: '100%',
    backgroundColor: THEME.colors.tabBar,
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
    padding: THEME.sizes.paddingPage,
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconArea: {
    marginRight: THEME.sizes.paddingPage,
  },
  infoArea: {
  },
  title: {
    fontSize: THEME.fontSizes.md,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.font,
  },
  arrowArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    color: THEME.colors.font,
  },
  component: {
    width: '100%',
    padding: THEME.sizes.paddingPage,
  },
  item: {
    display: 'flex',
    marginBottom: 20,
    borderWidth: 1,
    borderBottomColor: THEME.colors.gray[600],
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  label: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.font,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    marginBottom: 5,
  },
  value: {
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.font,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    marginBottom: 5,
  },
})