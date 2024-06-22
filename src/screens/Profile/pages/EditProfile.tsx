import { useRef, useState } from "react";
import { Animated, StyleSheet, useWindowDimensions } from "react-native";
import { FlatList, View } from "native-base";
import { ActivityIndicator } from "react-native-paper";
import { OnboardingItem } from "../components/OnboardingItem";
import { Paginator } from "../components/Paginator";
import { THEME } from "../../../styles/theme";

export function EditProfile({ route }:any) {
  const { data } = route.params; 
  const { width, height } = useWindowDimensions();
  const [person, setPerson] = useState<any>(null);
  const scrollx:any = useRef(new Animated.Value(0)).current;
  const slidesRef:any = useRef(null);

  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.loading, { width, height }]} flex={1} position={'absolute'}>
        <ActivityIndicator size={"large"} color={THEME.colors.primary} />
      </View>

      <Paginator data={data} scrollx={scrollx} />
      <View style={styles.body}>
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
