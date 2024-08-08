import { Dimensions, StyleSheet, View } from "react-native";

import { THEME } from '../../styles/theme';
import { ActivityIndicator } from "react-native-paper";

const {width, height} = Dimensions.get('screen')

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={THEME.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: THEME.colors.backgroud,
    alignItems: 'center',
    justifyContent: 'center',
  },
});