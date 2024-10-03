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
