import { StyleSheet, View } from "react-native";
import { THEME } from '../../styles/theme';
import { Text } from "native-base";
import { usePushNotifications } from "../../../usePushNotifications";
import ButtonComponent from "../../components/ButtonComponent";
import * as Notifications from 'expo-notifications';

export default function ExpoNotification() {
  const { expoPushToken, notification } = usePushNotifications();

  const data = JSON.stringify(notification, undefined, 2);

  return (
    <View style={styles.container}>
      <ButtonComponent
        label="Nova notificação"
        bntFunction={async () => {
          await schedulePushNotification();
        }}
      />
      <Text style={styles.text}>Token:  {expoPushToken?.data ?? ""}</Text>
      <Text style={styles.text}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: THEME.colors.font,
  }
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: { seconds: 2 },
  });
}
