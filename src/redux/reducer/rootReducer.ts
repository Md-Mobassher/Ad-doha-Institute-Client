import { baseApi } from "../api/baseApi";
import authReducer from "../features/auth/authSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
};
