import 'react-native-gesture-handler';
import 'moment/locale/pt-br';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import Routes from './src/routes';
import Loading from './src/screens/Loading';

import { THEME } from './src/styles/theme';
import { AuthProvider } from './src/contexts/auth';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return <Loading/>;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar backgroundColor={THEME.colors.header} barStyle='light-content'/>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
      <FlashMessage position="top" />
    </NativeBaseProvider>
  );
}