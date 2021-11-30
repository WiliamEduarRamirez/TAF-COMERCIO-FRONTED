import axios, { AxiosResponse } from 'axios';
import { Photo } from '@/models/photo';

const photosServices = {
  add: (file: File, productId: string): Promise<Photo> => {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('ProductId', productId);
    return axios
      .post<Photo>('/photos', formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((response: AxiosResponse<Photo>) => response.data);
  },
};
export default photosServices;
