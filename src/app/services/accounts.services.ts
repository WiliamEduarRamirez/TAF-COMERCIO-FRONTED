import { User, UserFormValues } from '@/app/models/user';
import request from '@/app/api/api';

const accountsServices = {
  login: (user: UserFormValues): Promise<User> => request.post<User>('/account/login', user),
  current: (): Promise<User> => request.get<User>('/account'),
};
export default accountsServices;
