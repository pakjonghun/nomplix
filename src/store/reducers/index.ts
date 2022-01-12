import { combineReducers } from "@reduxjs/toolkit";
import movies from "./movies";
import movieDetail from "./movieDetail";

const rootReducer = combineReducers({
  movies,
  movieDetail,
});

export default rootReducer;
