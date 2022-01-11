import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { movieApis } from "../apis";
import Loading from "../components/Loading";
import { imageUrlMaker } from "../utilities/utility";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useViewportScroll,
} from "framer-motion";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { Item } from "framer-motion/types/components/Reorder/Item";

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

const pagingAni = {
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

const imgAni = {
  normal: { scale: 1 },
  hover: {
    scaleY: 1.3,
    scaleX: 1.2,
    y: -50,
    transition: { type: "tween", delay: 0.2, duration: 0.3 },
  },
};

const Home = () => {
  const { isLoading, data } = useQuery<TypeData>(
    ["movie", "nowplay"],
    movieApis.nowPlaying
  );

  // const { isLoading: isDetailLoading, data: detailData } = useQuery<>();

  const [index, setIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState(1);
  const isModal = useMatch("/movies/:id");
  const { id } = useParams();
  const { scrollY } = useViewportScroll();

  const navigate = useNavigate();

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

  const onItemClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  const clickedMovie = isModal && data?.results.find((m) => m.id === +id!);
  console.log(clickedMovie);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white">
        <section
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.0),rgba(0, 0, 0, 1)), url(
              ${imageUrlMaker(data?.results[0].backdrop_path || "")}
            )`,
          }}
          className="mt-20 sm:text-base flex flex-col justify-center h-full w-full  p-10 bg-contain bg-no-repeat"
        >
          <div className="-mt-64 sm:-mt-52 lg:-mt-32">
            <h1
              onClick={() => onClickController(-1)}
              className=" text-2xl font-bold mb-7"
            >
              {data?.results[0].original_title}
            </h1>
            <p onClick={() => onClickController(1)} className="w-1/2 text-xl">
              {data?.results[0].overview &&
              data?.results[0].overview.length > 100
                ? data?.results[0].overview
                : data?.results[0].overview.substring(0, 100)}
            </p>
          </div>
        </section>
        <section className="relative w-full  h-1/6 -top-64 sm:-top-52 lg:-top-32 bg-black">
          <AnimatePresence
            initial={false}
            onExitComplete={() => setIsSliding(false)}
            custom={direction}
          >
            <motion.div
              custom={direction}
              key={index}
              variants={pagingAni}
              initial="init"
              animate="show"
              exit="exit"
              className="absolute top-0 grid grid-cols-6 gap-1 w-full px-5 mb-3"
            >
              {offset(index).map((item) => {
                return (
                  <motion.div
                    onClick={() => onItemClick(item.id)}
                    layoutId={item.id + ""}
                    variants={imgAni}
                    initial="normal"
                    whileHover="hover"
                    key={item.id}
                    transition={{ type: "tween" }}
                    className="flex flex-col items-center justify-center first:origin-left last:origin-right group cursor-pointer"
                  >
                    <img
                      alt={item.original_title}
                      src={imageUrlMaker(item.backdrop_path, "w500")}
                    />
                    <motion.div
                      className="absolute w-full origin-top opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-250 text-center"
                      initial="normal"
                      animate="hover"
                    >
                      <h4 className=" text-xs">{item.title}</h4>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>
        <AnimatePresence>
          {isModal && (
            <>
              <motion.div
                exit={{ opacity: 0 }}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  const t = event.target as HTMLDivElement;
                  if (t.matches("#modal")) return;
                  navigate("/");
                }}
                className="fixed top-0 w-full h-screen bg-gradient-to-b from-slate-600/30 to-slate-200/0 "
              ></motion.div>
              <motion.div
                style={{ top: scrollY.get() + 50 }}
                id="modal"
                layoutId={id}
                className="absolute w-7/12 h-screen2/3 bg-gray-800 rounded-md shadow-lg"
              >
                {clickedMovie && (
                  <>
                    <div
                      className="w-full h-2/4 bg-no-repeat bg-contain bg-top"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,.3),transparent)
                        ,url(${imageUrlMaker(clickedMovie.backdrop_path)})`,
                      }}
                    ></div>
                    <h2 className="relative -top-1/4 left-5 text-2xl font-bold">
                      {clickedMovie.original_title}
                    </h2>
                    <div className="">
                      <span>{clickedMovie.release_date}</span>
                      <span>{clickedMovie.vote_average}</span>
                      <span>{clickedMovie.original_language}</span>
                    </div>
                    <p>{clickedMovie.overview}</p>
                  </>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }
};

export default Home;
