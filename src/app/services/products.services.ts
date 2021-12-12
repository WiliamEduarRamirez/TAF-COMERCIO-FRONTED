import request from '@/app/api/api';
import { PaginatedResult } from '@/app/models/pagination';
import { Product, ProductFormValues } from '@/app/models/product';

const productsServices = {
  list: (params: URLSearchParams): Promise<PaginatedResult<Product[]>> =>
    request.getParams<PaginatedResult<Product[]>>('/products', params),
  add: (data: ProductFormValues): Promise<Product> => request.post<Product>('/products', data),
  edit: (data: ProductFormValues): Promise<Product> =>
    request.put<Product>(`/products/${data.id}`, data),
  changeStatus: (productId: string, state: boolean): Promise<void> =>
    request.put<void>(`/products/${productId}/changeStatus`, { state }),
};
export default productsServices;
