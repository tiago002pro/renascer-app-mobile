import { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import UserService from "../service/UserService";
import { useAuth } from "../../../contexts/auth";

import InputTextComponent from "../../../components/InputText";
import ButtonComponent from "../../../components/ButtonComponent";

import { THEME } from "../../../styles/theme";

export function RecoverPassword() {
  const navigation:any = useNavigation();
  const {signOut, user} = useAuth() as any;
  const [email, setEamil] = useState('');

  // async function recoverPassword() {
  //   if (user.email == email) {
  //     UserService.newwwwwww(user.id).then(() => {
  //       showMessage({ message: "Confirme seu e-mail para recuperar sua senha", type: "success" })
  //       navigation.navigate('DashboardRoutes', {screen: 'Dashboard'});
  //     }).catch(() => {
  //       showMessage({ message: "Algo deu errado", type: "danger" })
  //     })
      
  //   } else {
  //     showMessage({ message: "Esse e-mail não pertence a sua conta", type: "danger" })
  //   }    
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uma nova senha será enviada ao seu email</Text>

      <Box style={styles.input}>
        <InputTextComponent
          label={'E-mail'}
          valiable={email}
          setValiable={setEamil}
        />
      </Box>

      <ButtonComponent
        label={'Enviar'}
        bntFunction={() => {}}
        isDisabled={false}
      />
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
  }
})