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

export function DeleteProdile() {
  const navigation:any = useNavigation();
  const {signOut, user} = useAuth() as any;
  const [email, setEamil] = useState('');

  async function deleteAccount() {
    if (user.email == email) {
      UserService.delete(user.id).then(() => {
        out()
      }).catch(() => {
        showMessage({ message: "Algo deu errado", type: "danger" })
      })
      
    } else {
      showMessage({ message: "Esse e-mail não pertence a sua conta", type: "danger" })
    }

    function out():void {
      signOut()
      navigation.navigate('DashboardRoutes', {screen: 'Dashboard'});
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifique sua conta para prosseguir</Text>

      <Box style={styles.input}>
        <InputTextComponent
          label={'E-mail'}
          valiable={email}
          setValiable={setEamil}
        />
      </Box>

      <ButtonComponent
        label={'Deletar perfil'}
        bntFunction={deleteAccount}
        isDisabled={false}
        bg={THEME.colors.red[500]}
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
    fontFamily: 'InterTight_400Regular',
    fontWeight: 400,
    marginBottom: 10,
  }
})