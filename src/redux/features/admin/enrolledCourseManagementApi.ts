import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";
import { IMeta, IEnrolledCourse } from "@/type";

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
        url: "/create-enrolled-courses",
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
      transformResponse: (response: IEnrolledCourse[], meta: IMeta) => {
        return {
          EnrolledCourses: response,
          meta,
        };
      },
      providesTags: [tagTypes.enrolledCourse],
    }),

    getMyEnrolledCourse: build.query({
      query: (id) => ({
        url: `/my-enrolled-courses`,
        method: "GET",
      }),
    }),

    updateEnrolledCourseMarks: build.mutation({
      query: ({ id, values }) => ({
        url: `/update-enrolled-course-marks/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.enrolledCourse],
    }),
  }),
});

export const {
  useCreateEnrolledCourseMutation,
  useCreateEnrolledCourseByAdminMutation,
  useGetAllEnrolledCoursesQuery,
  useGetMyEnrolledCourseQuery,
  useUpdateEnrolledCourseMarksMutation,
} = enrolledCoursesApi;
