// src/navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

// AUTH SCREENS
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';

// APP SCREENS
import { HomeScreen } from '../screens/Home/HomeScreen';
import { SosTriggerScreen } from '../screens/Sos/SosTriggerScreen';
import { ContactsScreen } from '../screens/Contacts/ContactsScreen';
import { AddContactScreen } from '../screens/Contacts/AddContactScreen';
import { EditContactScreen } from '../screens/Contacts/EditContactScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SosTrigger" component={SosTriggerScreen} />
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="AddContact" component={AddContactScreen} />
          <Stack.Screen name="EditContact" component={EditContactScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
