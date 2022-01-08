import { TypeModel } from '@/app/models/type';
import { Category } from '@/app/models/category';

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
