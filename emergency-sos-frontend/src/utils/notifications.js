import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushToken() {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Push notification permission denied');
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}
