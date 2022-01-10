export enum Menus {
  "Home" = "Home",
  "TV Show" = "TV Show",
}

export type TypeMenus = keyof typeof Menus;

export type TypeMenuPathMapper = { [key: string]: string };
