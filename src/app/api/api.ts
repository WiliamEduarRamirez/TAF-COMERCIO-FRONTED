import axios, { AxiosError, AxiosResponse } from 'axios';
import sleep from '@/app/common/functions/sleep';
import store from '@/app/store';
import { PaginatedResult } from '@/app/models/pagination';
import { BASE_URL } from '@/app/common/constants/constants.app';

/*Start - Config vue-toastification*/
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import Vue from 'vue';
/*End - Config vue-toastification*/

const toast = Vue.use(Toast).$toast;

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(config => {
  const token = store.getters['auth/getToken'];
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async response => {
    await sleep(2000);
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedResult(response.data, JSON.parse(pagination));
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 400:
          break;
        case 401:
          break;
        case 404:
          break;
        case 500:
          break;
      }
    }
    switch (error.message) {
      case 'Network Error':
        toast.error('Verifique su conexión a internet');
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string): Promise<T> => axios.get<T>(url).then(responseBody),
  getParams: <T>(url: string, params: URLSearchParams): Promise<T> =>
    axios.get<T>(url, { params }).then(responseBody),
  // eslint-disable-next-line @typescript-eslint/ban-types
  post: <T>(url: string, body: {}): Promise<T> => axios.post<T>(url, body).then(responseBody),
  postFormData: <T>(url: string, body: FormData): Promise<T> =>
    axios
      .post<T>(url, body, {
        headers: { 'Content-type': 'multipart/form-data' }
      })
      .then(responseBody),
  // eslint-disable-next-line @typescript-eslint/ban-types
  put: <T>(url: string, body: {}): Promise<T> => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string): Promise<T> => axios.delete<T>(url).then(responseBody)
};

export default request;
