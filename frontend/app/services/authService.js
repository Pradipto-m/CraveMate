import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiUrl = 'http://192.168.0.101:3000/api/user';

const authService = {
  // Signup api call
  signup : async (username, email, password) => {
    try {
      const user = {
        username: username,
        email: email,
        password: password
      };

      let response = await axios.post(`${apiUrl}/signup`, user, {
        validateStatus: (status) => {
          return status < 500;
        }
      });
      return response;

    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  // Login api call
  login : async (email, password) => {
    try {
      const user = {
        email: email,
        password: password
      };

      let response = await axios.post(`${apiUrl}/login`, user, {
        validateStatus: (status) => {
          return status < 500;
        }
      });

      if(response.status < 300)
        await AsyncStorage.setItem('authtoken', response.data.token);

      return response;

    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default authService;