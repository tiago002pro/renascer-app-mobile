import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, useWindowDimensions } from "react-native";
import { FlatList, View } from "native-base";
import { showMessage } from "react-native-flash-message";

import { useAuth } from "../../../contexts/auth";
import UserService from "../service/UserService";
import PersonService from "../service/PersonService";

import { OnboardingItem } from "../components/OnboardingItem";
import { useNavigation } from "@react-navigation/native";
import { Paginator } from "../components/Paginator";

import { THEME } from "../../../styles/theme";

const data = [
  { id: '1', title: 'Dados básicos' },
  { id: '2', title: 'Contato' },
  { id: '3', title: 'Endereço' },
]

export function EditProfile() {
  const navigation:any = useNavigation();
  const { user } = useAuth() as any;
  const { width } = useWindowDimensions();

  const [person, setPerson] = useState(null) as any;
  const [address, setAddress] = useState(null);
  const [currentIdex, setCurrentIdex] = useState(0);

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
      showMessage({ message: "Algo deu errado", type: "warning" })
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
    }
    
    onInit()
  }, [navigation])

  return (
    <View style={[styles.container, { width }]}>
      <Paginator data={data} scrollx={scrollx} />
      <View style={styles.body}>
        <FlatList
          data={data}
          renderItem={
            ({ item }) => 
            <OnboardingItem
              item={item}
              person={person}
              setPerson={setPerson}
              address={address}
              setAddress={setAddress}
              scrollTo={scrollTo}
              save={save}
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
  body: {
    flex: 3,
  },
  footer: {
    marginBottom: THEME.sizes.paddingPage * 2
  },
});
