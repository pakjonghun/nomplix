const IMG_URL = "https://image.tmdb.org/t/p/";

export const imageUrlMaker = (name: string, size?: string) =>
  `${IMG_URL}${size || "original"}/${name}`;

export const videoUrlMaker = (id: string) => `
https://www.youtube.com/embed/${id}?autoplay=1  
`;

export const sentenseShortter = (term: string, length: number) =>
  term.length > length ? `${term.substring(0, length)}...` : term;

export const getId = () => Math.random().toString(20).substring(0, 12);
