import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";
import { IMeta } from "../../../type/common";
import { IDepartment } from "@/type";

const advisoryCommitteesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdvisoryComittee: build.mutation({
      query: (data) => ({
        url: "/advisory-comittees",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.committee],
    }),

    getAllAdvisoryComittees: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/advisory-comittees",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: IDepartment[], meta: IMeta) => {
      //   return {
      //     departments: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.committee],
    }),

    getSingleAdvisoryComittee: build.query({
      query: (id) => ({
        url: `/advisory-comittees/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.committee],
    }),

    deleteAdvisoryComittee: build.mutation({
      query: (id) => ({
        url: `/advisory-comittees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.committee],
    }),

    updateAdvisoryComittee: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/advisory-comittees/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.committee],
    }),
  }),
});

export const {
  useCreateAdvisoryComitteeMutation,
  useGetAllAdvisoryComitteesQuery,
  useGetSingleAdvisoryComitteeQuery,
  useDeleteAdvisoryComitteeMutation,
  useUpdateAdvisoryComitteeMutation,
} = advisoryCommitteesApi;
