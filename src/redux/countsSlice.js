import { createSlice } from "@reduxjs/toolkit";

const countsSlice = createSlice({
  name: "counts",
  initialState: {
    counts: {},
    objects: [],
    title: "",
    timestamps: [],
    lastTimestamp: null,
    newObj: false,
  },
  reducers: {
    incrementCount: (state, action) => {
      state.counts[action.payload.object] += 1;
      const ts = action.payload;
      state.timestamps.unshift(ts);
    },
    undoCount: (state) => {
      if (state.timestamps.length > 0) {
        const [first, ...rest] = state.timestamps;
        state.timestamps = rest;
        state.lastTimestamp = first;
        state.counts[first.object] -= 1;
      }
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    addObject: (state, action) => {
      state.objects.push(action.payload);
      state.counts[action.payload] = 0;
    },
    resetCountsSlice: (state) => {
      state.counts = {};
      state.objects = [];
      state.title = "";
      state.timestamps = [];
      state.lastTimestamp = null;
      state.newObj = false;
    },
    strified2OBJ: (state, action) => {
      const data = JSON.parse(action.payload);
      state.counts = data.counts;
      state.objects = data.objects;
      state.title = data.title;
      state.timestamps = data.timestamps;
    },
    setNewObj: (state, action) => {
      state.newObj = action.payload;
    },
  },
});

export const {
  incrementCount,
  undoCount,
  setTitle,
  addObject,
  resetCountsSlice,
  strified2OBJ,
  setNewObj,
} = countsSlice.actions;
export default countsSlice.reducer;
