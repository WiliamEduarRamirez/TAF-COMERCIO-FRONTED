import { Product } from '@/app/models/product';

export interface CartItem {
  amount: number;
  product: Product;
}
