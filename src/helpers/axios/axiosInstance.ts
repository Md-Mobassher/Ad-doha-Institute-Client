import { authKey } from "@/constant/authkey";
import setAccessToken from "@/services/actions/setAccessToken";
import { getNewAccessToken } from "@/services/auth.services";
import { IGenericErrorResponse, ResponseSuccessType } from "@/type";
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
let failedQueue: any[] = [];

// Helper to process the queue
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

// Request Interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    const originalRequest = error.config;

    // Handle 401 Unauthorized or 403 Forbidden
    if (
      (error?.response?.status === 401 || error?.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `${token}`;
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await getNewAccessToken();
        const newAccessToken = response?.data?.accessToken;

        if (newAccessToken) {
          setToLocalStorage(authKey, newAccessToken);
          setAccessToken(newAccessToken);

          instance.defaults.headers.Authorization = `${newAccessToken}`;
          processQueue(null, newAccessToken);

          return instance(originalRequest);
        } else {
          throw new Error("Failed to retrieve new access token");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeFromLocalStorage(authKey);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // General Error Handling
    toast.error(error?.response?.data?.message || "Something went wrong!", {
      duration: 4000,
    });

    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!!!",
      errorMessages: error?.response?.data?.errorMessages || [],
    };

    return Promise.reject(responseObject);
  }
);

export { instance };
