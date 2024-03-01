import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'http://192.168.0.103:3000/api';

const orderService = {
  getUserOrders : async (userId: string) => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      const res = await axios.get(`${apiUrl}/orders/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        validateStatus: (status) => {
          return status < 500;
        },
      })
      .catch((err) => {console.error(err); throw err;});

      return res;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  placeOrder : async (
  userId: string,
  address: string,
  phone: string) => {
    try {
      const data = {userId, address, phone};
      const token = await AsyncStorage.getItem('authtoken');
      const res = await axios.post(`${apiUrl}/cart/order`, data, {
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

  paymentService : async (amount: number) => {
    try {
      const res = await axios.post(`${apiUrl}/order/pay`, {amount});
      return res.data;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

export default orderService;
