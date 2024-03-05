import { Box, Icon, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME } from "../styles/theme";

export const returnBtn = () => {
    const navigation = useNavigation();
    
    return (
      <Box>
        <IconButton
          m={0} p={0} left={0}
          onPress={() => navigation.goBack()}
          icon={
            <Icon as={MaterialIcons} name="arrow-back-ios"/>
          }
          borderRadius={'full'}
          _icon={{
            color: '#FFF',
            size: 6
          }}
          _pressed={{
            backgroundColor: 'transparent'
          }}
          style={{marginStart: THEME.sizes.paddingPage}}
        />
      </Box>
    );
  }