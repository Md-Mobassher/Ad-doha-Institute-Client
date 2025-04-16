import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/banner";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBanner: build.mutation({
      query: (data) => ({
        url: `/${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),

    getAllBanner: build.query({
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
      providesTags: [tagTypes.banner],
    }),

    deleteBanner: build.mutation({
      query: (id) => ({
        url: `/${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.banner],
    }),
  }),
});

export const {
  useCreateBannerMutation,
  useGetAllBannerQuery,
  useDeleteBannerMutation,
} = bannerApi;
