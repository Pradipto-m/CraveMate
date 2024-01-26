import { atom } from 'jotai';
import { productModel } from '../models/productModel';
import productService from '../services/productService';

export const productAtom = atom<productModel[]>([]);

export const fetchProducts = atom(
  (get) => get(productAtom),
  async (get, set) => {
    try {
      const res = await productService.getAll();
      const products = res!.data;
      set(productAtom, products);

    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const fetchByCategory = atom(
  (get) => get(productAtom),
  async (get, set, genre: string) => {
    try {
      const res = await productService.getByGenre(genre);
      const products = res!.data;
      set(productAtom, products);

    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const fetchBySearch = atom(
  (get) => get(productAtom),
  async (get, set, searched: string) => {
    try {
      const res = await productService.searchProduct(searched);
      const products = res!.data;
      set(productAtom, products);

    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
