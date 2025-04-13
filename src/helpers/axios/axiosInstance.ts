import { authAccessKey, authRefreshKey } from "@/constant/authkey";
import setAccessToken from "@/services/actions/setAccessToken";
import { getNewAccessToken } from "@/services/auth.services";
import { IGenericErrorResponse } from "@/type";
import { getCookie, removeCookie } from "@/utils/cookieHelper";
import {
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage,
} from "@/utils/local-storage";
import axios from "axios";
import { toast } from "sonner";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

let isRefreshing = false;

// Request Interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie(authAccessKey);
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  function (response) {
    response.data = {
      success: response?.data?.success,
      statusCode: response?.data?.statusCode,
      message: response?.data?.message,
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return response;
  },
  async function (error) {
    console.log("instance", error);
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      removeCookie(authAccessKey);
      removeCookie(authRefreshKey);

      toast.error(
        error?.response?.data?.message ||
          "Unauthorized access. Please login again.",
        { duration: 4000 }
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

      return Promise.reject();
    }

    toast.error(error?.response?.data?.message || "Something went wrong!", {
      duration: 4000,
    });

    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!!!",
      errorMessages: error?.response?.data?.errorMessages || [],
    };
    console.log("resobj", responseObject);
    return Promise.reject(responseObject);
  }
);

export { instance };
