import axios from "axios";
import { storage } from "../utils/storage";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",   // change if backend URL different
});

// attach token automatically
api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
