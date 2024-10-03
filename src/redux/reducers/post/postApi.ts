/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ICreatePostResponse,
  IGetHomePostListResponse,
  IGetPostListResponse,
  IGetSinglePostResponse,
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
      invalidatesTags: ["posts"],
    }),
    // updatePostByAdmin: builder.mutation<
    //   ICreatePostResponse,
    //   { body: Partial<IPostGetForAdminBody>; id: string }
    // >({
    //   query: ({ body, id }) => ({
    //     url: `/posts/admin/update-single/${id}`,
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: ["posts", "post"],
    // }),
    voteAPost: builder.mutation<IGetSinglePostResponse, IVotePostBody>({
      query: ({ postId, voteType }) => ({
        url: `/post/${postId}/vote`,
        method: "POST",
        body: { voteType },
      }),
    }),
    deletePostByAdmin: builder.mutation<ICreatePostResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetSinglePostQuery,
  useDeletePostByAdminMutation,
  useGetHomePostsQuery,
  useVoteAPostMutation,
} = postApi;
