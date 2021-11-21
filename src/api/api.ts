import axios, { AxiosResponse } from 'axios';
import sleep from '@/functions/sleep';
import { BASE_URL } from '@/constants/app-constants';

axios.defaults.baseURL = BASE_URL;
axios.interceptors.response.use(async (response) => {
  await sleep(1000);
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
