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
        backgroundColor: "orange.500",
        borderColor: "transparent",
      }}
      mt={2}
      _text={{
        fontSize: THEME.fontSizes.md,
        lineHeight: THEME.fontSizes.md,
        color: color || "white",
        fontFamily: "Roboto_700Bold"
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