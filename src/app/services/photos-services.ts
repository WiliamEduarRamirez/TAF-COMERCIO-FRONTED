import axios, { AxiosResponse } from 'axios';
import { Photo } from '@/app/models/photo';
import request from '@/app/api/api';

const photosServices = {
  add: (file: File, productId: string): Promise<Photo> => {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('ProductId', productId);
    return axios
      .post<Photo>('/photos', formData, {
        headers: { 'Content-type': 'multipart/form-data' }
      })
      .then((response: AxiosResponse<Photo>) => response.data);
  },
  listOfProducts: (productId: string): Promise<Photo[]> =>
    request.get<Photo[]>(`/photos/products/${productId}`)
};
export default photosServices;
