import { createSlice } from "@reduxjs/toolkit";

const getVideoURL = createSlice({
  name: "getVideoURL",
  initialState: {
    data: {},
    url: "",
  },
  reducers: {
    setVideoURL: (state, action) => {
      // console.log(action.payload);
      state.data = action.payload;
      state.url = action.payload.video_url;
    },
  },
});

export const { setVideoURL } = getVideoURL.actions;
export default getVideoURL.reducer;
