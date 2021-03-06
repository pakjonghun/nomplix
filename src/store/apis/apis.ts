const API_KEY = "78c4651e6f70ef92cb879b749825122d";
const BASIC_URL = "https://api.themoviedb.org/3";

export const getData = async (url: string) => {
  const res = await fetch(url);
  if (res.status >= 400) {
    const error = await res.json();

    if (error) throw new Error(error.status_message);
  }
  return res.json();
};

export const movieApis = {
  nowPlaying: (page: number = 1) =>
    getData(
      `${BASIC_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    ),

  detail: (id: string) =>
    getData(`${BASIC_URL}/movie/${id}?api_key=${API_KEY}`),
  video: (id: string) =>
    getData(`${BASIC_URL}/movie/${id}/videos?api_key=${API_KEY}`),
  search: (term: string) =>
    getData(`${BASIC_URL}/search/movie?api_key=${API_KEY}&query=${term}`),
  topRated: (page: number = 1) =>
    getData(`${BASIC_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`),
  popular: () => getData(`${BASIC_URL}/movie/popular?api_key=${API_KEY}`),
};

export const tvApis = {
  onAir: () => getData(`${BASIC_URL}/tv/on_the_air?api_key=${API_KEY}`),
  popular: () => getData(`${BASIC_URL}/tv/popular?api_key=${API_KEY}`),
  search: (term: string) =>
    getData(`${BASIC_URL}/search/tv?api_key=${API_KEY}&query=${term}`),
  detail: (id: string) => getData(`${BASIC_URL}/tv/${id}?api_key=${API_KEY}`),
  video: (id: string) =>
    getData(`${BASIC_URL}/tv/${id}/videos?api_key=${API_KEY}`),
};
