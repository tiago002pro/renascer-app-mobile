import { StyleSheet, View, ActivityIndicator } from "react-native";

import { THEME } from '../../styles/theme';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={THEME.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    alignItems: 'center',
    justifyContent: 'center',
  },
});