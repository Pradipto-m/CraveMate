import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://cravemate-pro.vercel.app/api/v1/product';

const productService = {
  getAll: async () => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      let response = await axios.get(`${apiUrl}/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).catch((err) => {
        console.error(err);
      });

      return response;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getByGenre: async (genre: string) => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      let response = await axios.get(`${apiUrl}/category`,{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          'genre': genre,
        },
      }).catch((err) => {
        console.error(err);
      });

      return response;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  searchProduct: async (name: string) => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      let response = await axios.get(`${apiUrl}/search/${name}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).catch((err) => {
        console.error(err);
      });
      return response;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  fetchById: async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      const response = await axios.get(`${apiUrl}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

export default productService;
