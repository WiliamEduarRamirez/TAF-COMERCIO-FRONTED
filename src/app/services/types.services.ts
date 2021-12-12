import { Type } from '@/app/models/product';
import request from '@/app/api/api';

const typesServices = {
  list: (): Promise<Type[]> => request.get<Type[]>('/types'),
};
export default typesServices;
