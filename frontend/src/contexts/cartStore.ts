import { atom } from 'jotai';
import { cartModel } from '../models/cartModel';
import { productModel } from '../models/productModel';
import cartService from '../services/cartService';
import productService from '../services/productService';

const initialCart : cartModel = {
  _id:      '',
  userId:   '',
  products: [],
  amount:   0,
  __v:      0,
};

export const cartAtom = atom<cartModel>(initialCart);
export const itemsAtom = atom<productModel[]>([]);

export const fetchUserCart = atom(
  null,
  async (get, set, userId: string) => {
    try {
      const res = await cartService.getUserCart(userId);
      if (res.status < 300) {
        const cart = res.data;
        set(cartAtom, cart);
        // fetch all the products in the cart
        cart.products.forEach( async (product: any) => {
          const response = await productService.fetchById(product.productId);
          const item = response.data;
          set(itemsAtom, (prev) => ([...prev, item]));
        });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const addToCart = atom(
  null,
  async (get, set, userId: string, productId: string) => {
    try {
      const res = await cartService.addToCart(userId, productId);
      if (res.status < 300) {
        const cart = res.data;
        set(cartAtom, cart);
        // fetch the product if not already in the itemsList
        const prevItems = get(itemsAtom);
        for (const product of cart.products) {
          if (!prevItems.find((item) => item._id === product.productId)) {
            const response = await productService.fetchById(product.productId);
            const item = response.data;
            set(itemsAtom, (prev) => ([...prev, item]));
          }
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const removeFromCart = atom(
  null,
  async (get, set, userId: string, productId: string) => {
    try {
      const res = await cartService.removeItem(userId, productId);
      if (res.status < 300) {
        const cart = res.data;
        set(cartAtom, cart);
        // remove the product from the itemsList
        // only if it doesn't exists in the cart
        if (!cart.products.find((item:any) => item.productId === productId)) {
          set(itemsAtom, (prev) => prev.filter(
            (item) => item._id !== productId));
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
