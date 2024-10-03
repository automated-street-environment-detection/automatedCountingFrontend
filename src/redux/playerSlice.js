import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    playerTime: 0,
    selectedVideo: null,
    //boundary = {title:whatever, start:[0,1], end:[2,2]} change that if needed
    selectedBoundary: null,
    videoList: [
      { title: "Video 1", url: "https://video-footage-storage.s3.us-east-2.amazonaws.com/20230706_Ng+Dinh+Chieu+A_Side_12h.mp4" },
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
      state.boundaryList.push(action.payload);
  },
  //deleteBoundary(boundary.title)
    deleteBoundary: (state, action) => {
    state.boundaryList = state.boundaryList.filter(boundary => boundary.title !== action.payload);
    },
    //deleteVideo(video.title)
    deleteVideo: (state, action) => {
      state.videoList = state.videoList.filter(video => video.title !== action.payload);
    }
 
  },
});

export const { setPlayerTime, selectVideo,uploadVideo,selectBoundary,addBoundary,deleteBoundary,deleteVideo} = playerSlice.actions;
export default playerSlice.reducer;
