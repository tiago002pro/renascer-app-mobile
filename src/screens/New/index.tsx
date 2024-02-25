import { Text, View } from "native-base";
import { StyleSheet } from "react-native";

import { THEME } from "../../../styles/theme";

export function New() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    paddingLeft: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: THEME.colors.white,
    lineHeight: 24,
    fontSize: 24,
    fontWeight: 'bold'
  }
});
