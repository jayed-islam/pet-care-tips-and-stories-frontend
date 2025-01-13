/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "@/redux/api";
import {
  IGetMeResponse,
  IGetUserListForUserResponse,
  IGetUserListResponse,
  IUser,
} from "@/types/auth";
import {
  IToggleFollowUserResponse,
  IUpdateUserProfileData,
  IUpdateUserProfileResponse,
} from "@/types/user";

export interface IDashboardResponse {
  message: string;
  success: boolean;
  data: {
    summary: ISummary;
    chartData: IChartData;
    users: IUser[];
  };
}

export interface ISummary {
  users: number;
  revenue: number;
  pages: number;
  posts: number;
}

export interface IChartData {
  revenueOverview: ISalesOverview[];
  categoryDistribution: ICategoryDistribution[];
}

export interface ISalesOverview {
  day: number;
  totalRevenue: number;
}

export interface ICategoryDistribution {
  category: string; // Category ID
  count: number; // Count of products in this category
}

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
    removeFrient: builder.mutation<
      IToggleFollowUserResponse,
      { targetUserId: string }
    >({
      query: ({ targetUserId }) => ({
        url: `/user/remove-friend/${targetUserId}`,
        method: "POST",
        body: { targetUserId },
      }),
      invalidatesTags: ["user-me", "single-user"],
    }),

    toggleUserFriendRequest: builder.mutation<
      IToggleFollowUserResponse,
      { targetUserId: string; actionType: string }
    >({
      query: (body) => ({
        url: `/user/toggle-request`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user-me", "user-list"],
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

    getUserListForUser: builder.query<
      IGetUserListForUserResponse,
      { search?: string; userType?: string; page?: number }
    >({
      query: (body) => ({
        url: `/user/get-user-list`,
        method: "POST",
        body,
      }),
      providesTags: ["user-list"],
    }),
    getSummary: builder.query<IDashboardResponse, void>({
      query: () => ({
        url: "/user/get-summary",
      }),
    }),
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
  useGetUserListForUserQuery,
  useToggleUserFriendRequestMutation,
  useRemoveFrientMutation,
  useGetSummaryQuery,
} = userApi;
