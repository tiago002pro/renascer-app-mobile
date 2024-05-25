import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import MaskInput from "react-native-mask-input";
import { THEME } from "../styles/theme";
import { FormControl } from "native-base";

interface InputProps {
  label?: string;
  type?: any;
  valiable?: any;
  setValiable?: (variable: any) => void;
  onChange?: (variable: any) => void;
  mask?: any;
  error?:boolean;
}

export default function InputTextComponent({ label, type, valiable, setValiable, onChange, mask, error }: InputProps) {
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
        render={props => 
          <MaskInput
            {...props}
            mask={mask}
          />
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
    height: 39,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  },
})