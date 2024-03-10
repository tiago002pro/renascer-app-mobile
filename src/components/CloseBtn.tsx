import { Box, Icon, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../styles/theme";

export const CloseBtn = () => {
    const navigation:any = useNavigation();

    return (
      <IconButton
        m={0} p={0}
        onPress={() => navigation.navigate('Settings')}
        icon={
          <Icon as={AntDesign} name="close"/>
        }
        borderRadius={'full'}
        _icon={{
          color: '#FFF',
          size: 6
        }}
        _pressed={{
          backgroundColor: 'transparent'
        }}
        style={{marginRight: THEME.sizes.paddingPage}}
      />
    );
  }