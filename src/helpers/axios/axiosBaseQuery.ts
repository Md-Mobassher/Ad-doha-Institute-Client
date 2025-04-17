import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { instance as axiosInstance } from "./axiosInstance";
import { TMeta } from "@/type";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: TMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, contentType }) => {
    // console.log({ baseUrl, url, method, data, params, headers, contentType });
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...(headers || {}),
          "Content-Type": contentType || "application/json",
        },
      });
      // console.log("base query", result.data);
      return { data: result?.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      // console.log(err);
      // Ensure the error matches the expected shape
      return { error: err };
    }
  };
