export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = {
  productId: number;
  quantity: number;
  name: string;
  price: number;
};

export type Purchase = {
  id: string;
  date: string;
  total: number;
  items: CartItem[];
};
