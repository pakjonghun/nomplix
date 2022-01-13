const API_KEY = process.env.REACT_APP_KEY;
const BASIC_URL = "https://api.themoviedb.org/3";

export const getData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const movieApis = {
  nowPlaying: () =>
    getData(
      `${BASIC_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ),

  detail: (id: string) =>
    getData(`${BASIC_URL}/movie/${id}?api_key=${API_KEY}`),
  video: (id: string) =>
    getData(`${BASIC_URL}/movie/${id}/videos?api_key=${API_KEY}`),
  search: (term: string) =>
    getData(`${BASIC_URL}/search/movie?api_key=${API_KEY}&query=${term}`),
  topRated: () => getData(`${BASIC_URL}/movie/top_rated?api_key=${API_KEY}`),
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
