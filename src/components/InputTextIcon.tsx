import { StyleSheet } from "react-native";
import { Box, Icon, Input } from "native-base";
import { Feather } from "@expo/vector-icons";
import { THEME } from "../styles/theme";

interface InputProps {
  placeholder?:string;
  passWordType?:boolean;
  icon?:any;
  value?:string;
  onChangeText?: (text: string) => void;
  error?:boolean;
}

export default function InputTextIcon({ placeholder, passWordType, icon, value, onChangeText, error, ...props }:InputProps):JSX.Element {
  return (
    <Box
      style={styles.container}
      bg={error ? '#341c1e' : THEME.colors.header}
      {...props}
    >
      <Input
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        secureTextEntry={passWordType}
        style={styles.input}
        InputLeftElement = {
          <Icon
            as = {
              <Feather
                name={icon}
                style={styles.icon}
                color={error ? THEME.colors.red[500] : THEME.colors.white}
              />
            }
          />
        }
        color={error ? THEME.colors.red[500] : THEME.colors.white}
        borderColor={error ? THEME.colors.red[500] : THEME.colors.header}
        _focus={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  input: {
    fontFamily: 'Roboto_500Medium',
    fontSize: THEME.fontSizes.md,
  },
  icon: {
    paddingLeft: THEME.sizes.paddingPage + 5,
    paddingTop: THEME.sizes.paddingPage + 5,
    paddingBottom: THEME.sizes.paddingPage + 5,
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
  }
});