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
import InputDate from "../../../components/InputDate";

import { THEME } from "../../../styles/theme";

export function Edit({ route }:any) {
  const navigation:any = useNavigation();
  const { item, data } = route.params; 
  const [person, setPerson] = useState(data);
  const scrollx:any = useRef(new Animated.Value(0)).current;

  function putValue(value:any) {
    setPerson({...data, [item.attribute]: value})
  }

  async function save():Promise<void> {
    await PersonService.update(person).then(() => {
      showMessage({ message: "Salvo com sucesso", type: "success"})
      navigation.navigate('Profile')
    }).catch(() => {
      showMessage({ message: "Algo deu errado", type: "danger" })
    })
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
            />
          </Box>
          : item.type == 'address' ?
            <Address
              address={person[item.attribute]}
              setAddress={putValue}
            />
          : item.type == 'date' ?
          <Box flex={1}>
            <InputDate
              label={item.label}
              valiable={person[item.attribute]}
              setValiable={putValue}
            />
          </Box>
          : null
        }
      </ScrollView>
      
      <Box bottom={3}>
        <ButtonComponent
          label={'Salvar'}
          bntFunction={save}
          isDisabled={false}
          bg={THEME.colors.second}
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
    fontFamily: 'Roboto_700Bold',
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    color: THEME.colors.white,
    marginBottom: 20,
  }
})