import { Dimensions, StyleSheet } from "react-native";
import { Box, Button, View } from "native-base";
import { Masks } from "react-native-mask-input";

import InputTextComponent from "../../../components/InputText";

import { THEME } from "../../../styles/theme";
const { width } = Dimensions.get('screen');

interface ContactDataProps {
  person?:any;
  setPerson?:any;
  scrollTo?:any;
}

export function ContactData({ person, setPerson, scrollTo }:ContactDataProps) {
  function setEmail(email:string) { setPerson({...person, email: email}) }
  function setCellPhone(cellPhone:string) { setPerson({...person, cellPhone: cellPhone}) }
  function setPhone(phone:string) { setPerson({...person, phone: phone}) }

  return (
    <View style={[styles.container, { width }]}>
      <View>
        <Box style={styles.inputArea}>
          <InputTextComponent
            label={'E-mail'}
            valiable={person?.email}
            setValiable={setEmail}
          />
        </Box>

        <Box style={styles.inputArea}>
          <InputTextComponent
            label={'Celular'}
            type={'phone-pad'}
            valiable={person?.cellPhone}
            setValiable={setCellPhone}
            mask={Masks.BRL_PHONE}
          />
        </Box>

        <Box style={styles.inputArea}>
          <InputTextComponent
            label={'Telefone'}
            type={'phone-pad'}
            valiable={person?.phone}
            setValiable={setPhone}
            mask={["(", /\d/, /\d/, ") ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
          />
        </Box>
      </View>
      <View style={styles.footer}>
        <Button
          onPress={scrollTo}
          backgroundColor={THEME.colors.gray[500]}
          _text={{ color: THEME.colors.white, fontWeight: 'bold' }}
        >
          Próximo
        </Button>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
  },
  areaName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputArea: {
    marginBottom: 10,
  },
  label: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.sm,
    marginBottom: 2,
  },
  footer: {
    marginBottom: THEME.sizes.paddingPage * 2,
  },
})