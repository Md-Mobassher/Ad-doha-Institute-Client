import { tagTypes } from "@/redux/tag-Types";
import { baseApi } from "../baseApi";

const coursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    getAllCourses: build.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
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
      query: ({ id, updatedData }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        updatedData,
      }),
      invalidatesTags: [tagTypes.course],
    }),
  }),
});

export const {} = coursesApi;
