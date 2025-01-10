/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPage } from "@/types/page";
import { api } from "../../api";
import { IPagination } from "@/types/common";

export interface IGetSinglePageResponse {
  data: IPage;
  message: string;
  success: boolean;
}

export interface IGetPageListResponse {
  data: {
    pages: IPage[];
    pagination: IPagination;
  };
  message: string;
  success: boolean;
}

export const pageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSinglePage: builder.query<IGetSinglePageResponse, string>({
      query: (id) => ({
        url: `/page/get-single/${id}`,
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
      { body: FormData; id: string }
    >({
      query: ({ body, id }) => ({
        url: `/page/update/${id}`,
        method: "PUT",
        body,
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
          url: `/page/get-list/`,
          method: "GET",
        };
      },
      providesTags: ["pages"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreatePageMutation } = pageApi;
