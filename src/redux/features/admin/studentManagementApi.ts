import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/students";

const studentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createStudent: build.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.student],
    }),

    getAllStudents: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/${URL}`,
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: TStudent[], meta: IMeta) => {
      //   return {
      //     students: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.student],
    }),

    getSingleStudent: build.query({
      query: (id) => ({
        url: `/${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),

    deleteStudent: build.mutation({
      query: (id) => ({
        url: `/${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.student],
    }),

    updateStudent: build.mutation({
      query: ({ id, values }) => ({
        url: `/${URL}/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.student],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentsApi;
