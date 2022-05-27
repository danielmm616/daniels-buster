export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}
