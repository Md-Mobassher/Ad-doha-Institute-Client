import { IMeta, TBook } from "@/type";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";

const booksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBook: build.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.book],
    }),

    getAllBooks: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/books",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TBook[], meta: IMeta) => {
        return {
          books: response,
          meta,
        };
      },
      providesTags: [tagTypes.book],
    }),

    getSingleBook: build.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.book],
    }),

    deleteBook: build.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.book],
    }),

    updateBook: build.mutation({
      query: ({ id, values }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.book],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;
