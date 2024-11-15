import 'react-native-gesture-handler';
import 'moment/locale/pt-br';
import { useEffect } from 'react';
import { LogBox, Platform } from 'react-native';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, InterTight_300Light, InterTight_400Regular, InterTight_500Medium, InterTight_600SemiBold, InterTight_700Bold, InterTight_800ExtraBold } from '@expo-google-fonts/inter-tight';
import Routes from './src/routes';
import Loading from './src/screens/Loading';
import { THEME } from './src/styles/theme';
import { AuthProvider } from './src/contexts/auth';
import FlashMessage from 'react-native-flash-message';
import * as Notifications from 'expo-notifications';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
      'Non-serializable values were found in the navigation state',
      'Warning: TextInput.Icon: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    ]);

    requestNotificationPermission();
    cancelNotifications();
    registerForPushNotificationsAsync();
    scheduleDailyNotification();
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

async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('As permissões de notificação são necessárias para o funcionamento do aplicativo.');
  }
}

async function cancelNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS == 'android') {
    Notifications.setNotificationChannelAsync('daily-reminder', {
      name: 'Lembretes semanais',
      importance: Notifications.AndroidImportance.HIGH,
    })
  }
}

async function scheduleDailyNotification() {
  const daysOfWeek = [
    {
      title: 'Domingo Renascer',
      body: 'Comece sua semana no melhor lugar!\n\n\nNós te esperamos às 19h00.',
      weekday: 1,
      hour: 17,
      minute: 0
    },
    {
      title: 'Reunião de oração',
      body: 'Reunião de oração, 20h00.\n\n\nVamos?',
      weekday: 2,
      hour: 18,
      minute: 0
    },
    {
      title: 'Estudo Conecte',
      body: 'Se você é jovem não perca a oportunidade de aprender mais do Senhor através das Suas escrituras,\n\n\nHoje 20hs.',
      weekday: 3,
      hour: 18,
      minute: 0
    },
    {
      title: 'Quarta do Poder',
      body: 'Se você quer ser impactado pelo Espírito Santo hoje é o dia!\n\n\nHoje ás 20h00.',
      weekday: 4,
      hour: 18,
      minute: 0
    },
  ];

  for (const { title, body, weekday, hour, minute } of daysOfWeek) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        weekday,
        hour,
        minute,
        repeats: true
      }
    });
  }

  return null;
}