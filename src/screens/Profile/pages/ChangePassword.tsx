import { Box, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { THEME } from "../../../styles/theme";
import InputTextComponent from "../../../components/InputText";
import { useState } from "react";
import ButtonComponent from "../../../components/ButtonComponent";
import UserService from "../service/UserService";
import { useAuth } from "../../../contexts/auth";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

export function ChangePassword() {
  const navigation = useNavigation()
  const { user } = useAuth() as any;
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');
  const [errorNewPassword, setErrorNewPassword] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  function DoChangePassword() {
    setErrorNewPassword(false)
    setErrorPassword(false)
    
    if (newPassword != repeatNewPassword) {
      setErrorNewPassword(true)
      showMessage({
        message: "Senhas não conferem!",
        description: "Verifique e tente novamente.",
        type: "danger",
        duration: 3000
      })
    } else {
      UserService.alterPassword(user.email, oldPassword, newPassword)
      .then(() => {
        showMessage({
          message: "Senha alterada com sucesso!",
          type: "success",
          duration: 3000
        })
        navigation.goBack()
      })
      .catch(() => {
        setErrorPassword(true)
        showMessage({
          message: "Falha na autenticação!",
          description: "Senha inválida.",
          type: "danger",
          duration: 3000
        })
      })
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Preencha o formulário para alterar sua senha:</Text>

      <Box style={styles.input}>
        <InputTextComponent
          label={'Senha atual'}
          valiable={oldPassword}
          setValiable={setOldPassword}
          isPassword={true}
          error={errorPassword}
        />
      </Box>

      <Box style={styles.input}>
        <InputTextComponent
          label={'Nova senha'}
          valiable={newPassword}
          setValiable={setNewPassword}
          isPassword={true}
          error={errorNewPassword}
        />
      </Box>

      <Box style={styles.input}>
        <InputTextComponent
          label={'Repita a nova senha'}
          valiable={repeatNewPassword}
          setValiable={setRepeatNewPassword}
          isPassword={true}
          error={errorNewPassword}
        />
      </Box>

      <ButtonComponent
        label={'Salvar'}
        bntFunction={DoChangePassword}
        isDisabled={false}
        color={THEME.colors.header}
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
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    marginBottom: 10,
  },
})