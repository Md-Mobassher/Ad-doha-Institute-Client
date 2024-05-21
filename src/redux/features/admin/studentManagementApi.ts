import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const studentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createStudent: build.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.student],
    }),

    getAllStudents: build.query({
      query: () => ({
        url: "/students",
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),

    getSingleStudent: build.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
    }),

    deleteStudent: build.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.student],
    }),

    updateStudent: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        updatedData,
      }),
      invalidatesTags: [tagTypes.student],
    }),
  }),
});

export const {} = studentsApi;
