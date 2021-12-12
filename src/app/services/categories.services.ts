import { Category } from '@/app/models/product';
import request from '@/app/api/api';

const categoriesServices = {
  list: (typeId: string): Promise<Category[]> =>
    request.get<Category[]>(`/categories/type/${typeId}`),
};
export default categoriesServices;
