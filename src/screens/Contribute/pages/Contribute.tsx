import { Box, Image, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { THEME } from "../../../styles/theme";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";

let logoPix = require('./../../../../assets/images/pix.png')
let logoSicoob = require('./../../../../assets/images/sicoob.png')

export function Contribute() {
  function copyPix() {
    Clipboard.setStringAsync('15841526000171')
    showMessage({ message: "A chave pix foi copiada para a área de transferência.", type: "success"})
  }

  return(
    <View style={styles.container}>
      <Box style={styles.box}>
        <Text style={styles.text}>IGREJA RENASCER MARINGÁ</Text>
        <Box style={styles.line}></Box>
        <Text style={styles.text}>CNPJ: 15.841.526/0001-71</Text>
      </Box>

      <TouchableOpacity style={styles.box} onPress={copyPix}>
        <Box style={styles.copyIcon}>
          <MaterialIcons name="content-copy" color={THEME.colors.font} size={30}/>
        </Box>

        <Image
          alt="pix"
          source={logoPix}
          resizeMode='contain'
          style={styles.image}
        />
        <Text style={styles.text}>CHAVE PIX: 15.841.526/0001-71</Text>
      </TouchableOpacity>

      <Box style={styles.box}>
        <Image
          alt="Sicoob"
          source={logoSicoob}
          resizeMode='contain'
          style={styles.image}
        />
        <Text style={styles.text}>Cooperativa: 4340</Text>
        <Text style={styles.text}>Conta Corrente: 155.246-5</Text>
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
    color: THEME.colors.font,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
  },
  image: {
    height: 40,
    width: '100%',
    marginBottom: 20,
  },
  copyIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 12
  }
});