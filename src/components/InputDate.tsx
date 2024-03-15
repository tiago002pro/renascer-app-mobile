import { useState } from "react";
import { StyleSheet } from "react-native";
import { Pressable, View } from "native-base";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { THEME } from "../styles/theme";

interface InputProps {
  label?: string;
  valiable?: any;
  setValiable?: (variable:Date) => void;
}

export default function InputDate({ label, valiable, setValiable }: InputProps) {
  const [dateInput, setDateInput] = useState(moment(valiable).format("DD/MM/YYYY"));
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const handleConfirm  = (date:Date) => {
    setValiable(date);
    setDateInput(moment(date).format("DD/MM/YYYY"));
    toggleDatePicker();
  }

  return (
    <View>
      <Pressable
        onPress={toggleDatePicker}
      >
        <TextInput
          key={label}
          label={label}
          value={valiable ? dateInput: ''}
          editable={false}
          onPressIn={toggleDatePicker}
          mode='outlined'
          style={styles.input}
          textColor="#FFF"
          outlineStyle={{
            borderColor: '#FFF',
          }}
          cursorColor={'#FFF'}
          theme={{colors: { placeholder: 'white' , text: 'white', primary: 'white', onSurfaceVariant: 'white' }}}
        />
      </Pressable>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        display="spinner"
        date={valiable ? new Date(valiable) : new Date()}
        onConfirm={handleConfirm}
        onCancel={toggleDatePicker}
        locale="pt_BR"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
      />
    </View>
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