import { CheckBox } from "@rneui/themed";
import { THEME } from "../styles/theme";

export const Checkbox = ({ title, op, value, setValue }: any) => {
  return (
    <CheckBox
      title={title}
      checked={value == op}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      onPress={() => setValue(op)}
      containerStyle={{
        backgroundColor: value == op ? THEME.colors.second : THEME.colors.tabBar,
        borderRadius: 10,
        width: '100%',
        left: -10,
      }}
      checkedColor={THEME.colors.font}
      textStyle={{
        color: THEME.colors.font,
        fontFamily: 'InterTight_500Medium',
        fontWeight: '500',
        fontSize: THEME.fontSizes.md
      }}
    />
  );
}