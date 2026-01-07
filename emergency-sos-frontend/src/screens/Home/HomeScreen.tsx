// src/screens/Home/HomeScreen.tsx
import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { ROUTES } from '../../config/routes';
import { useAuth } from '../../context/AuthContext';

export const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const { logout, user } = useAuth();

  return (
    <ScreenWrapper>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 4 }}>
        Hi, {user?.name || 'User'}
      </Text>
      <Text style={{ marginBottom: 20, color:       '#555' }}>
        Tap SOS at any time to send an emergency alert.
      </Text>


      <PrimaryButton
        title="Open SOS Screen"
        onPress={() => navigation.navigate(ROUTES.APP.SOS as never)}
      />

      <PrimaryButton
        title="Emergency Contacts"
        onPress={() => navigation.navigate(ROUTES.APP.CONTACTS as never)}
      />

      <PrimaryButton
        title="Settings"
        onPress={() => navigation.navigate('Settings' as never)}
      />

      <PrimaryButton title="Logout" onPress={logout} />
    </ScreenWrapper>
  );
};
