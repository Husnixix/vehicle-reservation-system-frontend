export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  userRole: string;
}

export interface UserAuthContextType {
  user: IUser | null;
  login: (email: string, password: string) => Promise<{message: string; data: IUser}>;
  logout: () => void;
  loading: any;
}

export interface UserContextType {
  createUser: (user: IUser) => Promise<{message: string; data: IUser}>;
  getUsers: () => void;
}