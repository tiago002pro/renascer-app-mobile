import { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { ActivityIndicator } from "react-native-paper";

import UserService from "../../Profile/service/UserService";

import InputTextComponent from "../../../components/InputText";
import ButtonComponent from "../../../components/ButtonComponent";

import { THEME } from "../../../styles/theme";

export default function RecoverPassword() {
  const navigation:any = useNavigation();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  async function recoverPassword() {
    setLoading(true);
    UserService.recoverPassword(email).then(() => {
      showMessage({ message: "Confirme seu e-mail para recuperar sua senha", type: "success" })
      setLoading(false);
      navigation.navigate('SignIn');
    }).catch(() => {
      showMessage({ message: "Algo deu errado", type: "danger" })
      setLoading(false);
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uma nova senha será enviada ao seu email</Text>

      <Box style={styles.input}>
        <InputTextComponent
          label={'E-mail'}
          valiable={email}
          setValiable={setEmail}
        />
      </Box>

      <ButtonComponent
        label={'Enviar'}
        bntFunction={recoverPassword}
        isDisabled={false}
      />

      {
        loading ?
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} color={THEME.colors.primary} />
          </View>
        : null
      }
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.backgroud,
  },
  input: {
    marginBottom: 10,
  },
  title: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 10,
  },
  loading: {
    marginTop: '50%'
  },
})