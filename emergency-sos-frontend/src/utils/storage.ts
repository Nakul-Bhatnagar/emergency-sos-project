import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';

export const storage = {
  async setToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },
  async getToken() {
    return AsyncStorage.getItem(TOKEN_KEY);
  },
  async clearToken() {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};
