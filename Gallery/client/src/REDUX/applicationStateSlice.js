import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbarOpened: false,
  loading: false,
  error: false,
  editProfile: false,
  interest: false,
};

const applicationStateSlice = createSlice({
  name: "AppState",
  initialState,
  reducers: {
    setAppstate: (state, action) => {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    setNavbar: (state, action) => {
      state.navbarOpened = action.payload;
    },
    setEditProfile: (state, action) => {
      state.editProfile = action.payload;
    },
    setIntereset: (state, action) => {
      state.interest = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const appStateAction = applicationStateSlice.actions;

export default applicationStateSlice;
