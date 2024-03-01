import { atom } from 'jotai';
import { orderModel } from '../models/orderModel';
import orderService from '../services/orderService';
import productService from '../services/productService';
import { emptyCart } from './cartStore';

export const orderAtom = atom<orderModel[]>([]);

export const fetchUserOrders = atom(
  get => get(orderAtom),
  async (get, set, userId: string) => {
    try {
      const res = await orderService.getUserOrders(userId);
      if (res.status < 300) {
        const orders = res.data;

        // Fetching the product names for each order
        const updateOrder = await Promise.all(orders.map(async (order: any) => {
          const updatedName = await Promise.all(
            order.products.map(async (product: any) => {
            const response = await productService.fetchById(product.productId);
            return { ...product, itemName: response.data.name };
          }));
          return { ...order, products: updatedName };
        }));

        set(orderAtom, updateOrder);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const placeOrderAtom = atom(
  null,
  async (get, set, userId: string, address: string, phone: string) => {
    try {
      const res = await orderService.placeOrder(userId, address, phone);
      if (res.status < 300) {
        const orders = res.data;

        // Fetching the product names for each order
        const updateOrder = await Promise.all(orders.map(async (order: any) => {
          const updatedName = await Promise.all(
            order.products.map(async (product: any) => {
            const response = await productService.fetchById(product.productId);
            return { ...product, itemName: response.data.name };
          }));
          return { ...order, products: updatedName };
        }));

        set(orderAtom, updateOrder);
        // Empty the cart
        set(emptyCart);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
