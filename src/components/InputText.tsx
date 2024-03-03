import { StyleSheet } from "react-native";
import { View } from "native-base";
import { TextInput } from "react-native-paper";
import MaskInput from "react-native-mask-input";
import { THEME } from "../styles/theme";

interface InputProps {
  label?: string;
  type?: any;
  valiable?: any;
  setValiable?: (variable: any) => void;
  onChange?: (variable: any) => void;
  mask?: any;
}

export default function InputTextComponent({ label, type, valiable, setValiable, onChange, mask }: InputProps) {
  return (
    <TextInput
      key={label}
      label={label}
      value={valiable}
      onChangeText={setValiable}
      onChange={onChange}
      mode='outlined'
      keyboardType={type ? type : 'default'}
      style={styles.input}
      textColor="#FFF"
      outlineStyle={{
        borderColor: '#FFF',
      }}
      cursorColor={'#FFF'}
      theme={{colors: { placeholder: 'white' , text: 'white', primary: 'white', onSurfaceVariant: 'white' }}}
      render={props => 
        <MaskInput
          {...props}
          mask={mask}
        />
      }
    />
  );
}

export const styles = StyleSheet.create({
  input: {
    backgroundColor: THEME.colors.backgroud,
    fontSize: THEME.fontSizes.md,
    height: 39,
    fontFamily: 'Roboto_700Bold',
  },
})