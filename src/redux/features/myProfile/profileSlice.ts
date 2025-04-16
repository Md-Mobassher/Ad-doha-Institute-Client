import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { TAdmin, TFaculty, TStudent } from "@/type";

type TProfileState = {
  profile: TAdmin | TFaculty | TStudent | null;
};

const initialState: TProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<TProfileState>) => {
      const { profile } = action.payload;
      state.profile = profile;
    },
    removeProfile: () => {
      initialState;
    },
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;

// Selectors
export const selectCurrentProfile = (state: RootState) => state.profile.profile;
