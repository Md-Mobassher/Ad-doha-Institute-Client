import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";
import { IMeta } from "../../../type/common";
import { TBookcategory } from "@/type";

const BookcategoryCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBookcategory: build.mutation({
      query: (data) => ({
        url: "/book-category",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.bookcategory],
    }),

    getAllBookcategorys: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/book-category",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: TBookcategory[], meta: IMeta) => {
      //   return {
      //     Bookcategorys: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.bookcategory],
    }),

    getSingleBookcategory: build.query({
      query: (id) => ({
        url: `/book-category/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bookcategory],
    }),

    deleteBookcategory: build.mutation({
      query: (id) => ({
        url: `/book-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.bookcategory],
    }),

    updateBookcategory: build.mutation({
      query: ({ id, values }) => ({
        url: `/book-category/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.bookcategory],
    }),
  }),
});

export const {
  useCreateBookcategoryMutation,
  useGetAllBookcategorysQuery,
  useGetSingleBookcategoryQuery,
  useDeleteBookcategoryMutation,
  useUpdateBookcategoryMutation,
} = BookcategoryCategoryApi;
