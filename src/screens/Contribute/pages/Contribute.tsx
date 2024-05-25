import { Box, Image, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { THEME } from "../../../styles/theme";

export function Contribute() {
  return(
    <View style={styles.container}>
      <Box style={styles.box}>
        <Text style={styles.text}>IGREJA RENASCER MARINGÁ</Text>
        <Box style={styles.line}></Box>
        <Text style={styles.text}>CNPJ: 15.841.526/0001-71</Text>
      </Box>

      <Box style={styles.box}>
        <Image
          alt="pix"
          source={require('./../../../../assets/images/pix.png')}
          resizeMode='contain'
          style={styles.image}
        />
        <Text style={styles.text}>Chave CNPJ: 15.841.526/0001-71</Text>
      </Box>

      <Box style={styles.box}>
        <Image
          alt="santander"
          source={require('./../../../../assets/images/santander.png')}
          resizeMode='cover'
          style={styles.image}
        />
        <Text style={styles.text}>Agência: 0163</Text>
        <Text style={styles.text}>Conta Corrente: 13016080-7</Text>
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
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
  },
  image: {
    height: 50,
    width: '100%',
    marginBottom: 5,
  }
});