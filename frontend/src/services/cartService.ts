import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://cravemate-pro.vercel.app/api/v1/cart';

const cartService = {
  getUserCart : async (userId: string) => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      const res = await axios.get(`${apiUrl}/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        validateStatus: (status) => {
          return status < 500;
        },
      }).catch((err) => {console.error(err); throw err;});
      return res;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  addToCart : async (
    userId: string, productId: string
  ) => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      const res = await axios.post(`${apiUrl}/add`,
      {
        userId: userId,
        productId: productId,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch((err) => {console.error(err); throw err;});

      return res;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  removeItem : async (
    userId: string, productId: string
  ) => {
    try {
      const data = { userId, productId };
      const token = await AsyncStorage.getItem('authtoken');
      const res = await axios.delete(`${apiUrl}/remove`, {
        data,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch((err) => {console.error(err); throw err;});

      return res;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

export default cartService;
