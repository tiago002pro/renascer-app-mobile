import { StyleSheet, View } from "react-native";
import { Box, Text } from "native-base";

import { THEME } from "../../../styles/theme";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  section: string;
  person: any;
}

export default function InfoProfile({ section, person }:Props) {
  const address:any = person?.address;

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
          <Box style={styles.item}>
            <Text style={styles.label}>Qual a igreja você frequenta ou deseja frequentar?</Text>
            <Text style={styles.value}>{getChurch()}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>Como você caracteriza sua relação com a igreja?</Text>
            <Text style={styles.value}>{getCharacteristic()}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>Quando começou a frequentar/visitar a igreja?</Text>
            <Text style={styles.value}>{getBoolean(person?.entryDate)}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>Você já se batizou?</Text>
            <Text style={styles.value}>{getBoolean(person?.baptized)}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>Aceitou a Jesus?</Text>
            <Text style={styles.value}>{getBoolean(person?.acceptedJesus)}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>É lider?:</Text>
            <Text style={styles.value}>{getBoolean(person?.leader)}</Text>
          </Box>
          <Box style={styles.item}>
            <Text style={styles.label}>É pastor?</Text>
            <Text style={styles.value}>{getBoolean(person?.pastor)}</Text>
          </Box>
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
    marginBottom: 20
  },
  label: {
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    color: THEME.colors.yellow[300],
    fontFamily: 'Roboto_300Light',
    marginBottom: 5,
  },
  value: {
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    color: THEME.colors.white,
    fontFamily: 'Roboto_400Regular',
  }
})