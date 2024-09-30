import {
  ICreateDeenbookPoastResponse,
  ICreateDeenbookStoryPoastResponse,
  IDeenbook,
  IDeenbookPostGetForAdminBody,
  IDeenbookStoryDeleteByAdminBody,
  IDeenbookStoryUpdateByAdminBody,
  IGetDeenbookPostListResponse,
  IGetDeenbookStoryPostForAdminBody,
  IGetDeenbookStoryPostListResponse,
  IGetSingleDeenbookPostResponse,
} from "@/types/deenbook";
import { api } from "../../api";

export const deenbookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDeenbookPostForAdmin: builder.query<
      IGetDeenbookPostListResponse,
      IDeenbookPostGetForAdminBody
    >({
      query: ({
        creatorId,
        category,
        isLowestFirst,
        limit,
        page,
        searchTerm,
        type,
        status,
      }) => ({
        url: `/deenbook/admin/get-list/${creatorId}`,
        method: "POST",
        body: {
          category,
          isLowestFirst,
          limit,
          page,
          searchTerm,
          type,
          status,
        },
      }),
      providesTags: ["deenbook-posts"],
    }),
    getSingleDeenbookPost: builder.query<
      IGetSingleDeenbookPostResponse,
      string
    >({
      query: (id) => ({
        url: `/deenbook/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["deenbook-post"],
    }),
    createDeenbookPost: builder.mutation<
      ICreateDeenbookPoastResponse,
      FormData
    >({
      query: (body) => ({
        url: "/deenbook",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deenbook-posts"],
    }),
    updateDeenbookPostByAdmin: builder.mutation<
      ICreateDeenbookPoastResponse,
      { body: Partial<IDeenbook>; id: string }
    >({
      query: ({ body, id }) => ({
        url: `/deenbook/admin/update-single/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["deenbook-posts", "deenbook-post"],
    }),
    createDeenbookStoryPost: builder.mutation<
      ICreateDeenbookStoryPoastResponse,
      FormData
    >({
      query: (body) => ({
        url: "/deenbook-story",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deenbook-stories"],
    }),
    updateDeenbookStoryByAdmin: builder.mutation<
      ICreateDeenbookPoastResponse,
      IDeenbookStoryUpdateByAdminBody
    >({
      query: ({ storyId, ...body }) => ({
        url: `/deenbook-story/admin/update/${storyId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["deenbook-posts"],
    }),
    getDeenbookStoryPostListForAdmin: builder.query<
      IGetDeenbookStoryPostListResponse,
      IGetDeenbookStoryPostForAdminBody
    >({
      query: ({ creatorId, limit, page }) => ({
        url: `/deenbook-story/admin/get-list/${creatorId}`,
        method: "POST",
        body: {
          limit,
          page,
        },
      }),
      providesTags: ["deenbook-stories"],
    }),
    deleteDeenbookStoryByAdmin: builder.mutation<
      ICreateDeenbookPoastResponse,
      IDeenbookStoryDeleteByAdminBody
    >({
      query: ({ id, creatorId }) => ({
        url: `/deenbook-story/delete/${id}`,
        method: "PUT",
        body: { creatorID: creatorId },
      }),
      invalidatesTags: ["deenbook-stories"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDeenbookPostForAdminQuery,
  useCreateDeenbookPostMutation,
  useGetSingleDeenbookPostQuery,
  useUpdateDeenbookPostByAdminMutation,
  useCreateDeenbookStoryPostMutation,
  useGetDeenbookStoryPostListForAdminQuery,
  useUpdateDeenbookStoryByAdminMutation,
  useDeleteDeenbookStoryByAdminMutation,
} = deenbookApi;
