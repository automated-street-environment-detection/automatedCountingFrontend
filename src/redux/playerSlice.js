import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    playerTime: 0,
    selectedVideo: null,
    videoList: [
      { title: "Video 1", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
      { title: "Video 2", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
      { title: "Video 3", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
      { title: "Video 4", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
      { title: "Video 5", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
    ],
    boundaryList : [
    ],
  },
  reducers: {
    setPlayerTime(state, action) {
      state.playerTime = action.payload;
    },
    selectVideo(state, action) {
      state.selectedVideo = action.payload;
    },
    uploadVideo: (state, action) => {
      state.videoList.push(action.payload);
    },
    selectBoundary: (state, action) => {
      state.selectedBoundary = action.payload;
    },
    addBoundary: (state, action) => {
      state.boundaryList.push(action.payload);
  },
  },
});

export const { setPlayerTime, selectVideo,uploadVideo,selectBoundary,addBoundary } = playerSlice.actions;
export default playerSlice.reducer;
