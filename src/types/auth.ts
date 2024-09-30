export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: string;
  name: string;
  addresses: any[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthData {
  accessToken: string;
  user: IUser;
}

export interface IAuthLoginResponse {
  success: boolean;
  message: string;
  data: AuthData;
}

export interface RegisterData {
  email: string;
  role: string;
  addresses: any[];
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
  data: RegisterData;
}

export interface IGetMeResponse {
  success: boolean;
  message: string;
  data: IUser;
}
