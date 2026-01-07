// src/screens/Settings/SettingsScreen.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';

export const SettingsScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>
        Settings
      </Text>

      <View>
        <Text>- Voice keyword configuration (coming soon)</Text>
        <Text>- Notification preferences (coming soon)</Text>
        <Text>- Location permission status (coming soon)</Text>
      </View>
    </ScreenWrapper>
  );
};
