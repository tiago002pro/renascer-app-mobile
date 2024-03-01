import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box, Button, View } from "native-base";

import InputTextComponent from "../../../components/InputText";
import SelectComponent from "../../../components/SelectComponent";

import { THEME } from "../../../styles/theme";
const { width } = Dimensions.get('screen');

interface BasicDataProps {
  person?:any;
  setPerson?:any;
  scrollTo?:any;
}

export function BasicData({ person, setPerson, scrollTo }:BasicDataProps) {
  useEffect(() => {
    if (person) { setPerson(person) }
  }, [person])

  function setName(name:string) { setPerson({...person, name: name}) }
  function setGender(gender:string) { setPerson({...person, gender: gender}) }
  function setDateBirth(dateBirth:string) { setPerson({...person, dateBirth: dateBirth}) }
  function setMaritalStatus(maritalStatus:string) { setPerson({...person, maritalStatus: maritalStatus}) }

  const maritalStatusList = [
    {label: 'Solteiro(a)', key: 'SINGLE'},
    {label: 'Noivo(a)', key: 'GROOM'},
    {label: 'Casado(a)', key: 'MARRIED'},
    {label: 'União estável', key: 'STABLEUNION'},
    {label: 'Viúvo(a)', key: 'WIDOWER'},
    {label: 'Divorciado(a)', key: 'DIVORCED'},
  ]

  const genderList = [
    {label: 'Feminino', key: 'FEMALE'},
    {label: 'Masculino', key: 'MALE'},
  ]

  return (
    <View style={[styles.container, { width }]}>
      <View>
        <Box style={styles.inputArea}>
          <InputTextComponent
            label={'Nome Completo'}
            valiable={person?.name}
            setValiable={setName}
          />
        </Box>

        <Box style={styles.inputArea}>
          <SelectComponent
            options={genderList}
            label={'Gênero'}
            valiable={person?.gender}
            setValiable={setGender}
          />
        </Box>

        <Box style={styles.inputArea}>
          <InputTextComponent
            label={'Data de nascimento'}
            type={'numeric'}
            valiable={person?.dateBirth}
            setValiable={setDateBirth}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </Box>

        <Box style={styles.inputArea}>
          <SelectComponent
            options={maritalStatusList}
            label={'Estado civil'}
            valiable={person?.maritalStatus}
            setValiable={setMaritalStatus}
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