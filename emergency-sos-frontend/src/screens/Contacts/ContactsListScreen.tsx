import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { PrimaryButton } from '../../components/common/PrimaryButton';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

// For now, dummy data
const DUMMY_CONTACTS: Contact[] = [
  { id: '1', name: 'Mom', phone: '9876543210' },
  { id: '2', name: 'Dad', phone: '9123456780' },
];

export const ContactsListScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <PrimaryButton title="Add Contact (coming soon)" onPress={() => {}} />

      <FlatList
        data={DUMMY_CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}
          >
            <Text style={{ fontWeight: '600' }}>{item.name}</Text>
            <Text>{item.phone}</Text>
          </View>
        )}
      />
    </ScreenWrapper>
  );
};
