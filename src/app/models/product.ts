import { TypeModel } from '@/app/models/type';

export interface Product {
  id: string;
  categoryId: string;
  typeId: string;
  code: string;
  denomination: string;
  description: string;
  stock: number;
  cost: number;
  price: number;
  state?: boolean;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
  type: TypeModel;
  category: Category;
}

export interface Category {
  id: string;
  denomination: string;
  description: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}

export class ProductFormValues {
  id?: string = undefined;
  code = '';
  denomination = '';
  description = '';
  cost: number | null = null;
  price: number | null = null;
  stock: number | null = null;
  state?: boolean = undefined;
  categoryId = '';
  typeId = '';

  constructor(product?: ProductFormValues) {
    if (product) {
      this.id = product.id;
      this.code = product.code;
      this.denomination = product.denomination;
      this.description = product.description;
      this.cost = product.cost;
      this.price = product.price;
      this.stock = product.stock;
      this.state = product.state;
      this.categoryId = product.categoryId;
      this.typeId = product.typeId;
    }
  }
}
