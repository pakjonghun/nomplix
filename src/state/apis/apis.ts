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

  search: () => getData(`${BASIC_URL}/`),
};

// search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
