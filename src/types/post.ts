/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "./auth";

export interface IFormInputs {
  title: string;
  category: string;
  type: string;
  keywords: string[];
  contents: string[];
}

export interface ICategory {
  name: string;
  description?: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPost {
  _id: string;
  author: IUser;
  content: string;
  isPremium: boolean;
  category: ICategory;
  upvotes: any[];
  downvotes: any[];
  comments: any[];
  isDeleted: boolean;
  isPublished: boolean;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const POST_STATUS_OPTION = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export type IPostFilterValue = string | string[];

export interface IGetSinglePostResponse {
  data: IPost;
  message: string;
  state: boolean;
}

export interface ICreatePostResponse {
  data: IPost;
  message: string;
  success: boolean;
}

export interface IPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IGetPostListResponse {
  data: {
    meta: IPaginationMeta;
    posts: IPost[];
  };
  message: string;
  state: boolean;
}

export interface IGetHomePostListResponse {
  data: {
    meta: IPaginationMeta;
    latestPosts: IPost[];
    posts: IPost[];
  };
  message: string;
  state: boolean;
}

export interface IPostFilters {
  category?: string;
  search?: string;
  sortBy?: "upvotes" | "newest";
  page: number;
  limit?: number;
}
