import { Category } from '@/models/product';
import request from '@/api/api';

const categoriesServices = {
  list: (typeId: string): Promise<Category[]> =>
    request.get<Category[]>(`/categories/type/${typeId}`),
};
export default categoriesServices;
