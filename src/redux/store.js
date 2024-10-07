import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import undoReducer from "./undoSlice";
import countReducer from "./countsSlice";
import signInReducer from "./signInSlice";
import getVideoNamesReducer from "./api/getVideoNames";
import getVideoURLReducer from "./api/getVideoURL";
// import fetchVideoNames from "./axios/getVideoNamesSlice";

export default configureStore({
  reducer: {
    player: playerReducer,
    undo: undoReducer,
    counts: countReducer,
    signIn: signInReducer,
    getVideoNames: getVideoNamesReducer,
    getVideoURL: getVideoURLReducer,
    // videoNames: fetchVideoNames,
  },
});
