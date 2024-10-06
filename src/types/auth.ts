import { IPost } from "./post";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
  bio?: string;
  role: "admin" | "user";
  status: "active" | "diactive" | "blocked";
  userType: "basic" | "premium";
  followers: IUser[];
  following: IUser[];
  purchasedPosts: IPost[];
  isDeleted: boolean;
  isVerified: boolean;
  passwordChangedAt?: Date;
  premiumStartDate?: Date; // Date when premium started
  premiumEndDate?: Date; // Date when premium will expire
  subscriptionPlan?: "weekly" | "monthly";
  createdAt?: Date;
  updatedAt?: Date;
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

export interface IGetUserListResponse {
  success: boolean;
  message: string;
  data: IUser[];
}
