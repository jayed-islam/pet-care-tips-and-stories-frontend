import { IPagination } from "./common";
import { ILecturer } from "./lecturer";

export interface ILectureFormInputs {
  title: string;
  category: string;
  type: string;
  keywords: string[];
  lecturerID: string;
  creatorID: string;
  videoDuration: string;
  postedDate: Date;
  videoID: string;
}

export interface ILecture {
  _id: string;
  title: string;
  keywords: string[];
  category: string;
  lecturer: string | ILecturer;
  creatorID: string;
  videoDuration: string;
  postedDate: Date;
  videoID: string;
  priority: number;
  type: "masyala" | "lecture" | "jummalive";
  status: "pending" | "approved" | "rejected";
  isDeleted: boolean;
}
export const LECTURE_STATUS_OPTION = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export const LECTURE_TYPE_OPTION = [
  { value: "masyala", label: "Masyala" },
  { value: "lecture", label: "Lecture" },
  { value: "jummalive", label: "Jumma Live" },
];

export type ILectureTableFilterValue = string | string[];

export type ILectureTableFilters = {
  status: "all" | "pending" | "approved" | "rejected";
  type: "all" | "content" | "contentWithImage" | "contentWithVideo";
  searchTerm: string;
  category: string;
  page: number;
  limit: number;
};

export interface IGetSingleLectureResponse {
  data: ILecture;
  message: string;
  state: boolean;
}

export interface ICreateLectureResponse {
  data: ILecture;
  message: string;
  success: boolean;
}

export interface IGetLectureListForAdminResponse {
  data: {
    pagination: IPagination;
    lectures: ILecture[];
  };
  message: string;
  state: boolean;
}

export interface ILectureGetForAdminBody {
  creatorId: string;
  page: number;
  limit: number;
  searchTerm: string;
  category: string;
  type: string | null;
  isLowestFirst: boolean;
}
