import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";
import { IMeta } from "../../../type/common";
import { IDepartment } from "@/type";

const academicDepartmentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAcademicDepartment: build.mutation({
      query: (data) => ({
        url: "/academic-departments",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.department],
    }),

    getAllAcademicDepartments: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/academic-departments",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDepartment[], meta: IMeta) => {
        return {
          departments: response,
          meta,
        };
      },
      providesTags: [tagTypes.department],
    }),

    getSingleAcademicDepartment: build.query({
      query: (id) => ({
        url: `/academic-departments/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.department],
    }),

    deleteAcademicDepartment: build.mutation({
      query: (id) => ({
        url: `/academic-departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.department],
    }),

    updateAcademicDepartment: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/academic-departments/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.department],
    }),
  }),
});

export const {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicDepartmentsQuery,
  useGetSingleAcademicDepartmentQuery,
  useDeleteAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
} = academicDepartmentsApi;
