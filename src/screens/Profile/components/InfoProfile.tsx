import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DataAccordion } from "../helper/DataAccordion";
import { THEME } from "../../../styles/theme";

type Props = {
  section: string;
  person: any;
}

export default function InfoProfile({ section, person }:Props) {
  const navigation:any = useNavigation();
  
  function goToEdit(item:any):void {
    navigation.navigate('Edit', { item: item, data: person, })
  }

  return (
    <ScrollView id={section}>
      {
        DataAccordion.getData(person, section).map((item:any, i:number) => {
          return(
          <TouchableOpacity
            key={i}
            style={styles.item}
            onPress={() => goToEdit(item)}
          >
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.getValue}</Text>
          </TouchableOpacity>
          );
        })
      }
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
    borderBottomColor: THEME.colors.font,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  label: {
    fontSize: THEME.fontSizes.md + 2,
    lineHeight: THEME.fontSizes.md + 5,
    color: THEME.colors.font,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: 600,
  },
  value: {
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm * 2,
    color: THEME.colors.font,
    fontFamily: 'InterTight_400Regular',
    fontWeight: 400,
  },
})