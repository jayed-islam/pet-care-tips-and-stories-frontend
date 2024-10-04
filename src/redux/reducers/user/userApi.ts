/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "@/redux/api";
import { IGetMeResponse } from "@/types/auth";
import {
  IToggleFollowUserResponse,
  IUpdateUserProfileData,
  IUpdateUserProfileResponse,
} from "@/types/user";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // updateUserProfile: builder.mutation<
    //   IUpdateUserProfileResponse,
    //   IUpdateUserProfileData
    // >({
    //   query: ({ userId, ...rest }) => ({
    //     url: `/user/me/update/${userId}`,
    //     method: "PUT",
    //     body: { ...rest },
    //   }),
    //   invalidatesTags: ["user-me"],
    // }),
    updateUserProfile: builder.mutation<
      IUpdateUserProfileResponse,
      IUpdateUserProfileData
    >({
      query: ({ userId, ...rest }) => {
        const body = { ...rest };
        console.log("Data being passed to the body:", body);
        return {
          url: `/user/me/update/${userId}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["user-me"],
    }),

    updateUserProfilePicture: builder.mutation<
      IUpdateUserProfileResponse,
      { userId: string; data: File }
    >({
      query: ({ userId, data }) => {
        const formData = new FormData();
        formData.append("file", data);

        return {
          url: `/user/me/update/profile-picture/${userId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["user-me"],
    }),
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

export const {
  useToggleFollowUserMutation,
  useGetSingleUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserProfilePictureMutation,
} = userApi;
