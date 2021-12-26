import { Photo } from '@/app/models/photo';
import request from '@/app/api/api';

const photosServices = {
  add: (file: File, productId: string): Promise<Photo> => {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('ProductId', productId);
    return request.postFormData('/photos', formData);
  },
  setMain: (photoId: string, productId: string): Promise<void> =>
    request.post<void>(`/photos/${photoId}/setMain`, { productId }),
  listOfProducts: (productId: string): Promise<Photo[]> =>
    request.get<Photo[]>(`/photos/products/${productId}`)
};
export default photosServices;
