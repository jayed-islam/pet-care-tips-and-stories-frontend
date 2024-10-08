/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "./auth";
import { IComment } from "./comment";

export interface IFormInputs {
  title: string;
  category: string;
  type: string;
  keywords: string[];
  contents: string[];
}

export interface ICategory {
  _id: string;
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
  price: string;
  upvotes: any[];
  downvotes: any[];
  comments: IComment[];
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

export type IVotePostBody = {
  voteType: "upvote" | "downvote";
  postId: string;
};

export interface IGetSinglePostResponse {
  data: {
    post: IPost;
    relatedPosts: IPost[];
  };
  message: string;
  success: boolean;
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

export interface IGetPostListForAdminResponse {
  data: IPost[];
  message: string;
  state: boolean;
}

export interface IGetPayemntListForAdminResponse {
  data: IPayment[];
  message: string;
  state: boolean;
}

export interface IPayment {
  _id: string;
  createdAt: string;
  user: IUser;
  post: IPost;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
  transactionId: string;
  additionalInfo?: string;
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
  category?: string[];
  search?: string;
  sortBy?: "upvotes" | "newest";
  page: number;
  limit?: number;
}

export interface IGetUserPostFilters {
  category?: string[];
  search?: string;
  sortBy?: "upvotes" | "newest";
  page: number;
  limit?: number;
  userId?: string;
}

export interface IPaymentResponse {
  success: boolean;
  message: string;
  data: {
    result: string;
    payment_url: string;
  };
}
