import { IUser } from "./auth";
import { IPagination } from "./common";

export interface IFormInputs {
  title: string;
  category: string;
  type: string;
  keywords: string[];
  contents: string[];
}

export interface IDeenbookStory {
  _id: string;
  image: string;
  creator: string | IUser;
  content: string;
  priority: number;
  status: "pending" | "approved" | "rejected";
  isDeleted: boolean;
  createdAt: Date;
}

export interface IDeenbook {
  _id: string;
  title: string;
  contents: string[];
  images: string[];
  keywords: string[];
  category: string;
  creatorID: string;
  videoID: string;
  type: "content" | "contentWithImage" | "contentWithVideo";
  status: "pending" | "approved" | "rejected";
  isDeleted: boolean;
  creatorVerifyId?: string;
}

export const DEENBOOK_STATUS_OPTION = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export const DEENBOOK_TYPE_OPTION = [
  { value: "content", label: "Content Only" },
  { value: "contentWithImage", label: "Content with Image" },
  { value: "contentWithVideo", label: "Content with Video" },
];

export type IDeenbookFilterValue = string | string[];

export type IDeenbookFilters = {
  status: "all" | "pending" | "approved" | "rejected";
  type: "all" | "content" | "contentWithImage" | "contentWithVideo";
  searchTerm: string;
  category: string;
  page: number;
  limit: number;
};

export interface IGetSingleDeenbookPostResponse {
  data: IDeenbook;
  message: string;
  state: boolean;
}

export interface ICreateDeenbookPoastResponse {
  data: IDeenbook;
  message: string;
  success: boolean;
}

export interface ICreateDeenbookStoryPoastResponse {
  data: IDeenbookStory;
  message: string;
  success: boolean;
}

export interface IGetDeenbookPostListResponse {
  data: {
    pagination: IPagination;
    deenbookPosts: IDeenbook[];
  };
  message: string;
  state: boolean;
}

export interface IGetDeenbookStoryPostListResponse {
  data: {
    pagination: IPagination;
    deenbookStories: IDeenbookStory[];
  };
  message: string;
  state: boolean;
}

export interface IDeenbookPostGetForAdminBody {
  creatorId: string;
  page: number;
  limit: number;
  searchTerm: string;
  category: string;
  type: string | null;
  isLowestFirst: boolean;
  status: string | null;
}

export interface IGetDeenbookStoryPostForAdminBody {
  creatorId: string | null;
  page: number;
  limit: number;
}

// export interface ICreateDeenbookPostBody {
//   file: File;
//   data:
// }

export interface IDeenbookStoryUpdateByAdminBody {
  creatorId: string;
  content: string;
  isDeleted: boolean;
  storyId: string;
  deenbookStoryData: {};
}

export interface IDeenbookStoryDeleteByAdminBody {
  id: string;
  creatorId: string;
}
