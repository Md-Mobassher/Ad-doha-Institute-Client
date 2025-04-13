import { authAccessKey } from "@/constant/authkey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { verifyToken } from "@/utils/verifyToken";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  // console.log("accessToken", accessToken);
  return setToLocalStorage(authAccessKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authAccessKey);
  //   console.log(authToken);
  if (authToken) {
    const decodedData: any = verifyToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authAccessKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(authAccessKey);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
