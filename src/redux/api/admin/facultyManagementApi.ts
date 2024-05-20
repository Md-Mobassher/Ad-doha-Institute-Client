import { tagTypes } from "@/redux/tag-Types";
import { baseApi } from "../baseApi";

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
      query: () => ({
        url: "/faculties",
        method: "GET",
      }),
      providesTags: [tagTypes.faculty],
    }),

    getSingleFaculty: build.query({
      query: (id) => ({
        url: `/faculties/${id}`,
        method: "GET",
      }),
    }),

    deleteFaculty: build.mutation({
      query: (id) => ({
        url: `/faculties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),

    updateFaculty: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/faculties/${id}`,
        method: "PATCH",
        updatedData,
      }),
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
