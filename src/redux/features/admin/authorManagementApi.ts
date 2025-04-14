import { TAuthor, IMeta } from "@/type";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";

const authorsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAuthor: build.mutation({
      query: (data) => ({
        url: "/authors",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.author],
    }),

    getAllAuthors: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/authors",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: IAuthor[], meta: IMeta) => {
      //   return {
      //     Authors: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.author],
    }),

    getSingleAuthor: build.query({
      query: (id) => ({
        url: `/authors/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.author],
    }),

    deleteAuthor: build.mutation({
      query: (id) => ({
        url: `/authors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.author],
    }),

    updateAuthor: build.mutation({
      query: ({ id, values }) => ({
        url: `/authors/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.author],
    }),
  }),
});

export const {
  useCreateAuthorMutation,
  useGetAllAuthorsQuery,
  useGetSingleAuthorQuery,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} = authorsApi;
