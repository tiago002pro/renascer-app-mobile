import { StyleSheet, View } from "react-native";
import { Box, Text } from "native-base";

import { THEME } from "../../../styles/theme";

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

  return (
    <View>
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
    </View>
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
    color: THEME.colors.yellow[400],
    fontFamily: 'Roboto_500Medium',
    marginBottom: 5,
  },
  value: {
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    color: '#FFF',
    fontFamily: 'Roboto_400Regular',
  }
})