interface Product {
  productId: string;
  itemName: string;
  quantity:  number;
  _id:       string;
}

export interface orderModel {
  _id:      string;
  userId:   string;
  products: Product[];
  amount:   number;
  address:  string;
  phone:    string;
  status:   string;
  date:     string;
  __v:      number;
}
