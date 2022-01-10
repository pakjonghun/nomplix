import React from "react";
import { useQuery } from "react-query";
import { movieApis } from "../apis";
import Loading from "../components/Loading";

export type TypeMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type TypeData = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: TypeMovie[];
};

const Home = () => {
  const { isLoading, data } = useQuery<TypeData>(
    ["movie", "nowplay"],
    movieApis.nowPlaying
  );

  if (isLoading) {
    return <Loading />;
  } else {
    return <div className="h-double w-full  bg-gray-500"></div>;
  }
};

export default Home;
