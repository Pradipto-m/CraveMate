import { atom } from 'jotai';
import { userModel } from '../models/userModel';
import authService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialUser: userModel = {
  _id: '',
  username: '',
  email: '',
  password: '',
  __v: 0,
};

export const userAtom = atom<userModel>(initialUser);

export const fetchUser = atom(
  (get) => get(userAtom),
  async (get, set) => {
    try {
      const res = await authService.fetchUser();
      if (res.status !== 200) {
        throw new Error('Authorization failed');
      }
      const user = res.data;
      set(userAtom, user);

    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const logoutAtom = atom(
  null,
  async (get, set) => {
    try {
      await AsyncStorage.removeItem('authtoken');
      set(userAtom, initialUser);
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  }
);
