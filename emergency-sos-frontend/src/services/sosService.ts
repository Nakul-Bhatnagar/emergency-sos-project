import apiClient from './apiClient';
import * as Location from 'expo-location';

export const sosService = {
  async triggerSos() {
    try {
      // Ask permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('❌ Location permission not granted');
        return apiClient.post('/sos/trigger', {}); // still trigger SOS
      }

      // Get current location
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const payload = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      console.log('📡 Sending Location →', payload);

      const res = await apiClient.post('/sos/trigger', payload);
      return res.data;

    } catch (err) {
      console.log('Location fetch error', err);
      return apiClient.post('/sos/trigger', {}); // fallback
    }
  },

  async getHistory() {
    const res = await apiClient.get('/sos/history');
    return res.data;
  },
};
