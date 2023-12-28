import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userID: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setUserID: (state, action) => {
      state.userID = action.payload.userID;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
