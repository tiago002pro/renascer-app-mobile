import { Text, View, StyleSheet } from "react-native";

import { BasicData } from "./BasicData";
import { ContactData } from "./ContactData";
import { AddressData } from "./AddressData";

import { THEME } from "../../../styles/theme";
import { ChurchData } from "./ChurchData";

interface OnboardingItemProps {
  item?:any;
  person?:any;
  setPerson?:any;
  address?:any;
  setAddress?:any;
  scrollTo?:any;
  save?:any;
}

export function OnboardingItem({ item, person, setPerson, address, setAddress, scrollTo, save }:OnboardingItemProps) {
  return (
    <View>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      {item.id == 1 ? <BasicData person={person} setPerson={setPerson} scrollTo={scrollTo} /> : null}
      {item.id == 2 ? <ContactData person={person} setPerson={setPerson} scrollTo={scrollTo} /> : null}
      {item.id == 3 ? <AddressData address={address} setAddress={setAddress} scrollTo={scrollTo} /> : null}
      {item.id == 4 ? <ChurchData person={person} setPerson={setPerson} save={save} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    fontSize: THEME.fontSizes.lg,
    color: THEME.colors.font,
    textTransform: 'capitalize',
  },
});
