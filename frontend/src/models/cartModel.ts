interface Product {
  productId: string;
  quantity:  number;
  _id:       string;
}

export interface cartModel {
  _id:      string;
  userId:   string;
  products: Product[];
  amount:   number;
  __v:      number;
}
