import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const localhost = '192.168.0.103';
const apiUrl = `http://${localhost}:3000/api/product`;

const products = {
  getAll: async () => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      let response = await axios.get(`${apiUrl}/all`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Bearer': token,
        },
        validateStatus: (status) => {
          return status < 500;
        },
      }).catch((err) => {
        console.log(err);
      });
      return response;

    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

export default products;
