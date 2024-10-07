/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "@/redux/api";
import { IGetMeResponse, IGetUserListResponse, IUser } from "@/types/auth";
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
      invalidatesTags: ["user-me", "user-posts"],
    }),
    updateUserByAdmin: builder.mutation<
      IUpdateUserProfileResponse,
      Partial<IUser>
    >({
      query: ({ _id, ...rest }) => {
        const body = { ...rest };
        return {
          url: `/user/admin/update/${_id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["user-posts", "users", "user-me"],
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
      invalidatesTags: ["user-me", "user-posts"],
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
      invalidatesTags: ["user-me", "single-user"],
    }),

    getSingleUserProfile: builder.query<IGetMeResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `/user/single-user/${userId}`,
      }),
      providesTags: ["single-user"],
    }),

    getUserList: builder.query<IGetUserListResponse, void>({
      query: () => ({
        url: `/user/get-list`,
      }),
      providesTags: ["users"],
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
  useGetUserListQuery,
  useUpdateUserByAdminMutation,
} = userApi;
