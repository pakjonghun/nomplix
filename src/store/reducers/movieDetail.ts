import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeMovieDetail } from "../../utilities/types";

const initialState: TypeMovieDetail = {
  adult: false,
  backdrop_path: "",
  belongs_to_collection: {},
  budget: 0,
  genres: [],
  homepage: "",
  id: 0,
  imdb_id: "",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  production_companies: {},
  production_countries: {},
  release_date: "",
  revenue: 0,
  runtime: 0,
  spoken_languages: {},
  status: "",
  tagline: "",
  title: "",
  video: false,
  vote_average: 0,
  vote_count: 0,
};

const detail = createSlice({
  name: "detail",
  initialState,
  reducers: {
    getDetail: (state, action: PayloadAction<TypeMovieDetail>) => {
      state = action.payload;
    },
  },
});

export const { getDetail } = detail.actions;
export default detail.reducer;
