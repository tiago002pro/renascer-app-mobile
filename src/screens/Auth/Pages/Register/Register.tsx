import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Box, Button, Text, VStack, View } from "native-base";
import { Switch } from "@rneui/themed";

import ButtonComponent from "../../../../components/ButtonComponent";
import InputTextIcon from "../../../../components/InputTextIcon";

import { THEME } from "../../../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { doRegister } from "../../Service/auth";
import WebView from "react-native-webview";

export default function Register() {
  const navigation:any = useNavigation();
  const validator = require('validator');

  const [role] = useState('USER');
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [invalidLogin, setInvalidLogin] = useState(false);

  const [agreeTermsOfUse, setAgreeTermsOfUse] = useState(false);
  const [seeAgreeTermsOfUse, setSeeAgreeTermsOfUse] = useState(false);

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

    if (!agreeTermsOfUse) {
      Alert.alert(
        'Atenção',
        'Por favor, aceite os termos e condições para continuar'
      )
    } else {
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
  }

  return(
    <VStack style={styles.container}>
      {seeAgreeTermsOfUse && (
        <Button
          onPress={() => setSeeAgreeTermsOfUse(!seeAgreeTermsOfUse)}
          backgroundColor={THEME.colors.backgroud}
          style={{right: THEME.sizes.paddingPage * 2, top: THEME.sizes.paddingPage * 2}}
          position={'absolute'}
          zIndex={1}
          _text={{
            fontFamily: 'InterTight_600SemiBold',
            fontWeight: '600',
          }}
        >
          Fechar
        </Button>
      )}

      {seeAgreeTermsOfUse && (
        <WebView
          style={{padding: THEME.sizes.paddingPage }}
          source={{ uri: 'https://igrejarenacer.blogspot.com/2024/03/terms-conditions-para-idioma-portugues.html' }}
        >
        </WebView>
      )}

      {!seeAgreeTermsOfUse && (
        <View>
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

          <Box style={[styles.data, {flexDirection: 'row', alignItems: 'center'}]}>
            <Switch
              value={agreeTermsOfUse}
              onValueChange={setAgreeTermsOfUse}
              color={THEME.colors.primary}
            />
            <Text
              style={styles.TermsOfUse}
              onPress={() => setSeeAgreeTermsOfUse(!seeAgreeTermsOfUse)}
            >
              Li e aceito os termos de uso
            </Text>
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
                fontFamily: 'InterTight_600SemiBold',
                fontWeight: '600',
                fontSize: THEME.fontSizes.sm,
                lineHeight: THEME.fontSizes.sm,
              }}
            >
              Fazer Login
            </Button>
          </Box>
        </View>
      )}
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
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    color: THEME.colors.white,
  },
  TermsOfUse: {
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.md,
    marginLeft: 10,
  }
})