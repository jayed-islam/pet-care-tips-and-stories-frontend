export interface ICreateCommentRequest {
  content: string;
  post: string;
  author: string;
}

export interface IUpdateCommentRequest {
  content: string;
}

export interface ICreateCommentResponse {
  success: boolean;
  message: string;
  comment: IComment;
}

export interface IComment {
  _id: string;
  post: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
