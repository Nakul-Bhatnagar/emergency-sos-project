// src/context/ContactsContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { contactsService, Contact, ContactInput } from '../services/contactsService';

interface ContactsContextValue {
  contacts: Contact[];
  loading: boolean;
  loadContacts: () => Promise<void>;
  addContact: (data: ContactInput) => Promise<void>;
  updateContact: (id: string, data: Partial<ContactInput>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

const ContactsContext = createContext<ContactsContextValue | undefined>(undefined);

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const list = await contactsService.getContacts();
      setContacts(list);
    } catch (err) {
      console.log('Failed to load contacts', err);
      Alert.alert('Error', 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (data: ContactInput) => {
    const newContact = await contactsService.addContact(data);
    setContacts((prev) => [...prev, newContact]);
  };

  const updateContact = async (id: string, data: Partial<ContactInput>) => {
    const updated = await contactsService.updateContact(id, data);
    setContacts((prev) => prev.map((c) => (c._id === id ? updated : c)));
  };

  const deleteContact = async (id: string) => {
    await contactsService.deleteContact(id);
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, loading, loadContacts, addContact, updateContact, deleteContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error('useContacts must be used within ContactsProvider');
  return ctx;
};
