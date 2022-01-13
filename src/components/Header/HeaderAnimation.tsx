export const logoAni = {
  initial: { fill: "rgb(255,255,255)" },
  animate: { fill: "rgb(255,0,0)" },
  hover: { fillOpacity: [1, 0.5, 1] },
};

type TypeSearchAni = {
  isSearching: boolean;
  isLg: boolean;
  isXl: boolean;
};

export const searchIconAni = {
  initial: { x: 200 },
  animate: ({ isLg, isSearching, isXl }: TypeSearchAni) => {
    switch (true) {
      case !!isLg && !isXl:
        return {
          x: isSearching ? 10 : 300,
          transition: {
            type: "linear",
            duration: 0.2,
          },
        };
      case !!isXl && !isLg:
        return {
          x: isSearching ? 11 : 350,
          transition: {
            type: "linear",
            duration: 0.2,
          },
        };

      case !isXl && !isLg:
        return {
          x: isSearching ? 12 : 200,
          transition: {
            type: "linear",
            duration: 0.2,
          },
        };

      default:
        throw new Error("input animation error");
    }
  },
};

export const searchInputAni = {
  initial: { x: 0, scaleX: 0 },
  animate: (isSearching: boolean) => ({
    x: isSearching ? 0 : 0,
    scaleX: isSearching ? 1 : 0,
    transition: { type: "linear", duration: 0.2 },
  }),
};
