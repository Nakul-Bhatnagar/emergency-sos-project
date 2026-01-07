import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { useContacts } from '../../context/ContactsContext';

export const ContactsScreen: React.FC = () => {
  const { contacts, loading, loadContacts, deleteContact } = useContacts();
  const navigation: any = useNavigation();

  useEffect(() => {
    loadContacts().catch((err) => console.log('load contacts error', err));
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert('Delete contact?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteContact(id);
        },
      },
    ]);
  };

  return (
    <ScreenWrapper>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>
        Emergency Contacts
      </Text>

      {loading && <ActivityIndicator />}

      {!loading && contacts.length === 0 && (
        <Text>No contacts yet. Add your first emergency contact.</Text>
      )}

      {contacts.map((c) => (
        <View
          key={c._id}
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{c.name}</Text>
          <Text>{c.phone}</Text>
          {c.relation ? <Text style={{ color: 'gray' }}>{c.relation}</Text> : null}

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate('EditContact' as never, { contact: c })}
            >
              <Text style={{ color: 'blue' }}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(c._id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={{
          backgroundColor: '#D32F2F',
          padding: 14,
          marginTop: 20,
          borderRadius: 999,
        }}
        onPress={() => navigation.navigate('AddContact' as never)}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
          + Add Contact
        </Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};
