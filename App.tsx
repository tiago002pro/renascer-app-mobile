import 'react-native-gesture-handler';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar />
        <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}