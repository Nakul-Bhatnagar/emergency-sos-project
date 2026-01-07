import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// CONTEXTS
import { AuthProvider } from './src/context/AuthContext';
import { SosProvider } from './src/context/SosContext';
import { ContactsProvider } from './src/context/ContactsContext';

// NAVIGATOR
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {

  useEffect(() => {

    // Global Notification Behavior
    Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      } as Notifications.NotificationBehavior;
    },
  });



    // Request permissions + Android Channel
    (async () => {
      try {

        // Permission check
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          await Notifications.requestPermissionsAsync();
        }

        // ANDROID ONLY
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            sound: true as any,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }

      } catch (err) {
        console.log('Notification permission setup error:', err);
      }
    })();

  }, []);

  return (
    <AuthProvider>
      <SosProvider>
        <ContactsProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ContactsProvider>
      </SosProvider>
    </AuthProvider>
  );
}
