import axios, { AxiosResponse } from 'axios';
import sleep from '@/functions/sleep';
import { BASE_URL } from '@/constants/app-constants';
import store from '@/store/index';
import { PaginatedResult } from '@/models/pagination';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
  const token = store.getters['auth/getToken'];
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(async (response) => {
  await sleep(1000);
  const pagination = response.headers['pagination'];
  if (pagination) {
    response.data = new PaginatedResult(response.data, JSON.parse(pagination));
    return response as AxiosResponse<PaginatedResult<any>>;
  }
  return response;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string): Promise<T> => axios.get<T>(url).then(responseBody),
  getParams: <T>(url: string, params: URLSearchParams): Promise<T> =>
    axios.get<T>(url, { params }).then(responseBody),
  // eslint-disable-next-line @typescript-eslint/ban-types
  post: <T>(url: string, body: {}): Promise<T> => axios.post<T>(url, body).then(responseBody),
  // eslint-disable-next-line @typescript-eslint/ban-types
  put: <T>(url: string, body: {}): Promise<T> => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string): Promise<T> => axios.delete<T>(url).then(responseBody),
};

export default request;
