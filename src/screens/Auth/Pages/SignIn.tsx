import { useState } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Box, Button, Image, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/auth";
import { THEME } from "../../../styles/theme";
import InputTextIcon from "../../../components/InputTextIcon";
import ButtonComponent from "../../../components/ButtonComponent";
const { height } = Dimensions.get('screen');
// let logo = require('./../../../../assets/images/logo-cor-2.png')
const logo = 'https://firebasestorage.googleapis.com/v0/b/renascer-app.appspot.com/o/images%2Flogo-cor-2.png?alt=media&token=0277a234-2f18-41d7-9b54-a1afe7c35d7c';

export default function SignIn({ route }:any) {
  const { signIn } = useAuth();
  const navigation:any = useNavigation();
  const validator = require('validator');

  const [email, setEmail] = useState<string>(route?.params?.email);
  const [password, setPassword] = useState<string>('');
  
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);

  function onChangeEmail(email:string) { setEmail(email); }
  function onChangePassword(password:string) { setPassword(password); }

  async function handleSignIn() {
    const valid = validator.isEmail(email);
    setValidEmail(valid)
    if (!valid) { return }

    const success = await signIn(email, password);
    if (success) { navigation.navigate('TabRoutes', {screen:'DashboardRoutes'}); }
    else { setValidPassword(false) }
  }

  function handleRegister() { navigation.navigate('Register'); }
  function goToRecoverPassword() { navigation.navigate('RecoverPassword'); }

  return (
    <VStack style={styles.container}>
      <Box style={styles.containerLogo}>
        <Image
          source={{uri: logo}}
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
            error={!validEmail}
            errorMessage={"Email inválido"}
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
            isPassword={true}
            error={!validPassword}
            errorMessage={"Senha inválida"}
          />
        </Box>

        <TouchableWithoutFeedback onPress={goToRecoverPassword}>
          <Text style={styles.forgotPassword}>Esqueci a senha</Text>
        </TouchableWithoutFeedback>
       
        <ButtonComponent
          label={'Entrar'}
          bntFunction={handleSignIn}
          isDisabled={!(email && email.length > 0 && password.length > 0)}
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
              fontFamily: 'InterTight_600SemiBold',
              fontWeight: '600',
              fontSize: THEME.fontSizes.sm,
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
    height: (height * .2) / 1.5,
    width: '100%',
  },
  containerData: {
    height: height * .85,
    padding: THEME.sizes.paddingPage,
  },
  data: {
    marginBottom: 20,
  },
  forgotPassword: {
    fontFamily: 'InterTight_700Bold',
    fontWeight: '700',
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.white,
    marginBottom: 20,
    textAlign: 'right',
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
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.white,
  }
});