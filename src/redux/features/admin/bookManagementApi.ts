import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";

const URL = "/books";

const booksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBook: build.mutation({
      query: (data) => ({
        url: `/${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.book],
    }),

    getAllBooks: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/${URL}`,
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: TBook[], meta: IMeta) => {
      //   return {
      //     books: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.book],
    }),

    getSingleBook: build.query({
      query: (id) => ({
        url: `/${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.book],
    }),

    deleteBook: build.mutation({
      query: (id) => ({
        url: `/${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.book],
    }),

    updateBook: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
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
