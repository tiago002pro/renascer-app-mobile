import { Box, Icon, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME } from "../styles/theme";

export const returnBtn = () => {
    const navigation = useNavigation();
    
    return (
      <IconButton
        onPress={() => navigation.goBack()}
        icon={
          <Icon as={MaterialIcons} name="arrow-back-ios"/>
        }
        borderRadius={'full'}
        _icon={{
          color: THEME.colors.white,
          size: 6,
          left: 1.5,
        }}
        _pressed={{
          backgroundColor: THEME.colors.primary,
          _icon: {
            color: THEME.colors.backgroud
          }
        }}
        style={{marginLeft: THEME.sizes.paddingPage * 2}}
      />
    );
  }