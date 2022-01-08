import request from '@/app/api/api';
import { PaginatedResult } from '@/app/models/pagination';
import { TypeFormValues, TypeModel } from '@/app/models/type';

const typesServices = {
  list: (params: URLSearchParams): Promise<PaginatedResult<TypeModel[]>> =>
    request.getParams<PaginatedResult<TypeModel[]>>('/types', params),
  add: (data: TypeFormValues): Promise<void> => request.post<void>('/types', data),
  edit: (data: TypeFormValues): Promise<void> => request.put<void>(`/types/${data.id}`, data)
};
export default typesServices;
