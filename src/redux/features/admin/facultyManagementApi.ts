import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";
import { IMeta } from "@/type";
import { TFaculty } from "@/type/faculty";

const facultiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFaculty: build.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.faculty],
    }),

    getAllFaculty: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/faculties",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TFaculty[], meta: IMeta) => {
        return {
          faculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.faculty],
    }),

    getSingleFaculty: build.query({
      query: (id) => ({
        url: `/faculties/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faculty],
    }),

    deleteFaculty: build.mutation({
      query: (id) => ({
        url: `/faculties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),

    updateFaculty: build.mutation({
      query: (data) => {
        return {
          url: `/faculties/${data.id}`,
          method: "PATCH",
          data: data.values,
        };
      },
      invalidatesTags: [tagTypes.faculty],
    }),
  }),
});

export const {
  useGetAllFacultyQuery,
  useCreateFacultyMutation,
  useGetSingleFacultyQuery,
  useDeleteFacultyMutation,
  useUpdateFacultyMutation,
} = facultiesApi;
