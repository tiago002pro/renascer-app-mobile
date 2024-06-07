import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export class NotificationService {
  static async getExpoNotificationToken() {
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    return (await Notifications.getExpoPushTokenAsync({projectId})).data;
  }
}