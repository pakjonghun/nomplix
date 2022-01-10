import { TypeMenuPathMapper } from "./types";

export const idMaker = () => Math.random().toString(20).substring(0, 12);

export const menuPathMapper: TypeMenuPathMapper = {
  Home: "/",
  "TV Show": "/tv",
};

const IMG_URL = "https://image.tmdb.org/t/p/";

export const imageUrlMaker = (name: string, size?: string) =>
  `${IMG_URL}${size || "original"}/${name}`;
