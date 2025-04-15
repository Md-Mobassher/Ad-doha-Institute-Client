import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../../tag-Types";

const adminsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
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
      // transformResponse: (response: TAdmin[], meta: IMeta) => {
      //   return {
      //     admins: response,
      //     meta,
      //   };
      // },
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
      query: ({ id, updatedData }) => {
        return {
          url: `/admins/${id}`,
          method: "PATCH",
          data: updatedData,
        };
      },
      invalidatesTags: [tagTypes.admin, tagTypes.user],
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
