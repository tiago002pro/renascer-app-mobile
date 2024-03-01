import { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Text, VStack } from "native-base";

import ButtonComponent from "../../../../components/ButtonComponent";
import InputTextIcon from "../../../../components/InputTextIcon";

import { THEME } from "../../../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { doRegister } from "../../Service/auth";

export default function Register() {
  const navigation:any = useNavigation()
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [role] = useState('USER')

  async function register() {
    const result = await doRegister({name, login, password, role})
    if (result) {
      navigation.replace('SignIn')
    } else {
      console.log("Erro");
    }
  }

  return(
    <VStack style={styles.container} safeArea>
      <Box style={styles.data}>
        <InputTextIcon
          placeholder={"Nome e sobrenome"}
          passWordType={false}
          icon={"user"}
          value={name}
          onChangeText={setName}
          error={false}
        />
      </Box>

      <Box style={styles.data}>
        <InputTextIcon
          placeholder={"E-mail"}
          passWordType={false}
          icon={"mail"}
          value={login}
          onChangeText={setLogin}
          error={false}
        />
      </Box>

      <Box style={styles.data}>
        <InputTextIcon
          placeholder={"Senha"}
          passWordType={true}
          icon={"lock"}
          value={password}
          onChangeText={setPassword}
          error={false}
        />
      </Box>
      
      <ButtonComponent
        label={'Cadastrar'}
        bntFunction={register}
      />

      <Box style={styles.footerArea}>
        <Text style={styles.login}>Já possui conta?</Text>
        <Button
          onPress={() => navigation.navigate('SignIn')}
          style={styles.footerBtn}
          p={0}
          _text={{
            color: THEME.colors.primary,
            fontFamily: 'Roboto_700Bold',
            fontSize: THEME.fontSizes.sm,
            lineHeight: THEME.fontSizes.sm,
          }}
        >
          Fazer Login
        </Button>
      </Box>
    </VStack>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.backgroud,
  },
  data: {
    marginBottom: 10
  },
  footerArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerBtn: {
    backgroundColor: 'transparent',
    left: 5
  },
  login: {
    fontFamily: 'Roboto_400Regular',
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    color: THEME.colors.white,
  }
})