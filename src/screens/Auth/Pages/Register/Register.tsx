import { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Text, VStack } from "native-base";

import ButtonComponent from "../../../../components/ButtonComponent";
import InputTextIcon from "../../../../components/InputTextIcon";

import { THEME } from "../../../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { doRegister } from "../../Service/auth";
import { showMessage } from "react-native-flash-message";

export default function Register() {
  const navigation:any = useNavigation();
  const validator = require('validator');

  const [role] = useState('USER');
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [invalidLogin, setInvalidLogin] = useState(false);

  function onChangeName(name:string) {
    (
      (name.length > 1)
        && (login.length > 1)
        && (password.length > 1)
    ) ? setDisabledBtn(false) : setDisabledBtn(true)

    setName(name);
  }

  function onChangeLogin(login:string) {
    (
      (name.length > 1)
        && (login.length > 1)
        && (password.length > 1)
    ) ? setDisabledBtn(false) : setDisabledBtn(true)

    setLogin(login);
    setInvalidLogin(false);
  }

  function onChangePassword(password:string) {
    (
      (name.length > 1)
        && (login.length > 1)
        && (password.length > 1)
    ) ? setDisabledBtn(false) : setDisabledBtn(true)

    setPassword(password);
  }

  async function register() {
    const valid = validator.isEmail(login);
    
    if (!valid) {
      setInvalidLogin(true);
    } else {
      const result = await doRegister({name, login, password, role})
      if (result) {
        navigation.replace('SignIn')
      } else {
        console.log("Erro");
      }
    }
  }

  return(
    <VStack style={styles.container}>
      <Box style={styles.data}>
        <InputTextIcon
          placeholder={"Nome e sobrenome"}
          show={true}
          icon={"user"}
          autoCapitalize={true}
          value={name}
          onChangeText={onChangeName}
          error={false}
        />
      </Box>

      <Box style={styles.data}>
        <InputTextIcon
          placeholder={"E-mail"}
          show={true}
          icon={"mail"}
          autoCapitalize={false}
          value={login}
          onChangeText={onChangeLogin}
          error={invalidLogin}
          errorMessage={"E-mail inválido"}
        />
      </Box>

      <Box style={styles.data}>
        <InputTextIcon
          placeholder={"Senha"}
          show={false}
          icon={"lock"}
          autoCapitalize={false}
          value={password}
          onChangeText={onChangePassword}
          error={false}
        />
      </Box>
      
      <ButtonComponent
        label={'Cadastrar'}
        bntFunction={register}
        isDisabled={disabledBtn}
        color={THEME.colors.header}
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