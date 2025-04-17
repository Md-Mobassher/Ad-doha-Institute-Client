import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "dashboard";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdminDashboard: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/${URL}/admin`,
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
  }),
});

export const { useGetAllAdminDashboardQuery } = dashboardApi;
