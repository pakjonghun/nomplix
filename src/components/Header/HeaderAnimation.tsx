export const logoAni = {
  initial: { fill: "rgb(255,255,255)" },
  animate: { fill: "rgb(255,0,0)" },
  hover: { fillOpacity: [1, 0.5, 1] },
};

export const searchIconAni = {
  xs: (isSearching: boolean) => ({
    x: isSearching ? -135 : 0,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  }),
  sm: (isSearching: boolean) => ({
    x: isSearching ? -173 : 0,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  }),
  md: (isSearching: boolean) => ({
    x: isSearching ? -188 : 0,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  }),
  lg: (isSearching: boolean) => ({
    x: isSearching ? -214 : 0,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  }),
  xl: (isSearching: boolean) => ({
    x: isSearching ? -210 : 0,
    transition: {
      type: "linear",
      duration: 0.2,
    },
  }),
  "2xl": (isSearching: boolean) => ({
    x: isSearching ? -237 : 0,
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
