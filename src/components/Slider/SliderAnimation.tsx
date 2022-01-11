export const pagingAni = {
  init: (d: number) => ({
    x: d > 0 ? -window.innerWidth - 10 : window.innerWidth + 10,
  }),
  show: {
    x: 0,
    transition: {
      duration: 1,
      type: "tween",
    },
  },
  exit: (d: number) => ({
    x: d > 0 ? window.innerWidth + 10 : -window.innerWidth - 10,
    transition: {
      duration: 1,
      type: "tween",
    },
  }),
};

export const imgAni = {
  normal: { scale: 1 },
  hover: {
    scaleY: 1.3,
    scaleX: 1.2,
    y: -50,
    transition: { type: "tween", delay: 0.2, duration: 0.3 },
  },
};
