import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/subscribe";

const subscribeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubscribe: build.mutation({
      query: (data) => ({
        url: `/${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.subscribe],
    }),

    getAllSubscribe: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/${URL}`,
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: TContact[], meta: IMeta) => {
      //   return {
      //     contacts: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.subscribe],
    }),

    deleteSubscribe: build.mutation({
      query: (id) => ({
        url: `/${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subscribe],
    }),
  }),
});

export const {
  useCreateSubscribeMutation,
  useGetAllSubscribeQuery,
  useDeleteSubscribeMutation,
} = subscribeApi;
