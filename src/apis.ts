const API_KEY = "78c4651e6f70ef92cb879b749825122d";
const BASIC_URL = "https://api.themoviedb.org/3/";

export const getNowPlayingMovie = async (url: string) => {
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
    getNowPlayingMovie(
      `${BASIC_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ),
};
