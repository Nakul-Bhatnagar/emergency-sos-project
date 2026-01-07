// src/config/env.ts
import { Platform } from 'react-native';

// 👉 Change this to YOUR laptop's Wi-Fi IP (the one Expo shows: exp://192.168.xx.xx:8081)
const ANDROID_LAN_IP = 'http://10.81.232.139:5000'; // example

const BASE_URL =
  Platform.OS === 'android'
    ? ANDROID_LAN_IP   // phone uses Wi-Fi IP
    : 'http://localhost:5000'; // web (and iOS simulator) use localhost

export const API_BASE_URL = 'http://localhost:5000/api';
