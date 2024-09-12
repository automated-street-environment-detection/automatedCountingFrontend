import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import undoReducer from "./undoSlice";
import countReducer from "./countsSlice";

export default configureStore({
  reducer: {
    player: playerReducer,
    undo: undoReducer,
    counts: countReducer,
  },
});
