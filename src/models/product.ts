export interface Product {
  id: string;
  code: string;
  denomination: string;
  description: string;
  stock: number;
  cost: number;
  price: number;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  type: Type;
  category: Category;
}

export interface Type {
  id: string;
  denomination: string;
  description: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  denomination: string;
  description: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}
