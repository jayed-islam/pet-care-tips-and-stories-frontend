import {
  ICreateLectureResponse,
  IGetLectureListForAdminResponse,
  IGetSingleLectureResponse,
  ILectureFormInputs,
  ILectureGetForAdminBody,
} from "@/types/lecture";
import { api } from "../../api";

export const lectureApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLectureForAdmin: builder.query<
      IGetLectureListForAdminResponse,
      ILectureGetForAdminBody
    >({
      query: ({
        creatorId,
        category,
        isLowestFirst,
        limit,
        page,
        searchTerm,
        type,
      }) => ({
        url: `/lecture/admin/get-list/${creatorId}`,
        method: "POST",
        body: { category, isLowestFirst, limit, page, searchTerm, type },
      }),
    }),
    getSingleLecture: builder.query<IGetSingleLectureResponse, string>({
      query: (id) => ({
        url: `/lecture/get-single/${id}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation<ICreateLectureResponse, ILectureFormInputs>(
      {
        query: (body) => ({
          url: "/lecture",
          method: "POST",
          body,
        }),
      }
    ),
  }),
  overrideExisting: true,
});

export const { useCreateLectureMutation, useGetLectureForAdminQuery } =
  lectureApi;
