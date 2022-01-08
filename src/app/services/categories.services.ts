import request from '@/app/api/api';
import { PaginatedResult } from '@/app/models/pagination';
import { Category, CategoryFormValues } from '@/app/models/category';

const categoriesServices = {
  list: (params: URLSearchParams): Promise<PaginatedResult<Category[]>> =>
    request.getParams<PaginatedResult<Category[]>>(`/categories`, params),
  add: (data: CategoryFormValues): Promise<void> => request.post<void>('/categories', data),
  edit: (data: CategoryFormValues): Promise<void> =>
    request.put<void>(`/categories/${data.id}`, data)
};
export default categoriesServices;
