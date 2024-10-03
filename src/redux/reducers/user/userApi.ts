/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "@/redux/api";
import { IGetMeResponse } from "@/types/auth";
import { IToggleFollowUserResponse } from "@/types/user";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // updateUserProfile: builder.mutation<
    //   IGetUserProfileResponse,
    //   IUpdateUserProfileBody
    // >({
    //   query: (body) => ({
    //     url: "/user/profile",
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    toggleFollowUser: builder.mutation<
      IToggleFollowUserResponse,
      { targetUserId: string }
    >({
      query: ({ targetUserId }) => ({
        url: `/user/toggle-follow`,
        method: "POST",
        body: { targetUserId },
      }),
      invalidatesTags: ["user-me"],
    }),

    getSingleUserProfile: builder.query<IGetMeResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `/user/single-user/${userId}`,
      }),
      providesTags: ["single-user"],
    }),

    // Add more user-related endpoints as needed
  }),
  overrideExisting: true,
});

export const { useToggleFollowUserMutation, useGetSingleUserProfileQuery } =
  userApi;
