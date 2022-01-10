import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { movieApis } from "../apis";
import Loading from "../components/Loading";
import { imageUrlMaker } from "../utilities/utility";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

export type TypeMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type TypeData = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: TypeMovie[];
};

const pagingNumger = 6;

const paging = {
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

const Home = () => {
  const x = useMotionValue(0);
  useEffect(() => {
    x.onChange(() => console.log(x.get()));
  }, [x]);
  const { isLoading, data } = useQuery<TypeData>(
    ["movie", "nowplay"],
    movieApis.nowPlaying
  );

  const [index, setIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState(1);

  const offset = (index: number) => {
    if (!data) return [];
    return data.results.slice(index * pagingNumger, (1 + index) * pagingNumger);
  };

  const onClickController = (direction: number) => {
    if (isSliding) return;
    if (!data?.results) return;
    if (!data.results.length) return;
    const totalPage = Math.floor(data.results.length / pagingNumger);

    setIsSliding(true);

    switch (direction) {
      case 1:
        onPlusClick(totalPage);
        break;
      case -1:
        onMinusClick(totalPage);
        break;
      default:
        throw new Error("error");
    }
  };

  const onPlusClick = (totalPage: number) => {
    setDirection(1);
    setIndex(index === totalPage ? 0 : index + 1);
  };

  const onMinusClick = (totalPage: number) => {
    setDirection(-1);
    setIndex(!index ? totalPage : index - 1);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="h-screen w-full bg-black text-white">
        <section
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.0),rgba(0, 0, 0, 1)), url(
              ${imageUrlMaker(data?.results[0].backdrop_path || "")}
            )`,
          }}
          className="flex flex-col justify-center h-full w-full p-10 bg-contain bg-no-repeat"
        >
          <h1
            onClick={() => onClickController(-1)}
            className=" text-5xl font-bold mb-7"
          >
            {data?.results[0].original_title}
          </h1>
          <p onClick={() => onClickController(1)} className="w-1/2 text-3xl">
            {data?.results[0].overview}
          </p>
        </section>
        <section className="relative">
          <AnimatePresence
            initial={false}
            onExitComplete={() => setIsSliding(false)}
            custom={direction}
          >
            <motion.div
              custom={direction}
              key={index}
              variants={paging}
              initial="init"
              animate="show"
              exit="exit"
              className="absolute -top-28 grid grid-cols-6 gap-5 w-full px-5 mb-3"
            >
              {offset(index).map((item, idx) => {
                return (
                  <img
                    key={item.id}
                    alt={item.original_title}
                    src={imageUrlMaker(item.poster_path, "w200")}
                    className=" bg-red-300 "
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    );
  }
};

export default Home;
