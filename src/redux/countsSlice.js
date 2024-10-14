import { createSlice } from "@reduxjs/toolkit";

const countsSlice = createSlice({
  name: "counts",
  initialState: {
    // Has each counts ex: { van: 2, car: 3, ... }
    counts: {},
    // Array of all objects ex: {van, car}
    objects: [],
    // The title of instance
    title: "",
    // timestamp array with [{object: van, timestamp: time}]
    timestamps: [],
    lastTimestamp: null,
    newObj: false,
  },
  reducers: {
    // Increments the counts slice
    // Input {object: name, timestamp: currTime}
    incrementCount: (state, action) => {
      state.counts[action.payload.object] += 1;
      const ts = action.payload;
      state.timestamps.unshift(ts);
    },
    // decrements the count object and returns last object in countslice
    // no input
    undoCount: (state) => {
      if (state.timestamps.length > 0) {
        const [first, ...rest] = state.timestamps;
        state.timestamps = rest;
        state.lastTimestamp = first;
        state.counts[first.object] -= 1;
      }
    },
    // sets the selected count title
    // input string title
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    // add an counting object and intializes to 0
    // input string object_name
    addObject: (state, action) => {
      if (state.objects.indexOf(action.payload) === -1) {
        state.objects.push(action.payload);
        state.counts[action.payload] = 0;
      }
    },
    // resets the counts slice, to start a new count
    resetCountsSlice: (state) => {
      state.counts = {};
      state.objects = [];
      state.title = "";
      state.timestamps = [];
      state.lastTimestamp = null;
      state.newObj = false;
    },
    // takes a stringfied object and parses the data
    // Input string: stringfied json object with counts
    strified2OBJ: (state, action) => {
      const data = JSON.parse(action.payload);
      state.counts = data.counts;
      state.objects = data.objects;
      state.title = data.title;
      state.timestamps = data.timestamps;
    },
    // In case we are creating a new count Instance
    setNewObj: (state, action) => {
      state.newObj = action.payload;
    },
    // Removes the category from counts slice
    removeObject: (state, action) => {
      if (state.objects.indexOf(action.payload) !== -1) {
        state.objects = state.objects.filter((obj) => obj !== action.payload);
        delete state.counts[action.payload];
      }
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
  removeObject,
} = countsSlice.actions;
export default countsSlice.reducer;
