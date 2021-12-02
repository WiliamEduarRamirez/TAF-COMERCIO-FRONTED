import { Category } from '@/models/product';
import request from '@/api/api';

const categoriesServices = {
  list: (): Promise<Category[]> => request.get<Category[]>('/categories'),

};
export default categoriesServices;
