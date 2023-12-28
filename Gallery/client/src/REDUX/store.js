import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import userSlice from "./userSlice";
import applicationStateSlice from "./applicationStateSlice";
import categorySlice from "./categorySlice";
import profileSliderSlice from "./profileSliderSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    appState: applicationStateSlice.reducer,
    post: postSlice.reducer,
    categories: categorySlice.reducer,
    profileSlider: profileSliderSlice.reducer,
  },
});

export default store;
