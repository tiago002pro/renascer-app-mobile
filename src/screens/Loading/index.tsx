import { StyleSheet, View, ActivityIndicator } from "react-native";

import { THEME } from '../../styles/theme';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={THEME.colors.orange[500]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});