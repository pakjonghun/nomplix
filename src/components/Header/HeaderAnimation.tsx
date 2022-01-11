export const logoAni = {
  initial: { fill: "rgb(255,255,255)" },
  animate: { fill: "rgb(255,0,0)" },
  hover: { fillOpacity: [1, 0.5, 1] },
};

export const searchIconAni = {
  initial: { x: 150 },
  animate: (isSearching: boolean) => ({
    x: isSearching ? 0 : 200,
    transition: { type: "linear" },
  }),
};

export const searchInputAni = {
  initial: { x: 0, scaleX: 0 },
  animate: (isSearching: boolean) => ({
    x: isSearching ? 0 : 250,
    scaleX: isSearching ? 1 : 0,
    transition: { type: "linear" },
  }),
};
