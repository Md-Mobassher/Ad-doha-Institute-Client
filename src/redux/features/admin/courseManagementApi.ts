import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const coursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    getAllCourses: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/courses",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: TCourse[], meta: IMeta) => {
      //   return {
      //     courses: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.course],
    }),

    getSingleCourse: build.query({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
    }),

    deleteCourse: build.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.course],
    }),

    updateCourse: build.mutation({
      query: ({ id, values }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.course],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = coursesApi;
