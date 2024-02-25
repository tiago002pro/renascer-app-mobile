import { Box, NativeBaseProvider, StatusBar, Text } from 'native-base';
import { THEME } from './styles/theme';

export default function App() {
  return (
    <NativeBaseProvider>
        <StatusBar/>
        <Box flex={1} bg={THEME.colors.backgroud} alignItems={'center'} justifyContent={'center'}>
          <Text color={'white'} fontSize={20}>Hellow world!</Text>
        </Box>
    </NativeBaseProvider>
  );
}