export interface User {
  username: string;
  displayName: string;
  token: string;
  roles: string[];
}

export interface UserFormValues {
  email: string;
  password?: string;
  displayName?: string;
  username?: string;
}
