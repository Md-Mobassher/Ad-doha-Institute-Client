import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const offeredCoursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOfferedCourse: build.mutation({
      query: (data) => ({
        url: "/offered-courses",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.offeredCourse],
    }),

    getAllOfferedCourses: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/offered-courses",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: IOfferedCourse[], meta: IMeta) => {
      //   return {
      //     offeredCourses: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.offeredCourse],
    }),

    getSingleOfferedCourse: build.query({
      query: (id) => ({
        url: `/offered-courses/${id}`,
        method: "GET",
      }),
    }),

    deleteOfferedCourse: build.mutation({
      query: (id) => ({
        url: `/offered-courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.offeredCourse],
    }),

    updateOfferedCourse: build.mutation({
      query: ({ id, values }) => ({
        url: `/offered-courses/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.offeredCourse],
    }),
  }),
});

export const {
  useCreateOfferedCourseMutation,
  useGetAllOfferedCoursesQuery,
  useGetSingleOfferedCourseQuery,
  useDeleteOfferedCourseMutation,
  useUpdateOfferedCourseMutation,
} = offeredCoursesApi;
