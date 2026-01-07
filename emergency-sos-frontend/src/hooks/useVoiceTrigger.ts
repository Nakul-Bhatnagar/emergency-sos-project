import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useSos } from '../context/SosContext';

const SECRET_WORD = 'help';
const WINDOW_MS = 5000; // 5 seconds window

export const useVoiceTrigger = () => {
  const { triggerSos } = useSos();
  const [listening, setListening] = useState(false);
  const helpCountRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const triggeredRef = useRef(false);

  const resetCounter = () => {
    helpCountRef.current = 0;
    lastTimeRef.current = null;
    triggeredRef.current = false;
  };

  const startListening = async () => {
    setListening(true);
    resetCounter();
    Alert.alert('Listening started', 'Say "help" twice within 5 seconds.');
    // later: start real Voice.start('en-US') here
  };

  const stopListening = async () => {
    setListening(false);
    resetCounter();
    Alert.alert('Listening stopped', 'Voice trigger is OFF.');
    // later: stop real voice recognition
  };

  const onResult = async (text: string) => {
    if (!listening) return;
    const now = Date.now();
    const normalized = text.toLowerCase();

    if (!normalized.includes(SECRET_WORD)) {
      return;
    }

    if (lastTimeRef.current && now - lastTimeRef.current > WINDOW_MS) {
      // too late, reset window
      helpCountRef.current = 0;
    }

    helpCountRef.current += 1;
    lastTimeRef.current = now;

    if (!triggeredRef.current && helpCountRef.current >= 2) {
      triggeredRef.current = true;
      await triggerSos();
      Alert.alert('SOS triggered', 'Detected "help" twice via voice.');
      // keep listening in case you want multiple SOS; or call stopListening()
    }
  };

  const simulatePhrase = async () => {
    await onResult('help');
    await onResult('help');
  };

  useEffect(() => {
    if (!listening) {
      resetCounter();
    }
  }, [listening]);

  return {
    listening,
    startListening,
    stopListening,
    simulatePhrase,
    onResult, // will be used by real STT later
  };
};
