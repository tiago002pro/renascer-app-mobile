import { useState } from "react";
import { Alert, Modal, StyleSheet } from "react-native";
import { Box, Button, FormControl, Input, Text, VStack, View } from "native-base";
import { Switch } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NotificationService } from "../../../services/notification.service";
import { THEME } from "../../../styles/theme";
import WebView from "react-native-webview";
import InputTextIcon from "../../../components/InputTextIcon";
import ButtonComponent from "../../../components/ButtonComponent";
import AuthService from "../Service/AuthService";
import { MaterialIcons } from "@expo/vector-icons";

export default function Register() {
  const navigation:any = useNavigation();
  const validator = require('validator');

  const [role] = useState<string>('USER');
  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const [agreeTermsOfUse, setAgreeTermsOfUse] = useState<boolean>(false);
  const [seeAgreeTermsOfUse, setSeeAgreeTermsOfUse] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [codeEmailValidation, setCodeEmailValidation] = useState<string>('');
  const [codeValidation, setCodeValidation] = useState<string>('');
  const [inputModalError, setInputModalError] = useState<boolean>(false);

  function onChangeName(name:string) { setName(name); }
  function onChangeLogin(login:string) { setLogin(login); }
  function onChangePassword(password:string) { setPassword(password); }

  async function register() {
    const valid = validator.isEmail(login); 
    setValidEmail(valid);
    if (!valid) { return }

    if (!agreeTermsOfUse) {
      Alert.alert('Atenção', 'Por favor, aceite os termos e condições para continuar')
      return
    }

    setModalVisible(true)
    const codeEmailValidation = await AuthService.checkEmail(login)
    setCodeEmailValidation(codeEmailValidation)
  }

  async function doRegister() {
    if (codeEmailValidation.toString() === codeValidation.toString()) {
      setModalVisible(false)
      const expoToken = await NotificationService.getExpoNotificationToken()
      await AuthService.doRegister({name, login, password, role, expoToken})
      navigation.navigate('SignIn', { email: login })
    } else {
      setInputModalError(true)
    }
  }

  function closeModal() {
    setModalVisible(false);
    setInputModalError(false);
    setCodeValidation('')
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
          _text={{ fontFamily: 'InterTight_600SemiBold', fontWeight: '600', }}
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
              icon={"mail"}
              autoCapitalize={false}
              value={login}
              onChangeText={onChangeLogin}
              error={!validEmail}
              errorMessage={"E-mail inválido"}
            />
          </Box>

          <Box style={styles.data}>
            <InputTextIcon
              placeholder={"Senha"}
              icon={"lock"}
              autoCapitalize={false}
              value={password}
              onChangeText={onChangePassword}
              isPassword={true}
            />
          </Box>

          <Box style={[styles.data, {flexDirection: 'row', alignItems: 'center'}]}>
            <Switch
              value={agreeTermsOfUse}
              onValueChange={setAgreeTermsOfUse}
              color={THEME.colors.primary}
            />
            <Text style={styles.TermsOfUse} onPress={() => setSeeAgreeTermsOfUse(!seeAgreeTermsOfUse)}>
              Li e aceito os termos de uso
            </Text>
          </Box>
          
          <ButtonComponent
            label={'Cadastrar'}
            bntFunction={register}
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
              }}
            >
              Fazer Login
            </Button>
          </Box>
        </View>
      )}

      <Modal
        animationType='none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Box style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Insira o código enviado no seu email</Text>
            </Box>

            <Box style={styles.modalContent}>
              <FormControl
                isInvalid={inputModalError}
              >
              <Input
                value={codeValidation}
                onChangeText={setCodeValidation}
                style={styles.modalInput}
                maxLength={4}
                keyboardType={'numeric'}
                autoFocus={true}
                _focus={{ backgroundColor: 'transparent', borderColor: inputModalError ? THEME.colors.red[500] : THEME.colors.white }}
              />

                <FormControl.ErrorMessage position={'absolute'} bottom={-20} leftIcon={<MaterialIcons name={"error"} size={15} color={THEME.colors.red[400]} />}>
                  Código inválido
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>

            <Box style={styles.modalFooter}>
              <ButtonComponent
                label="Confirmar"
                bntFunction={doRegister}
                color={THEME.colors.backgroud}
              />

              <ButtonComponent
                label="Fechar"
                bntFunction={closeModal}
                color={THEME.colors.white}
                bg={THEME.colors.gray[500]}
              />
            </Box>
          </View>
        </View>
      </Modal>
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
    color: THEME.colors.white,
  },
  TermsOfUse: {
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.md,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginTop: '-50%',
  },
  modalView: {
    width: '85%',
    backgroundColor: THEME.colors.gray[800],
    borderRadius: 10,
    padding: THEME.sizes.paddingPage * 2,
  },
  modalHeader: {
    display: 'flex',
    marginBottom: 30,
  },
  modalTitle: {
    fontFamily: 'InterTight_700Bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.white,
  },
  modalInput: {
    borderColor: THEME.colors.white,
    color: THEME.colors.white,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'InterTight_700Bold',
    fontWeight: '700',
    letterSpacing: 5,
  },
  modalContent: {
    marginBottom: 30,
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})