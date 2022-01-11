const IMG_URL = "https://image.tmdb.org/t/p/";

export const imageUrlMaker = (name: string, size?: string) =>
  `${IMG_URL}${size || "original"}/${name}`;
