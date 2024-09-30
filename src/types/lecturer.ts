export interface ILecturer {
  _id: string;
  name: string;
  image: string;
  priority: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetLecturerListResponse {
  data: ILecturer[];
  message: string;
  success: boolean;
}
