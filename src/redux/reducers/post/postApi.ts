/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ICreatePostResponse,
  IGetHomePostListResponse,
  IGetPostListResponse,
  IGetSinglePostResponse,
  IGetUserPostFilters,
  IPaymentResponse,
  IPostFilters,
  IVotePostBody,
} from "@/types/post";
import { api } from "../../api";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<IGetPostListResponse, IPostFilters>({
      query: (filters) => {
        const filteredQuery: Partial<IPostFilters> = {};

        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            filteredQuery[key as keyof IPostFilters] = value.join(",") as any;
          } else if (value !== undefined && value !== "") {
            filteredQuery[key as keyof IPostFilters] = value;
          }
        });

        const queryString = Object.entries(filteredQuery)
          .map(([key, value]) => `${key}=${value}`)
          .join("&");

        return {
          url: `/post?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["posts"],
    }),

    getHomePosts: builder.query<IGetHomePostListResponse, IPostFilters>({
      query: (filters) => {
        const filteredQuery: Partial<IPostFilters> = {};

        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            filteredQuery[key as keyof IPostFilters] = value.join(",") as any;
          } else if (value !== undefined && value !== "") {
            filteredQuery[key as keyof IPostFilters] = value;
          }
        });

        const queryString = Object.entries(filteredQuery)
          .map(([key, value]) => `${key}=${value}`)
          .join("&");

        return {
          url: `/post/home-items?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["posts"],
    }),

    getSinglePost: builder.query<IGetSinglePostResponse, string>({
      query: (id) => ({
        url: `/post/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    createPost: builder.mutation<ICreatePostResponse, FormData>({
      query: (body) => ({
        url: "/post",
        method: "POST",
        body,
      }),
      invalidatesTags: ["posts", "user-posts"],
    }),
    updatePost: builder.mutation<
      ICreatePostResponse,
      { body: FormData; id: string }
    >({
      query: ({ body, id }) => ({
        url: `/post/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["posts", "user-posts"],
    }),
    voteAPost: builder.mutation<IGetSinglePostResponse, IVotePostBody>({
      query: ({ postId, voteType }) => ({
        url: `/post/${postId}/vote`,
        method: "POST",
        body: { voteType },
      }),
    }),
    deletePost: builder.mutation<ICreatePostResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user-posts"],
    }),

    getUserPosts: builder.query<IGetPostListResponse, IGetUserPostFilters>({
      query: ({ userId, ...rest }) => {
        return {
          url: `/post/user/${userId}`,
          method: "POST",
          body: { ...rest },
        };
      },
      providesTags: ["user-posts"],
    }),

    makePaymentForPremiumPost: builder.mutation<
      IPaymentResponse,
      { postId: string; amount: number }
    >({
      query: ({ postId, amount }) => ({
        url: `/payment/make-payment`,
        method: "POST",
        body: { postId, amount },
      }),
      invalidatesTags: ["posts"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useGetHomePostsQuery,
  useVoteAPostMutation,
  useGetUserPostsQuery,
  useMakePaymentForPremiumPostMutation,
} = postApi;
