import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    playerTime: 0,
    selectedVideo: null,
  },
  reducers: {
    setPlayerTime(state, action) {
      state.playerTime = action.payload;
    },
    selectVideo(state, action) {
      state.selectedVideo = action.payload;
    },
  },
});

export const { setPlayerTime, selectVideo } = playerSlice.actions;
export default playerSlice.reducer;
