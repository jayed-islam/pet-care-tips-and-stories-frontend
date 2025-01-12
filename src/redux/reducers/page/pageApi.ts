/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPage } from "@/types/page";
import { api } from "../../api";
export interface IGetSinglePageResponse {
  data: IPage;
  message: string;
  success: boolean;
}

export interface IGetPageListResponse {
  data: IPage[];
  message: string;
  success: boolean;
}

export const pageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSinglePage: builder.query<IGetSinglePageResponse, string>({
      query: (id) => ({
        url: `/page/${id}`,
        method: "GET",
      }),
      providesTags: ["page"],
    }),
    createPage: builder.mutation<IGetSinglePageResponse, FormData>({
      query: (body) => ({
        url: "/page",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user-me", "pages"],
    }),
    updatePage: builder.mutation<
      IGetSinglePageResponse,
      { body: Partial<IPage>; id: string }
    >({
      query: ({ body, id }) => ({
        url: `/page/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user-me", "pages"],
    }),
    toggleFollow: builder.mutation<IGetSinglePageResponse, string>({
      query: (id) => ({
        url: `/page/${id}/toggle-follow`,
        method: "POST",
      }),
      invalidatesTags: ["user-me", "pages"],
    }),
    deletePage: builder.mutation<IGetSinglePageResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/page/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user-me", "pages"],
    }),
    getPageList: builder.query<IGetPageListResponse, void>({
      query: () => {
        return {
          url: `/page`,
          method: "GET",
        };
      },
      providesTags: ["pages"],
    }),
    // updateUserProfilePicture: builder.mutation<
    //   IGetSinglePageResponse,
    //   { userId: string; data: File }
    // >({
    //   query: ({ userId, data }) => {
    //     const formData = new FormData();
    //     formData.append("file", data);

    //     return {
    //       url: `/user/me/update/profile-picture/${userId}`,
    //       method: "PUT",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: ["user-me", "user-posts"],
    // }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePageMutation,
  useGetSinglePageQuery,
  useUpdatePageMutation,
  useToggleFollowMutation,
  useGetPageListQuery,
} = pageApi;
