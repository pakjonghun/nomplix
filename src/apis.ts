const API_KEY = process.env.REACT_APP_KEY;
const BASIC_URL = "https://api.themoviedb.org/3/";
console.log(API_KEY);

export const getData = async (url: string) => {
  try {
    const res = await fetch(url);
    if (res.status < 400) return res.json();
    throw new Error("error");
  } catch (err) {
    console.log(err);
  }
};

export const movieApis = {
  nowPlaying: () =>
    getData(
      `${BASIC_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ),

  detail: (id: string) => getData(`${BASIC_URL}movie/${id}?api_key=${API_KEY}`),

  search: () => getData(`${BASIC_URL}/`),
};

// search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
