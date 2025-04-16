import { baseApi } from "../api/baseApi";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/myProfile/profileSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  profile: profileReducer,
};
