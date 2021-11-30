import request from '@/api/api';
import { PaginatedResult } from '@/models/pagination';
import { Product } from '@/models/product';

const productsServices = {
  list: (params: URLSearchParams): Promise<PaginatedResult<Product[]>> =>
    request.getParams<PaginatedResult<Product[]>>('/products', params),
};
export default productsServices;
