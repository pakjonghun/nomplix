import { TypeMenuPathMapper } from "./types";

export const idMaker = () => Math.random().toString(20).substring(0, 12);

export const menuPathMapper: TypeMenuPathMapper = {
  Home: "/",
  "TV Show": "/tv",
};
