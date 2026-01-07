import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { TextField } from '../../components/common/TextField';
import { useContacts } from '../../context/ContactsContext';

export const AddContactScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const { addContact } = useContacts();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('');

  const save = async () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Name and phone are required');
      return;
    }
    await addContact({ name, phone, relation });
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Add Contact</Text>

      <TextField label="Name" value={name} onChangeText={setName} />
      <TextField label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextField label="Relation (optional)" value={relation} onChangeText={setRelation} />

      <TouchableOpacity
        style={{
          backgroundColor: '#D32F2F',
          padding: 14,
          borderRadius: 999,
          marginTop: 16,
        }}
        onPress={save}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Save</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};
