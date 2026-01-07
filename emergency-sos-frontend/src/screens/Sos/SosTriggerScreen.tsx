// src/screens/Sos/SosTriggerScreen.tsx
import React, { useEffect } from 'react';
import { Text, Alert, TouchableOpacity, View, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';

import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { SosBigButton } from '../../components/sos/SosBigButton';
import { useSos } from '../../context/SosContext';
import { useVoiceTrigger } from '../../hooks/useVoiceTrigger';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useContacts } from '../../context/ContactsContext';

export const SosTriggerScreen: React.FC = () => {
  const { isSosActive, triggerSos, cancelSos, events, loadHistory } = useSos();
  const { listening, startListening, stopListening, simulatePhrase } = useVoiceTrigger();
  const { requestAndFetchLocation } = useCurrentLocation();
  const { contacts } = useContacts();

  useEffect(() => {
    loadHistory().catch((err) => console.log('History error', err));
  }, []);

  const callPrimaryContact = async () => {
    if (!contacts || contacts.length === 0) return;
    const primary = contacts[0];
    if (!primary?.phone) return;
    const url = `tel:${primary.phone}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Cannot make call', 'This device cannot open the phone dialer.');
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      console.log('Call error', err);
    }
  };

  const handlePress = async () => {
    if (isSosActive) {
      cancelSos();
      Alert.alert('SOS cancelled');
      return;
    }

    try {
      // get location first (may return null)
      const loc = await requestAndFetchLocation(); // loc === { lat, lng, address } | null

      // trigger SOS and pass location (sosService / backend expects optional location)
      await triggerSos(loc || undefined);

      // show immediate local notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'SOS sent!',
          body: 'Emergency alerts have been sent to your contacts.',
        },
        trigger: null,
      });

      // open dialer to primary contact (user must confirm call)
      callPrimaryContact();

      Alert.alert('SOS triggered!');
    } catch (err: any) {
      console.log('SOS error', err?.response?.data || err);
      Alert.alert('Error', err?.response?.data?.message || 'Failed to trigger SOS');
    }
  };

  return (
    <ScreenWrapper>
      <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 16 }}>
        Press the button to send an emergency alert.
      </Text>

      <SosBigButton active={isSosActive} onPress={handlePress} />

      {/* Voice trigger controls */}
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontWeight: '600', marginBottom: 8 }}>Voice Trigger (demo)</Text>

        <TouchableOpacity
          style={{
            backgroundColor: listening ? '#C62828' : '#2E7D32',
            padding: 10,
            borderRadius: 999,
            marginBottom: 8,
          }}
          onPress={listening ? stopListening : startListening}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            {listening ? 'Stop Listening' : 'Start Listening'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#1976D2',
            padding: 10,
            borderRadius: 999,
          }}
          onPress={simulatePhrase}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            Simulate "help me" voice
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginTop: 24, fontSize: 16, fontWeight: '600' }}>SOS History:</Text>

      {events.length === 0 && <Text>No SOS events yet.</Text>}

      {events.map((e, i) => (
        <Text key={i}>
          • {e.status} at {new Date(e.triggeredAt).toLocaleString()}
        </Text>
      ))}
    </ScreenWrapper>
  );
};
