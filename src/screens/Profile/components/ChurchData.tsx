import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box, Button, Text, View } from "native-base";

import InputTextComponent from "../../../components/InputText";
import SelectComponent from "../../../components/SelectComponent";

import { THEME } from "../../../styles/theme";
import { ScrollView } from "react-native-gesture-handler";
const { width } = Dimensions.get('screen');

interface ChurchDataProps {
  person?:any;
  setPerson?:any;
  save?:any;
}

export function ChurchData({ person, setPerson, save }:ChurchDataProps) {
  useEffect(() => {
    if (person) { setPerson(person) }
  }, [person])

  function setLocalChurch(localChurch:string) { setPerson({...person, localChurch: localChurch}) }
  function setRelationshipChurch(relationshipChurch:string) { setPerson({...person, relationshipChurch: relationshipChurch}) }
  function setEntryDate(entryDate:string) { setPerson({...person, entryDate: entryDate}) }
  function setBaptized(baptized:string) { setPerson({...person, baptized: baptized}) }
  function setAcceptedJesus(acceptedJesus:string) { setPerson({...person, acceptedJesus: acceptedJesus}) }
  function setLeader(leader:string) { setPerson({...person, leader: leader}) }
  function setPastor(pastor:string) { setPerson({...person, pastor: pastor}) }

  const churchList = [
    {label: 'Maringá', key: 'MARINGA'},
    {label: 'Mandaguaçu', key: 'MANDAGUACU'},
    {label: 'Campina da Lagoa', key: 'CAMPINA'},
  ]

  const characteristicList = [
    {label: 'Sou membro da igreja', key: 'MEMBRO'},
    {label: 'Estou no caminho para virar membro', key: 'QUER_SER_MEMBRO'},
    {label: 'Visito a igreja', key: 'VISITANTE'},
    {label: 'Nunca visitei, mas tenho vontade', key: 'DESEJA_VISITAR'},
  ]

  const booleanList = [
    {label: 'Sim', key: 'YES'},
    {label: 'Não', key: 'NO'},
  ]

  return (
    <View style={[styles.container, { width }]}>
      <ScrollView>
        <View>
          <Box style={styles.inputArea}>
            <Text style={styles.label}>Qual a igreja você frequenta ou deseja frequentar?</Text>
            <SelectComponent
              options={churchList}
              label={'Igreja local'}
              valiable={person?.localChurch}
              setValiable={setLocalChurch}
            />
          </Box>

          <Box style={styles.inputArea}>
            <Text style={styles.label}>Como você caracteriza sua relação com a igreja?</Text>
            <SelectComponent
              options={characteristicList}
              label={'Relação com a igreja'}
              valiable={person?.relationshipChurch}
              setValiable={setRelationshipChurch}
            />
          </Box>

          <Box style={styles.inputArea}>
            <Text style={styles.label}>Quando começou a frequentar/visitar a igreja?</Text>
            <InputTextComponent
              label={'Data da entrada'}
              type={'numeric'}
              valiable={person?.entryDate}
              setValiable={setEntryDate}
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            />
          </Box>

          <Box style={styles.inputArea}>
            <Text style={styles.label}>Você já se batizou?</Text>
            <SelectComponent
              options={booleanList}
              label={'Já se batizou?'}
              valiable={person?.baptized}
              setValiable={setBaptized}
            />
          </Box>

          <Box style={styles.inputArea}>
            <Text style={styles.label}>Aceitou a Jesus?</Text>
            <SelectComponent
              options={booleanList}
              label={'Aceitou a Jesus?'}
              valiable={person?.acceptedJesus}
              setValiable={setAcceptedJesus}
            />
          </Box>

          <Box style={styles.inputArea}>
            <Text style={styles.label}>Você tem alguma posição de liderança na igreja?</Text>
            <SelectComponent
              options={booleanList}
              label={'É lider?'}
              valiable={person?.leader}
              setValiable={setLeader}
            />
          </Box>

          <Box style={styles.inputArea}>
            <Text style={styles.label}>É pastor?</Text>
            <SelectComponent
              options={booleanList}
              label={'É pastor?'}
              valiable={person?.pastor}
              setValiable={setPastor}
            />
          </Box>
        </View>

        <View style={styles.footer}>
          <Button
            onPress={save}
            backgroundColor={THEME.colors.gray[500]}
            _text={{ color: THEME.colors.white, fontWeight: 'bold' }}
          >
            Salvar
          </Button>
        </View>
      </ScrollView>
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
    marginBottom: 30,
  },
  footer: {
    marginBottom: THEME.sizes.paddingPage * 5,
  },
  label: {
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    color: THEME.colors.white,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    marginBottom: 5,
  }
})