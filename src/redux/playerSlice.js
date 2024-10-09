import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    playerTime: 0,
    selectedVideo: null,
    //boundary = {title:whatever, start:[0,1], end:[2,2]} change that if needed
    selectedBoundary: null,
    videoList: [
    ],
    boundaryList: [],
  },
  reducers: {
    setBoundaryList(state, action) {
      state.boundaryList = action.payload;
    },
    setPlayerTime(state, action) {
      state.playerTime = action.payload;
    },
    //selectVideo(video)
    selectVideo(state, action) {
      state.selectedVideo = action.payload;
    },
    //uploadVideo(video)
    uploadVideo: (state, action) => {
      state.videoList.push(action.payload);
    },
    //selectBoundary(boundary)
    selectBoundary: (state, action) => {
      state.selectedBoundary = action.payload;
    },
    //addBoundary(boundary)
    addBoundary: (state, action) => {
      console.log(action.payload);
      state.boundaryList.push(action.payload);
    },
    //deleteBoundary(boundary.title)
    deleteBoundary: (state, action) => {
      state.boundaryList = state.boundaryList.filter(
        (boundary) => boundary.title !== action.payload
      );
    },
    //deleteVideo(video.title)
    deleteVideo: (state, action) => {
      state.videoList = state.videoList.filter(
        (video) => video.title !== action.payload
      );
    },
  },
});

export const {
  setPlayerTime,
  selectVideo,
  uploadVideo,
  selectBoundary,
  addBoundary,
  deleteBoundary,
  deleteVideo,
  setBoundaryList,
} = playerSlice.actions;
export default playerSlice.reducer;
