import { Icon, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../styles/theme";

export const CloseBtn = () => {
    const navigation:any = useNavigation();

    return (
      <IconButton
        onPress={() => navigation.goBack()}
        icon={
          <Icon as={AntDesign} name="close"/>
        }
        borderRadius={'full'}
        _icon={{
          color: THEME.colors.font,
          size: 6,
          opacity: .7
        }}
        _pressed={{
          backgroundColor: THEME.colors.primary,
          _icon: {
            color: THEME.colors.backgroud,
            opacity: 1,
          }
        }}
        style={{marginRight: THEME.sizes.paddingPage * 2}}
      />
    );
  }