import 'react-native-gesture-handler';
import 'moment/locale/pt-br';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, InterTight_300Light, InterTight_400Regular, InterTight_500Medium, InterTight_600SemiBold, InterTight_700Bold, InterTight_800ExtraBold } from '@expo-google-fonts/inter-tight';
import Routes from './src/routes';
import Loading from './src/screens/Loading';
import { THEME } from './src/styles/theme';
import { AuthProvider } from './src/contexts/auth';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
      'Non-serializable values were found in the navigation state',
      'Warning: TextInput.Icon: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    ]);
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    InterTight_300Light,
    InterTight_400Regular,
    InterTight_500Medium,
    InterTight_600SemiBold,
    InterTight_700Bold,
    InterTight_800ExtraBold,
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