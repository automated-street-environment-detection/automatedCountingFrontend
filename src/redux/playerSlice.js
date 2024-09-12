import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    playerTime: 0,
  },
  reducers: {
    setPlayerTime(state, action) {
      state.playerTime = action.payload;
    },
  },
});

export const { setPlayerTime } = playerSlice.actions;
export default playerSlice.reducer;
