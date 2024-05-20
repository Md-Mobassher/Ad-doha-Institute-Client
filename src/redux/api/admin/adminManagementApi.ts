import { tagTypes } from "@/redux/tag-Types";
import { baseApi } from "../baseApi";

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
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    getSingleAdmin: build.query({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
    }),

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    updateAdmin: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/admins/${id}`,
        method: "PATCH",
        updatedData,
      }),
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
