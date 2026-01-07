// src/hooks/useCurrentLocation.ts
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export interface CurrentLocation {
  lat: number;
  lng: number;
  address?: string;
}

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<CurrentLocation | null>(null);

  const requestAndFetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required for SOS.');
      return;
    }

    const pos = await Location.getCurrentPositionAsync({});
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    let address: string | undefined;
    try {
      const places = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      if (places[0]) {
        const p = places[0];
        address = [p.name, p.street, p.city, p.region, p.country]
          .filter(Boolean)
          .join(', ');
      }
    } catch (e) {
      // ignore if reverse geocoding fails
    }

    setLocation({ lat, lng, address });
    return { lat, lng, address };
  };

  return { location, requestAndFetchLocation };
};
