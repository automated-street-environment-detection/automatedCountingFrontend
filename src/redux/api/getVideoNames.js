import { createSlice } from "@reduxjs/toolkit";

const getVideoNamesSlice = createSlice({
  name: "getVideoNames",
  initialState: {
    data: {},
    videoNames: [],
  },
  reducers: {
    setData: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      state.videoNames = action.payload.video_names;
    },
  },
});

export const { setData } = getVideoNamesSlice.actions;
export default getVideoNamesSlice.reducer;
