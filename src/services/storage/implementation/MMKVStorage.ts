import {MMKV} from 'react-native-mmkv';

import {Storage} from '../storage';

const MMKVInstance = new MMKV();

export const MMKVStorage: Storage = {
  setItem: async (key, value) => MMKVInstance.set(key, JSON.stringify(value)),
  getItem: key => {
    const item = MMKVInstance.getString(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  },
  removeItem: async key => MMKVInstance.delete(key),
};
