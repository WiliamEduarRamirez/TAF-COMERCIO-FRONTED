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

export class ProductFormValues {
  id?: string = undefined;
  code = '';
  denomination = '';
  description = '';
  cost = 0;
  price = 0;
  stock = 0;
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
      this.categoryId = product.categoryId;
      this.typeId = product.typeId;
    }
  }
}
