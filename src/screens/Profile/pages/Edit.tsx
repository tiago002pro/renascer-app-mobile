import { useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { FlatList, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import PersonService from "../service/PersonService";

import ButtonComponent from "../../../components/ButtonComponent";
import InputTextComponent from "../../../components/InputText";
import { Checkbox } from "../../../components/Checkbox";
import { Paginator } from "../components/Paginator";

import { THEME } from "../../../styles/theme";

export function Edit({ route }:any) {
  const navigation:any = useNavigation();
  const {
    type,
    mask,
    title,
    question,
    attb,
    attbValue,
    data,
    dataList
  } = route.params; 
  const [value, setValue] = useState(attbValue);
  const scrollx:any = useRef(new Animated.Value(0)).current;

  function setValue2(teste:any) {
    setValue(teste)
    data[attb] = teste
  }

  async function save():Promise<void> {
    await PersonService.update(data).then(() => {
      showMessage({ message: "Salvo com sucesso", type: "success"})
      navigation.navigate('Profile')
    }).catch(() => {
      showMessage({ message: "Algo deu errado", type: "danger" })
    })
  }

  return (
    <View style={styles.container}>
      <Paginator data={[{}]} scrollx={scrollx} />
      <Text style={styles.title}>{question}</Text>

      {type == 'checkbox' ?
        <FlatList
          style={styles.flatList}
          data={dataList}
          keyExtractor={(item:any) => item.key}
          renderItem={(item:any) => 
            <Checkbox
              id={item.item.key}
              title={item.item.label}
              op={item.item.key}
              value={value}
              setValue={setValue2}
            />
          }
        />
        :
        type == 'input' ?
        <InputTextComponent
          label={title}
          type={'numeric'}
          valiable={value}
          setValiable={setValue2}
          mask={mask}
        />
        :
        null
      }

      <ButtonComponent
        label={'Salvar'}
        bntFunction={save}
        isDisabled={false}
        bg={THEME.colors.gray[700]}
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
  flatList: {
  },
  title: {
    fontFamily: 'Roboto_700Bold',
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    color: THEME.colors.white,
    marginBottom: 10,
  }
})