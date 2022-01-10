import { url } from "inspector";
import React from "react";
import { useQuery } from "react-query";
import { URL } from "url";
import { movieApis } from "../apis";
import Loading from "../components/Loading";
import { imageUrlMaker } from "../utilities/utility";

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
    return (
      <div className="h-screen w-full bg-black text-white">
        <article
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.0),rgba(0, 0, 0, 1)), url(
              ${imageUrlMaker(data?.results[0].backdrop_path || "")}
            )`,
          }}
          className="flex flex-col justify-center h-full w-full p-10 bg-contain bg-no-repeat "
        >
          <h1 className=" text-5xl font-bold mb-7">
            {data?.results[0].original_title}
          </h1>
          <p className="w-1/2 text-3xl">{data?.results[0].overview}</p>
        </article>
      </div>
    );
  }
};

export default Home;
