import { IUser } from "./auth";

export enum UserRoles {
  admin = "admin",
  superAdmin = "superAdmin",
}

// export interface IToggle

export interface IToggleFollowUserResponse {
  data: IUser;
  message: string;
  success: boolean;
}

export interface IUpdateUserProfileResponse {
  data: IUser;
  message: string;
  success: boolean;
}

export interface IUpdateUserProfileData {
  bio?: string;
  address?: string;
  name?: string;
  phone?: string;
  userId: string;
}
