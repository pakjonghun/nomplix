export const logoAni = {
  initial: { fill: "rgb(255,255,255)" },
  animate: { fill: "rgb(255,0,0)" },
  hover: { fillOpacity: [1, 0.5, 1] },
};

export const searchIconAni = {
  inormal: (isSearching: boolean) => ({ x: isSearching ? 200 : 10 }),
  normal: (isSearching: boolean) => ({
    x: isSearching ? 10 : 200,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  }),
  ilg: (isSearching: boolean) => ({ x: isSearching ? 300 : 11 }),
  lg: (isSearching: boolean) => ({
    x: isSearching ? 11 : 300,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  }),
  ixl: (isSearching: boolean) => ({ x: isSearching ? 350 : 12 }),
  xl: (isSearching: boolean) => ({
    x: isSearching ? 12 : 350,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  }),
};

export const searchInputAni = {
  initial: { x: 0, scaleX: 0 },
  animate: (isSearching: boolean) => ({
    x: isSearching ? 0 : 0,
    scaleX: isSearching ? 1 : 0,
    transition: { type: "linear", duration: 0.2 },
  }),
};
