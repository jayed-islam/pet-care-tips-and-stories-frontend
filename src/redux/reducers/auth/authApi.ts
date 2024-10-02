/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/redux/api";
import {
  IAuthLoginResponse,
  IGetMeResponse,
  IRegisterResponse,
  IUser,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";
import { setAuthLoading, setUser } from "./authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthLoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user-me"],
    }),
    register: builder.mutation<IRegisterResponse, RegisterRequest>({
      query: (userDetails) => ({
        url: "/auth/register",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["user-me"],
    }),
    getMe: builder.query<IGetMeResponse, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user-me"],

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setAuthLoading(true));
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            const updatedData: IUser = Object.fromEntries(
              Object.entries(data.data).filter(
                ([key, value]) => value !== null && value !== undefined
              )
            ) as IUser;
            dispatch(setUser(updatedData));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } = authApi;
