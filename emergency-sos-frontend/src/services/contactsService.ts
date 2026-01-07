// src/services/contactsService.ts
import apiClient from './apiClient';

export interface ContactInput {
  name: string;
  phone: string;
  relation?: string;
}

export interface Contact extends ContactInput {
  _id: string;
}

export const contactsService = {
  async getContacts(): Promise<Contact[]> {
    const res = await apiClient.get('/contacts');
    return res.data.contacts;
  },

  async addContact(contact: ContactInput): Promise<Contact> {
    const res = await apiClient.post('/contacts', contact);
    return res.data.contact;
  },

  async updateContact(id: string, contact: Partial<ContactInput>): Promise<Contact> {
    const res = await apiClient.put(`/contacts/${id}`, contact);
    return res.data.contact;
  },

  async deleteContact(id: string): Promise<void> {
    await apiClient.delete(`/contacts/${id}`);
  },
};
