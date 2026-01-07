import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import { storage } from '../utils/storage';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// SAFEST POSSIBLE INTERCEPTOR (For Axios v1 + TypeScript)
apiClient.interceptors.request.use(async (config) => {
  const token = await storage.getToken();

  if (token) {
    const headers: any = config.headers || {};
    headers.Authorization = `Bearer ${token}`;
    config.headers = headers;
  }

  return config;
});

export default apiClient;
