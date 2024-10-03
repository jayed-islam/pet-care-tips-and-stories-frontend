/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ICreateCommentRequest,
  ICreateCommentResponse,
  IUpdateCommentRequest,
} from "@/types/comment";
import { api } from "../../api";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<ICreateCommentResponse, ICreateCommentRequest>(
      {
        query: ({ author, content, post }) => ({
          url: `/comment/${post}`,
          method: "POST",
          body: { author, content, post },
        }),
        invalidatesTags: ["comments"],
      }
    ),

    updateComment: builder.mutation<
      ICreateCommentResponse,
      { commentId: string; body: IUpdateCommentRequest }
    >({
      query: ({ commentId, body }) => ({
        url: `/comments/${commentId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["comments"],
    }),

    deleteComment: builder.mutation<
      ICreateCommentResponse,
      { commentId: string }
    >({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
