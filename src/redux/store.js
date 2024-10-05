import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import undoReducer from "./undoSlice";
import countReducer from "./countsSlice";
import signInReducer from "./signInSlice";
// import fetchVideoNames from "./axios/getVideoNamesSlice";

export default configureStore({
  reducer: {
    player: playerReducer,
    undo: undoReducer,
    counts: countReducer,
    signIn: signInReducer,
    // videoNames: fetchVideoNames,
  },
});
