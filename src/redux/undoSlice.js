import { createSlice } from "@reduxjs/toolkit";

const undoSlice = createSlice({
  name: "undo",
  initialState: {
    actions: [],
    lastAction: null,
  },
  reducers: {
    addAction: (state, action) => {
      state.actions.unshift(action.payload);
    },
    popAction: (state) => {
      if (state.actions.length > 0) {
        const [firstElement, ...rest] = state.actions;
        state.actions = rest;
        state.lastAction = firstElement;
      }
    },
  },
});

export const { addAction, popAction } = undoSlice.actions;
export default undoSlice.reducer;
