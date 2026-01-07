import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { TextField } from '../../components/common/TextField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { ROUTES } from '../../config/routes';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      await login({ email, password });
    } catch (err: any) {
      Alert.alert('Login failed', err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 16 }}>Welcome back</Text>
      <TextField label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryButton title="Login" onPress={onLogin} loading={loading} />

      <Text
        style={{ marginTop: 16 }}
        onPress={() => navigation.navigate(ROUTES.AUTH.REGISTER as 'Register')}
      >
        Don’t have an account? Register
      </Text>
    </ScreenWrapper>
  );
};
