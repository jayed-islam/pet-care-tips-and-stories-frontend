import { IUser } from "./auth";
import { IPost } from "./post";

export interface IPage {
  _id: string;
  name: string;
  description: string;
  coverPhoto?: string;
  logo: string;
  createdBy: IUser;
  admins: IUser[];
  moderators: IUser[];
  members: IUser[];
  posts: IPost[];
  followers: IUser[];
  likes: IUser[];
  isPrivate: boolean;
  isDeleted: boolean;
}
