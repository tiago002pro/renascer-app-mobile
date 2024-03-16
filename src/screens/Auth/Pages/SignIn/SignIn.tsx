import { useState } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Box, Button, Image, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import InputTextIcon from "../../../../components/InputTextIcon";
import ButtonComponent from "../../../../components/ButtonComponent";

import { useAuth } from "../../../../contexts/auth";
import { THEME } from "../../../../styles/theme";

const { height } = Dimensions.get('screen');

export default function SignIn() {
  const navigation:any = useNavigation();
  const {signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);

  function onChangeEmail(email:string) {
    (email.length > 1) && (password.length > 1) ? setDisabledBtn(false) : setDisabledBtn(true)
    setEmail(email);
  }

  function onChangePassword(password:string) {
    (password.length > 1) && (email.length > 1) ? setDisabledBtn(false) : setDisabledBtn(true)
    setPassword(password);
  }

  async function handleSignIn() {
    const success = await signIn(email, password);
    
    if (success) {
      setSignInError(false)
      navigation.navigate('TabRoutes', {screen:'DashboardRoutes'});
    } else {
      setSignInError(true)
    }
  }

  function handleRegister() {
    navigation.navigate('Register')
  }

  function goToRecoverPassword() {
    navigation.navigate('RecoverPassword')
  }

  return (
    <VStack style={styles.container}>
      <Box style={styles.containerLogo}>
        <Image
          source={require("'./../../../../../assets/images/logo-cor-2.png")}
          alt="logo"
          style={styles.logo}
          resizeMode='contain'
        />
      </Box>

      <Box style={styles.containerData}>
        <Box style={styles.data}>
          <InputTextIcon
            label={"E-mail"}
            placeholder={"E-mail"}
            icon={"mail"}
            autoCapitalize={false}
            value={email}
            onChangeText={onChangeEmail}
            show={true}
            error={false}
          />
        </Box>

        <Box style={styles.data}>
          <InputTextIcon
            label={"Senha"}
            placeholder={"Senha"}
            icon={"lock"}
            autoCapitalize={false}
            value={password}
            onChangeText={onChangePassword}
            show={false}
            error={signInError}
            errorMessage={"Senha inválida"}
          />
        </Box>

        <TouchableWithoutFeedback onPress={goToRecoverPassword}>
          <Text style={styles.forgotPassword}>
            Esqueci a senha
          </Text>
        </TouchableWithoutFeedback>
       
        <ButtonComponent
          label={'Entrar'}
          bntFunction={handleSignIn}
          isDisabled={disabledBtn}
          color={THEME.colors.header}
        />

        <Box style={styles.footerArea}>
          <Text style={styles.register}>Não possui conta?</Text>
          <Button
            onPress={handleRegister}
            style={styles.footerBtn}
            p={0}
            _text={{
              color: THEME.colors.primary,
              fontFamily: 'Roboto_700Bold',
              fontSize: THEME.fontSizes.sm,
              lineHeight: THEME.fontSizes.sm,
            }}
          >
            Cadastre-se
          </Button>
        </Box>
      </Box>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: THEME.colors.backgroud,
  },
  containerLogo: {
    height: height * .15,
    alignItems: "center",
  },
  logo: {
    height: (height * .2) / 2,
  },
  containerData: {
    height: height * .85,
    padding: THEME.sizes.paddingPage,
  },
  data: {
    marginBottom: 20,
  },
  forgotPassword: {
    fontFamily: 'Roboto_500Medium',
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    color: THEME.colors.white,
    marginBottom: 20,
    textAlign: 'right',
  },
  label: {
    fontFamily: 'Roboto_400Regular',
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    color: THEME.colors.white,
    marginBottom: 5,
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
  register: {
    fontFamily: 'Roboto_400Regular',
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    color: THEME.colors.white,
  }
});