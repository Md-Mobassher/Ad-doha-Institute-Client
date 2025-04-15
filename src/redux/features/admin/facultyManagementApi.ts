import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const facultiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFaculty: build.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
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
      // transformResponse: (response: TFaculty[], meta: IMeta) => {
      //   return {
      //     faculties: response,
      //     meta,
      //   };
      // },
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
      query: ({ id, updatedData }) => {
        return {
          url: `/faculties/${id}`,
          method: "PATCH",
          data: updatedData,
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
