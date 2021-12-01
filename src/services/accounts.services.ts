import { User, UserFormValues } from '@/models/user';
import request from '@/api/api';

const accountsServices = {
  login: (user: UserFormValues): Promise<User> => request.post<User>('/account/login', user),
  current: (): Promise<User> => request.get<User>('/account'),
};
export default accountsServices;
