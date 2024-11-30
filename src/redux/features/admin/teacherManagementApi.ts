import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";
import { IMeta } from "../../../type/common";
import { IDepartment } from "@/type";

const teachersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTeacher: build.mutation({
      query: (data) => ({
        url: "/teachers",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.teacher],
    }),

    getAllTeachers: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/teachers",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDepartment[], meta: IMeta) => {
        return {
          departments: response,
          meta,
        };
      },
      providesTags: [tagTypes.teacher],
    }),

    getSingleTeacher: build.query({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.teacher],
    }),

    deleteTeacher: build.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.teacher],
    }),

    updateTeacher: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/teachers/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.teacher],
    }),
  }),
});

export const {
  useCreateTeacherMutation,
  useGetAllTeachersQuery,
  useGetSingleTeacherQuery,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} = teachersApi;
