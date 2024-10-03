import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    username: "",
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.loggedIn = true;
    },
    signOut: (state) => {
      state.username = "";
      state.loggedIn = false;
    },
  },
});

export const { login, signOut } = signInSlice.actions;
export default signInSlice.reducer;
