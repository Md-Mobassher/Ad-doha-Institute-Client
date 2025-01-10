import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";
import { IMeta, ITransaction } from "@/type";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTransactionByAdmin: build.mutation({
      query: (data) => ({
        url: "/transactions",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),

    getAllTransactions: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/transactions",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ITransaction[], meta: IMeta) => {
        return {
          Transactions: response,
          meta,
        };
      },
      providesTags: [tagTypes.transaction],
    }),

    getSingleTransaction: build.query({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),

    getMyTransaction: build.query({
      query: () => ({
        url: `/transactions/my-transactions`,
        method: "GET",
      }),
    }),
    updateTransaction: build.mutation({
      query: ({ id, values }) => ({
        url: `/transactions/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),

    deleteTransaction: build.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
  }),
});

export const {
  useCreateTransactionByAdminMutation,
  useGetAllTransactionsQuery,
  useGetSingleTransactionQuery,
  useUpdateTransactionMutation,
  useGetMyTransactionQuery,
  useDeleteTransactionMutation,
} = transactionApi;
