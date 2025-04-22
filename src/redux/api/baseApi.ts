import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-Types";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    // baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}`,
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_LOCAL_API_URL}`,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
