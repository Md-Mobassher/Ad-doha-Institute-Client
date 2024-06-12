import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../../tag-Types";
import { TAdmin } from "@/type/admin";
import { IMeta } from "@/type";

const adminsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    getAllAdmin: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/admins",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TAdmin[], meta: IMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),

    getSingleAdmin: build.query({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    updateAdmin: build.mutation({
      query: (data) => {
        return {
          url: `/admins/${data.id}`,
          method: "PATCH",
          data: data.values,
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminsApi;
