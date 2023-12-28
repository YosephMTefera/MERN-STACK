import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisplayed: false,
  initial: {
    x: 700,
  },
  animate: {
    x: 0,
  },
  following: false,
  followingList: [],
  followerList: [],
};

const profileSliderSlice = createSlice({
  name: "PROFILESLIDER",
  initialState,
  reducers: {
    setSliderState: (state, action) => {
      state.initial.x = action.payload.initial.x;
      state.animate.x = action.payload.animate.x;
      state.isDisplayed = true;
      state.following = action.payload.following;
    },
    setfollowingList: (state, action) => {
      state.followingList = action.payload.followingList;
      state.followerList = action.payload.followerList;
    },
  },
});

export const profileSliderAction = profileSliderSlice.actions;

export default profileSliderSlice;
