import { StyleSheet } from "react-native";
import { FormControl, Icon, Input, Pressable } from "native-base";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { THEME } from "../styles/theme";
import { useState } from "react";

interface InputProps {
  label?:string;
  placeholder?:string;
  isPassword?:boolean;
  icon?:any;
  autoCapitalize?:boolean;
  value?:string;
  onChangeText?:(text: string) => void;
  error?:boolean;
  errorMessage?:string;
}

export default function InputTextIcon({ label, placeholder, isPassword, icon, autoCapitalize, value, onChangeText, error, errorMessage }:InputProps):JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl
      isInvalid={error}
      style={styles.container}
    >
      <FormControl.Label fontFamily={'InterTight_400Regular'} fontWeight={400}>
        {label}
      </FormControl.Label>
      <Input
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        type={isPassword && !showPassword ? 'password' : 'text'}
        style={styles.input}
        InputLeftElement = { <Icon as = { <Feather name={icon} style={styles.icon} color={THEME.colors.gray[400]}/> }/>}
        InputRightElement={
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            { isPassword? <Icon as={<MaterialIcons name={!showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" /> : null }
          </Pressable>
        }
        color={THEME.colors.font}
        borderColor={THEME.colors.header}
        bg={THEME.colors.header}
        selectionColor={THEME.colors.primary}
        _focus={{
          backgroundColor: THEME.colors.header,
          borderColor: THEME.colors.header,
          _ios: {
            selectionColor: THEME.colors.primary,
          },
          _android: {
            selectionColor: THEME.colors.primary,
          }
        }}
        autoCapitalize={autoCapitalize ? 'words' : "none"}
      />
      {
        error ? 
          <FormControl.ErrorMessage leftIcon={<MaterialIcons name={"error"} size={15} color={THEME.colors.red[500]} />}>
            {errorMessage}
          </FormControl.ErrorMessage>
        : null
      }
    </FormControl>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  input: {
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
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