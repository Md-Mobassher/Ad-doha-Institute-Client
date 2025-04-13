import { authAccessKey } from "@/constant/authkey";
import { deleteCookies } from "./deleteCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logoutUser = (router: AppRouterInstance) => {
  localStorage.removeItem(authAccessKey);
  deleteCookies([authAccessKey, "refreshToken"]);
  router.push("/");
  router.refresh();
};
