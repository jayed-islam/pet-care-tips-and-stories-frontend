import { IGetLecturerListResponse } from "@/types/lecturer";
import { api } from "../../api";

export const lecturerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLecturerList: builder.query<IGetLecturerListResponse, void>({
      query: () => ({
        url: `/lecturer`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetLecturerListQuery } = lecturerApi;
