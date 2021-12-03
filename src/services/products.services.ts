import request from '@/api/api';
import { PaginatedResult } from '@/models/pagination';
import { Product, ProductFormValues } from '@/models/product';

const productsServices = {
  list: (params: URLSearchParams): Promise<PaginatedResult<Product[]>> =>
    request.getParams<PaginatedResult<Product[]>>('/products', params),
  add: (data: ProductFormValues): Promise<Product> => request.post<Product>('/products', data),
  changeStatus: (productId: string, state: boolean): Promise<void> =>
    request.put<void>(`/products/${productId}/changeStatus`, { state }),
};
export default productsServices;
