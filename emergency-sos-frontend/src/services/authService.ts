import apiClient from './apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async login(payload: LoginPayload) {
    const res = await apiClient.post('/auth/login', payload);
    return res.data; // { token, user }
  },

  async register(payload: RegisterPayload) {
    const res = await apiClient.post('/auth/register', payload);
    return res.data; // { token, user }
  },

  async getMe() {
    const res = await apiClient.get('/auth/me');
    return res.data; // { user }
  },
};
