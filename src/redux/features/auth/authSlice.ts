import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie, removeCookie } from "@/utils/cookieHelper";
import { authAccessKey, authRefreshKey } from "@/constant/authkey";
import { decodeToken, TUser } from "@/utils/tokenHelper";
import { RootState } from "@/redux/store";

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

// Retrieve token from cookies
const storedToken = getCookie(authAccessKey);
const storedUser = decodeToken(storedToken); // Decode user from token

const initialState: TAuthState = {
  user: storedUser,
  token: storedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TAuthState>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      if (token) {
        setCookie(authAccessKey, token); // Store token in cookies
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeCookie(authAccessKey);
      removeCookie(authRefreshKey);
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
