import { Product } from '@/models/product';

export interface CartItem {
  amount: number;
  product: Product;
}
