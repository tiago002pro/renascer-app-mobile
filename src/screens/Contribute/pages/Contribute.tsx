import { Box, Image, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { THEME } from "../../../styles/theme";

export function Contribute() {
  return(
    <View style={styles.container}>
      <Box style={styles.box}>
        <Text style={styles.text}>FAMILIA JESUSCOPY</Text>
        <Box style={styles.line}></Box>
        <Text style={styles.text}>CNPJ: 33.0001.460/0001-93</Text>
      </Box>

      <Box style={styles.box}>
        <Image
          alt="pix"
          source={require('./../../../../assets/images/pix.png')}
          resizeMode='contain'
          style={styles.image}
        />
        <Text style={styles.text}>Chave CNPJ: 33.0001.460/0001-93</Text>
      </Box>

      <Box style={styles.box}>
        <Image
          alt="santander"
          source={require('./../../../../assets/images/santander.png')}
          resizeMode='cover'
          style={styles.image}
        />
        <Text style={styles.text}>341 - Agência: 0680</Text>
        <Text style={styles.text}>Conta Corrente: 27350-5</Text>
      </Box>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: THEME.sizes.paddingPage * 2,
    backgroundColor: THEME.colors.backgroud,
  },
  line: {
    backgroundColor: THEME.colors.primary,
    height: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  box: {
    marginBottom: 10,
    backgroundColor: THEME.colors.header,
    padding: THEME.sizes.paddingPage * 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.white,
    fontFamily: 'Roboto_700Bold',
  },
  image: {
    height: 50,
    width: '100%',
    marginBottom: 5,
  }
});