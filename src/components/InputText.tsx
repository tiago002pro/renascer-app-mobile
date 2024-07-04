import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import MaskInput from "react-native-mask-input";
import { THEME } from "../styles/theme";
import { FormControl } from "native-base";
import { useState } from "react";

interface InputProps {
  label?: string;
  type?: any;
  valiable?: any;
  setValiable?: (variable: any) => void;
  onChange?: (variable: any) => void;
  mask?: any;
  error?:boolean;
  autoCapitalize?:boolean;
  isPassword?:boolean;
}

export default function InputTextComponent({ label, type, valiable, setValiable, onChange, mask, error, autoCapitalize, isPassword }: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(isPassword || false);

  return (
    <FormControl
      isInvalid={error}
      style={styles.container}
    >
      <TextInput
        key={label}
        label={label}
        value={valiable ? valiable : ''}
        onChangeText={setValiable}
        onChange={onChange}
        mode='outlined'
        keyboardType={type ? type : 'default'}
        style={styles.input}
        textColor={error ? 'red' : '#FFF'}
        outlineStyle={{
          borderColor: error ? 'red' : '#FFF',
        }}
        cursorColor={'#FFF'}
        theme={{
          colors: {
            placeholder: error ? 'red' : '#FFF',
            text: error ? 'red' : '#FFF',
            primary: error ? 'red' : '#FFF',
            onSurfaceVariant: error ? 'red' : '#FFF'
          }
        }}
        autoCapitalize={autoCapitalize ? 'words' : 'none'}
        secureTextEntry={showPassword}
        render={props => 
          <MaskInput
            {...props}
            mask={mask}
          />
        }
        right={
          <TextInput.Icon color={error ? THEME.colors.red[500] : THEME.colors.white} icon={showPassword ? "eye" : !showPassword ? "eye-off" : ""} onPress={() => setShowPassword(!showPassword)} />
        }
      />
    </FormControl>
  );
}

export const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  input: {
    backgroundColor: THEME.colors.backgroud,
    fontSize: THEME.fontSizes.md,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  },
})