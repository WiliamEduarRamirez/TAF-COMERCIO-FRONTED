import { Type } from '@/models/product';
import request from '@/api/api';

const typesServices = {
  list: (): Promise<Type[]> => request.get<Type[]>('/types'),
};
export default typesServices;
