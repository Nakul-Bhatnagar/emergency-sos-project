import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { TextField } from '../../components/common/TextField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    try {
      setLoading(true);
      await register({ name, email, password });
    } catch (err: any) {
      Alert.alert('Registration failed', err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 16 }}>Create account</Text>
      <TextField label="Name" value={name} onChangeText={setName} />
      <TextField label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryButton title="Register" onPress={onRegister} loading={loading} />

      <Text style={{ marginTop: 16 }} onPress={() => navigation.goBack()}>
        Already have an account? Login
      </Text>
    </ScreenWrapper>
  );
};
