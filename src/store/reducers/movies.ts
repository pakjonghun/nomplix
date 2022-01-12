import { TypeMovie } from "../../utilities/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TypeInitialMovie = {
  data: TypeMovie[];
};

const initialData: TypeMovie = {
  adult: false,
  backdrop_path: "",
  genre_ids: [],
  id: 0,
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  release_date: "",
  title: "",
  video: false,
  vote_average: 0,
  vote_count: 0,
};

const initialState: TypeInitialMovie = {
  data: [initialData],
};

const movies = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getNowPlaying: (state, action: PayloadAction<TypeMovie[]>) => {
      state.data = action.payload;
    },
  },
});

export const { getNowPlaying } = movies.actions;

export default movies.reducer;
