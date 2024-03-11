import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Box, FlatList, Text } from "native-base";

import { THEME } from "../../../styles/theme";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

type Props = {
  section: string;
  person: any;
}

export default function InfoProfile({ section, person }:Props) {
  const navigation:any = useNavigation();
  const address:any = person?.address;
  
  function goToEdit(type:string, mask:any, title:string, question:string, attb:string, attbValue:any, dataList:any) {
    navigation.navigate('Edit', {
      type,
      mask,
      title,
      question,
      attb,
      attbValue,
      data: person,
      dataList,
    })
  }

  function getAddress():string {
    if (address && address?.zipCode) {
      return address?.publicPlace + ', ' + address?.number + ' - ' + address?.city + '/' + address?.state;
    }
    return '-'
  }

  function getGender() {
    switch(person?.gender) {
      case 'FEMALE':
        return 'Feminino'
      case 'MALE':
        return 'Masculino'
      default:
        return '-'
    }
  }

  function getMaritalStatus() {
    switch(person?.maritalStatus) {
      case 'SINGLE':
        return 'Solteiro(a)'
      case 'GROOM':
        return 'Noivo(a)'
      case 'MARRIED':
        return 'Casado(a)'
      case 'STABLEUNION':
        return 'União estável'
      case 'WIDOWER':
        return 'Viúvo(a)'
      case 'DIVORCED':
        return 'Divorciado(a)'
      default:
        return '-'
    }
  }

  function getChurch() {
    switch(person?.localChurch) {
      case 'MARINGA':
        return 'Maringá'
      case 'MANDAGUACU':
        return 'Mandaguaçu'
      case 'CAMPINA':
        return 'Campina da Lagoa'
      default:
        return '-'
    }
  }

  function getCharacteristic() {
    switch(person?.relationshipChurch) {
      case 'MEMBRO':
        return 'Sou membro da igreja'
      case 'QUER_SER_MEMBRO':
        return 'Estou no caminho para virar membro'
      case 'VISITANTE':
        return 'Visito a igreja'
      case 'DESEJA_VISITAR':
        return 'Nunca visitei, mas tenho vontade'
      default:
        return '-'
    }
  }

  function getBoolean(value:string) {
    switch(value) {
      case 'YES':
        return 'Sim'
      case 'NO':
        return 'Não'
      default:
        return '-'
    }
  }

  function getValue(value:any) {
    return value ? value : '-'
  }

  const booleanList = [
    {label: 'Sim', key: 'YES'},
    {label: 'Não', key: 'NO'},
  ]

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

  const churchData = [
    {
      id: 1,
      type: 'checkbox',
      mask: null,
      label: 'Igreja local',
      question: 'Qual a igreja você frequenta ou deseja frequentar?',
      attribute: 'localChurch',
      value: person?.localChurch,
      options: churchList,
      getValue: getChurch()
    },
    {
      id: 2,
      type: 'checkbox',
      mask: null,
      label: 'Relação com a igreja',
      question: 'Como você caracteriza sua relação com a igreja?',
      attribute: 'relationshipChurch',
      value: person?.relationshipChurch,
      options: characteristicList,
      getValue: getCharacteristic()
    },
    {
      id: 3,
      type: 'input',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      label: 'Data da entrada',
      question: 'Quando começou a frequentar/visitar a igreja?',
      attribute: 'entryDate',
      value: person?.entryDate,
      options: null,
      getValue: getValue(person?.entryDate),
    },
    {
      id: 4,
      type: 'checkbox',
      mask: null,
      label: 'Você já se batizou?',
      question: 'Você já se batizou?',
      attribute: 'baptized',
      value: person?.baptized,
      options: booleanList,
      getValue: getBoolean(person?.baptized)
    },
    {
      id: 5,
      type: 'checkbox',
      mask: null,
      label: 'Aceitou a Jesus?',
      question: 'Aceitou a Jesus?',
      attribute: 'acceptedJesus',
      value: person?.acceptedJesus,
      options: booleanList,
      getValue: getBoolean(person?.acceptedJesus)
    },
    {
      id: 6,
      type: 'checkbox',
      mask: null,
      label: 'É lider?',
      question: 'Você tem alguma posição de liderança na igreja?',
      attribute: 'leader',
      value: person?.leader,
      options: booleanList,
      getValue: getBoolean(person?.leader)
    },
    {
      id: 7,
      type: 'checkbox',
      mask: null,
      label: 'É pastor?',
      question: 'É pastor?',
      attribute: 'pastor',
      value: person?.pastor,
      options: booleanList,
      getValue: getBoolean(person?.pastor)
    },
  ]

  return (
    <ScrollView>
      {section === 'BASIC' ? (
        <View style={styles.container}>
          <Box style={styles.item}>
            <Text style={styles.label}>Nome completo:</Text>
            <Text style={styles.value}>{person?.name ? person?.name : "-"}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>Sexo:</Text>
            <Text style={styles.value}>{getGender()}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>Data de nascimento:</Text>
            <Text style={styles.value}>{person?.dateBirth ? person?.dateBirth : "-"}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>Estado civil:</Text>
            <Text style={styles.value}>{getMaritalStatus()}</Text>
          </Box>
        </View>
      ) : null}

      {section === 'CONTACT' ? (
        <View style={styles.container}>
          <Box style={styles.item}>
            <Text style={styles.label}>E-mail:</Text>
            <Text style={styles.value}>{person?.email ? person?.email : "-"}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>Celular:</Text>
            <Text style={styles.value}>{person?.cellPhone ? person?.cellPhone : "-"}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.value}>{person?.phone ? person?.phone : "-"}</Text>
          </Box>
        </View>
      ) : null}

      {section === 'ADDRESS' ? (
        <View style={styles.container}>
          <Box style={styles.item}>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.value}>{getAddress()}</Text>
          </Box>
        </View>
      ) : null}

      {section === 'CHURCH' ? (
        <View style={styles.container}>
          <FlatList
            data={churchData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(data) => 
              <TouchableOpacity
                onPress={
                  () => goToEdit(data.item.type, data.item.mask, data.item.label, data.item.question, data.item.attribute, data.item.value, data.item.options)
                }
                style={styles.item}
              >
                <Text style={styles.label}>{data.item.label}</Text>
                <Text style={styles.value}>{data.item.getValue}</Text>
              </TouchableOpacity>
            }
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
  },
  item: {
    display: 'flex',
    marginBottom: 20,
    borderWidth: 1,
    borderBottomColor: THEME.colors.white,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent', 
  },
  label: {
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md + 2,
    color: THEME.colors.white,
    fontFamily: 'Roboto_500Medium',
    marginBottom: 7,
  },
  value: {
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm * 2,
    color: THEME.colors.white,
    fontFamily: 'Roboto_400Regular',
  },
})