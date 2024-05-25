import { useEffect, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { Box, VStack, Image, Text, Icon, View, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/auth";
import UserService from "../service/UserService";
import { DataAccordion } from "../helper/DataAccordion";
import { THEME } from "../../../styles/theme";
import data from '../helper/DataProfile';
import Loading from "../../Loading";

export function Profile() {
  const navigation:any = useNavigation();
  const { user } = useAuth() as any;
  const [person, setPerson] = useState(null) as any;
  const [currentSection, setCurrentSection] = useState(null) as any;
  const [load, setLoad] = useState(false);

  async function getUser() {
    const data = await UserService.loadUser(parseInt(user.id))
    setPerson(data?.person)
  }

  function goToEdit(item:any):void {
    navigation.navigate('Edit', { item: item, data: person, })
  }

  useEffect(() => {
    function onInit() {
      navigation.addListener('focus', () => setLoad(!load))
      getUser()
    }
    onInit()
  }, [load, navigation])

  
  if (!person) {
    return <Loading/>;
  }

  return (
    <VStack style={styles.container}>
      <ScrollView>
        <Box style={styles.containerProfile}>
          <Box style={styles.profile}>
            <Box style={styles.box}>
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
            </Box>
          </Box>
            
          <Box style={styles.textArea}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
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
  box: {
    marginBottom: 15,
  },
  imgContainer: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 132,
    width: 132,
    height: 132,
    borderWidth: 5,
    borderColor: THEME.colors.header,
    zIndex: 999999,
    position: 'absolute'
  },
  icon: {
    zIndex: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  textArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#FFF',
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    marginBottom: 5,
  },
  email: {
    color: THEME.colors.primary,
    fontFamily: 'InterTight_300Light',
    fontWeight: '300',
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
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
    lineHeight: THEME.fontSizes.md,
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
    color: THEME.colors.white,
  },
  component: {
    width: '100%',
    padding: THEME.sizes.paddingPage,
  },
  item: {
    display: 'flex',
    marginBottom: 20,
    borderWidth: 1,
    borderBottomColor: THEME.colors.font,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  label: {
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    color: THEME.colors.font,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    marginBottom: 5,
  },
  value: {
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    color: THEME.colors.font,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    marginBottom: 5,
  },
})