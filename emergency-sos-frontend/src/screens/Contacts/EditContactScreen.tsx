// src/screens/Contacts/EditContactScreen.tsx
import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { TextField } from '../../components/common/TextField';
import { useContacts } from '../../context/ContactsContext';

export const EditContactScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const { updateContact } = useContacts();

  const contact = route.params?.contact;

  if (!contact) {
    return (
      <ScreenWrapper>
        <Text>No contact data.</Text>
      </ScreenWrapper>
    );
  }

  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [relation, setRelation] = useState(contact.relation || '');

  const save = async () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Name and phone are required');
      return;
    }
    await updateContact(contact._id, { name, phone, relation });
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Edit Contact</Text>

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
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};
