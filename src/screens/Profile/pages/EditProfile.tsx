import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, useWindowDimensions } from "react-native";
import { FlatList, View } from "native-base";
import { showMessage } from "react-native-flash-message";
import { ActivityIndicator } from "react-native-paper";

import { useAuth } from "../../../contexts/auth";
import UserService from "../service/UserService";
import PersonService from "../service/PersonService";

import { OnboardingItem } from "../components/OnboardingItem";
import { useNavigation } from "@react-navigation/native";
import { Paginator } from "../components/Paginator";

import { THEME } from "../../../styles/theme";

export function EditProfile({ route }:any) {
  const navigation:any = useNavigation();
  const { data } = route.params; 
  const { user } = useAuth() as any;
  const { width, height } = useWindowDimensions();

  const [person, setPerson] = useState(null) as any;
  const [address, setAddress] = useState(null);
  const [currentIdex, setCurrentIdex] = useState(0);
  const [loading, setLoading] = useState(false);

  const scrollx:any = useRef(new Animated.Value(0)).current;
  const slidesRef:any = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }:any) => {
    setCurrentIdex(viewableItems[0].index)
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    setTimeout(() => {
      if (currentIdex < data.length - 1) {
        slidesRef.current.scrollToIndex({ index: currentIdex + 1 });
      }
    })
  }

  async function save() {
    person.address = address

    await PersonService.update(person).then(() => {
      showMessage({ message: "Salvo com sucesso", type: "success"})
      navigation.navigate('Settings')
    }).catch(() => {
      showMessage({ message: "Algo deu errado", type: "danger" })
    })
  }

  async function getUser() {
    const data = await UserService.loadUser(parseInt(user.id))
    
    setPerson(data?.person)
    setAddress(data?.person?.address || {})
  }

  useEffect(() => {
    async function onInit() {
      getUser()

      setLoading(true)
      setTimeout(() => { setLoading(false) }, 1000);
    }
    
    onInit()
  }, [navigation])

  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.loading, { width, height }]} flex={1} position={'absolute'} opacity={loading ? 1 : 0}>
        <ActivityIndicator size={"large"} color={THEME.colors.primary} />
      </View>

      <Paginator data={data} scrollx={scrollx} />
      <View style={styles.body} opacity={loading ? 0 : 1}>
        <FlatList
          data={data}
          renderItem={
            ({ item }) => 
            <OnboardingItem
              item={item}
              data={person}
              setData={setPerson}
            />
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item:any) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: THEME.colors.backgroud,
  },
  loading: {
    alignContent: 'center',
    paddingTop: '70%'
  },
  body: {
    flex: 3,
  },
  footer: {
    marginBottom: THEME.sizes.paddingPage * 2
  },
});
