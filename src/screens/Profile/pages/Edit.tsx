import { useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { Box, KeyboardAvoidingView, ScrollView, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import PersonService from "../service/PersonService";
import ButtonComponent from "../../../components/ButtonComponent";
import InputTextComponent from "../../../components/InputText";
import { Checkbox } from "../../../components/Checkbox";
import { Paginator } from "../components/Paginator";
import { Address } from "../components/Address";
import { THEME } from "../../../styles/theme";

export function Edit({ route }:any) {
  const navigation:any = useNavigation();
  const { item, data } = route.params; 
  const [person, setPerson] = useState(data);
  const scrollx:any = useRef(new Animated.Value(0)).current;
  const [errors, setErrors] = useState(null);
  const error:any = {}

  function putValue(value:any) {
    setPerson({...data, [item.attribute]: value})
  }

  async function save():Promise<void> {
    if (!checkInputErrors()) {
      await PersonService.update(person).then(() => {
        showMessage({ message: "Salvo com sucesso", type: "success"})
        navigation.navigate('Profile')
      }).catch(() => {
        showMessage({ message: "Algo deu errado", type: "danger" })
      })
    }
  }

  function checkInputErrors():boolean {
    if (item?.attribute == 'dateBirth') {
      let pattern = /^\d{2}-\d{2}-\d{4}$/;
      let dateBirth = person[item.attribute] ? person[item.attribute].replaceAll('/', '-') : '';
      const errorDate = !pattern.test(dateBirth);

      if (dateBirth.length > 0 && errorDate) {
        showMessage({ message: "Dado inválido!", type: "danger"})
        error.dateBirth = true
        setErrors(error)
        return true
      }
    }
    
    if (item.type == 'address') {
      error.country = !person.address.country
      error.zipCode = !person.address.zipCode
      error.publicPlace = !person.address.publicPlace
      error.number = !person.address.number
      error.neighborhood = !person.address.neighborhood
      error.city = !person.address.city
      error.state = !person.address.state

      setErrors(error)

      if (error.country || error.zipCode || error.publicPlace || error.number || error.neighborhood || error.city || error.state) {
        showMessage({ message: "Preencha todos os campos!", type: "danger"})
        return true
      }
    }

    if (item?.attribute == 'cellPhone') {
      let cellPhone = person[item.attribute] ? person[item.attribute] : ''
      cellPhone = cellPhone.replace('(', '');
      cellPhone = cellPhone.replace(')', '');
      cellPhone = cellPhone.replace(' ', '');
      cellPhone = cellPhone.replace('-', '');

      
      if (cellPhone.length > 1 && cellPhone.length < 11) {
        showMessage({ message: "Dado inválido!", type: "danger"})
        error.cellPhone = true
        setErrors(error)
        return true
      }
    }

    if (item?.attribute == 'phone') {
      let phone = person[item.attribute] ? person[item.attribute] : ''
      phone = phone.replace('(', '');
      phone = phone.replace(')', '');
      phone = phone.replace(' ', '');
      phone = phone.replace('-', '');

      if (phone.length > 1 && phone.length < 10) {
        showMessage({ message: "Dado inválido!", type: "danger"})
        error.phone = true
        setErrors(error)
        return true
      }
      return false;
    }

    return false;
  }

  return (
    <KeyboardAvoidingView
      key={item.attribute}
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView flex={1}>
        <Paginator data={[{}]} scrollx={scrollx} />
        <Text style={styles.question}>{item.question}</Text>

        {item.type == 'checkbox' ?
          item.options.map((data:any, i:number) => {
            return (
              <Box key={i}>
                <Checkbox
                  title={data.label}
                  op={data.key}
                  value={person[item.attribute]}
                  setValue={putValue}
                />
              </Box>
            )
          })
          : item.type == 'input' ?
          <Box flex={1}>
            <InputTextComponent
              label={item.label}
              type={item.inputType}
              valiable={person[item.attribute]}
              setValiable={putValue}
              mask={item.mask}
              error={errors && errors[item.attribute] ? errors[item.attribute] : false}
            />
          </Box>
          : item.type == 'address' ?
            <Address
              address={person[item.attribute]}
              setAddress={putValue}
              errors={errors}
            />
          : null
        }
      </ScrollView>
      
      <Box bottom={3}>
        <ButtonComponent
          label={'Salvar'}
          bntFunction={save}
          isDisabled={false}
          color={THEME.colors.backgroud}
          bg={THEME.colors.primary}
        />
      </Box>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.backgroud,
  },
  question: {
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    fontSize: THEME.fontSizes.lg,
    color: THEME.colors.white,
    marginBottom: 20,
  }
})