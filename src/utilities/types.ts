export type TypeForm = {
  term: string;
};

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

export type TypeSlider = {
  id: number;
  backdrop_path: string;
  title: string;
};

export type TypeData<T> = {
  isSuccess?: boolean;
  status_message?: string;
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
};

export type TypeMovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type TypeVideo = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type TypeVideoData = {
  id: number;
  results: TypeVideo[];
};

export type TypeSearchData = {
  page: number;
  results: TypeSearchResults[];
  total_pages: number;
  total_results: number;
};

export type TypeSearchResults = {
  adult: boolean;
  backdrop_path: object;
  genre_ids: object;
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

export type TypeTvOnAir = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: object;
  id: number;
  name: string;
  origin_country: object;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export enum QueryTypes {
  "nowplaying" = "nowplaying",
  "toprated" = "toprated",
  "popular" = "popular",
  "onair" = "onair",
}
