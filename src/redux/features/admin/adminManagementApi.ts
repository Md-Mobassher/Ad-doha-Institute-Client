import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

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
      query: (arg) => {
        console.log("Update Admin Argument:", arg);
        console.log(arg.body);
        return {
          url: `/admins/${arg.id}`,
          method: "PATCH",
          body: arg.body,
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
