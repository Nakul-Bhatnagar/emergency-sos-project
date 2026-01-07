// src/context/SosContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import {sosService} from '../services/sosService';
import { useAuth } from './AuthContext';

type LocationPayload = {
  lat?: number;
  lng?: number;
  address?: string;
};

type SosEvent = {
  _id: string;
  user: string;
  status: string;
  triggeredAt: string;
  location?: { lat?: number; lng?: number; address?: string };
};

type SosContextValue = {
  isSosActive: boolean;
  events: SosEvent[];
  loadHistory: () => Promise<void>;
  triggerSos: (location?: LocationPayload) => Promise<void>;
  cancelSos: () => void;
};

const SosContext = createContext<SosContextValue | undefined>(undefined);

export const SosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isSosActive, setIsSosActive] = useState(false);
  const [events, setEvents] = useState<SosEvent[]>([]);

  const loadHistory = async () => {
    try {
      const res = await sosService.getHistory();
      setEvents(res.events || []);
    } catch (err) {
      console.log('load history error', err);
    }
  };

  const triggerSos = async (location?: LocationPayload) => {
    try {
      // pass location object (may be undefined)
      await sosService.triggerSos(location);
      setIsSosActive(true);
      await loadHistory();
    } catch (err: any) {
      console.log('triggerSos error', err?.response?.data || err);
      Alert.alert('Error', err?.response?.data?.message || 'Failed to trigger SOS');
      throw err;
    }
  };

  const cancelSos = () => {
    setIsSosActive(false);
  };

  return (
    <SosContext.Provider value={{ isSosActive, events, loadHistory, triggerSos, cancelSos }}>
      {children}
    </SosContext.Provider>
  );
};

export const useSos = () => {
  const ctx = useContext(SosContext);
  if (!ctx) throw new Error('useSos must be used within SosProvider');
  return ctx;
};
