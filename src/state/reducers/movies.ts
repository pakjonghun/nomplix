import { movieApis } from "../apis/apis";
import { TypeData, TypeMovie } from "./../../utilities/types";
import { useQuery } from "react-query";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

const getMovieAsync = createAsyncThunk("/movie/now_playing", async () => {
  const { isLoading, data } = useQuery<TypeData>(
    ["movie", "nowplay"],
    movieApis.nowPlaying
  );
  return { isLoading, data };
});

const movies = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovie: () => {},
  },
});
