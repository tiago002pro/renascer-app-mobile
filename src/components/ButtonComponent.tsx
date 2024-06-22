import { StyleSheet } from "react-native";
import { Button } from "native-base";
import { THEME } from "../styles/theme";

interface InputProps {
  label?:string;
  color?:string;
  bg?:any;
  bntFunction?:() => void;
  isDisabled?:boolean;
}

export default function ButtonComponent({ label, color, bg, bntFunction, isDisabled, ...props }:InputProps) {
  return (
    <Button
      onPress={bntFunction}
      style={styles.btn}
      bg={bg || THEME.colors.primary}
      opacity={1}
      _pressed={{
        backgroundColor: THEME.colors.primary,
      }}
      mt={2}
      _text={{
        fontSize: THEME.fontSizes.md,
        color: color || THEME.colors.font,
        fontFamily: 'InterTight_600SemiBold',
        fontWeight: '600',
      }}
      isDisabled={isDisabled}
      _disabled={{
        opacity: .5
      }}
      {...props}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 50,
    borderColor: 'transparent',
    shadowOffset: {width: -2, height: 5},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,
  }
});