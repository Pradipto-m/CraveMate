import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://cravemate-pro.vercel.app/api/v1/user';

const authService = {
  // Signup api call
  signup : async (username: string, email: string, password: string) => {
    try {
      const user = {
        username: username,
        email: email,
        password: password,
      };

      let response = await axios.post(`${apiUrl}/signup`, user, {
        validateStatus: (status) => {
          return status < 500;
        },
      });
      return response;

    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  // Login api call
  login : async (email: string, password: string) => {
    try {
      const user = {
        email: email,
        password: password,
      };

      let response = await axios.post(`${apiUrl}/login`, user, {
        validateStatus: (status) => {
          return status < 500;
        },
      });

      if (response.status >= 200 && response.status < 300){
        await AsyncStorage.setItem('authtoken', response.data.token);
      }

      return response;

    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  fetchUser : async () => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      if (!token) {
        throw new Error('No auth token found');
      }
      let response = await axios.get(`${apiUrl}/auth`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response;

    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

export default authService;
