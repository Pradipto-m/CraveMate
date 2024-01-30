import { atom } from 'jotai';

interface Cart {
  size: number;
}

export const cartAtom = atom<Cart>({size: 0});
