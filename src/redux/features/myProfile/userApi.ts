import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";

export const userAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMYProfile: build.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateUserStatus: build.mutation({
      query: ({ id, updatedData }) => {
        return {
          url: `/users/change-status/${id}`,
          method: "POST",
          data: updatedData,
        };
      },
      invalidatesTags: [
        tagTypes.user,
        tagTypes.admin,
        tagTypes.faculty,
        tagTypes.student,
      ],
    }),
    updateMYProfile: build.mutation({
      query: (data) => {
        return {
          url: "/users/update-my-profile",
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllUser: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/users/all-users",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
} = userAPi;
