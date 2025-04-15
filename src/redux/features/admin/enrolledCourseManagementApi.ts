import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const enrolledCoursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEnrolledCourse: build.mutation({
      query: (data) => ({
        url: "/enrolled-courses",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.enrolledCourse],
    }),

    createEnrolledCourseByAdmin: build.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.enrolledCourse],
    }),

    getAllEnrolledCourses: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/enrolled-courses",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: IEnrolledCourse[], meta: IMeta) => {
      //   return {
      //     EnrolledCourses: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.enrolledCourse],
    }),

    getSingleEnrolledCourse: build.query({
      query: (id) => ({
        url: `/enrolled-courses/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.enrolledCourse],
    }),

    getMyEnrolledCourse: build.query({
      query: () => ({
        url: `/enrolled-courses/my-enrolled-courses`,
        method: "GET",
      }),
    }),
    updateEnrolledCourse: build.mutation({
      query: ({ id, values }) => ({
        url: `/enrolled-courses/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.enrolledCourse],
    }),
    updateEnrolledCourseMarks: build.mutation({
      query: ({ id, values }) => ({
        url: `/enrolled-courses/update-marks`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.enrolledCourse],
    }),
    deleteEnrolledCourse: build.mutation({
      query: (id) => ({
        url: `/enrolled-courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.enrolledCourse],
    }),
  }),
});

export const {
  useCreateEnrolledCourseMutation,
  useCreateEnrolledCourseByAdminMutation,
  useGetAllEnrolledCoursesQuery,
  useGetSingleEnrolledCourseQuery,
  useUpdateEnrolledCourseMutation,
  useGetMyEnrolledCourseQuery,
  useUpdateEnrolledCourseMarksMutation,
  useDeleteEnrolledCourseMutation,
} = enrolledCoursesApi;
