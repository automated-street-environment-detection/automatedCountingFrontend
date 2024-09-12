import { createSlice } from "@reduxjs/toolkit";

const countsSlice = createSlice({
  name: "counts",
  initialState: {
    counts: {},
  },
  reducers: {
    incrementCount: (state, action) => {
      state.counts[action.payload]
        ? (state.counts[action.payload] += 1)
        : (state.counts[action.payload] = 1);
    },
    undoCount: (state, action) => {
      if (state.counts[action.payload]) {
        state.counts[action.payload] -= 1;
      }
    },
  },
});

export const { incrementCount, undoCount } = countsSlice.actions;
export default countsSlice.reducer;
