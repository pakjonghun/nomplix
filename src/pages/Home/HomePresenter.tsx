import { imageUrlMaker, sentenseShortter } from "../../utilities/utility";
import { motion, MotionValue } from "framer-motion";
import { NavigateFunction } from "react-router-dom";
import Detail from "../../components/Detail";
import Slider from "../../components/Slider";
import { QueryTypes, TypeData, TypeMovie } from "../../utilities/types";
import Modal from "../../components/Modal";
import empty from "../../images/empty.jpeg";
import { FC } from "react";

type HomePresenterProps = {
  data: {
    topData?: TypeData<TypeMovie>;
    playData?: TypeData<TypeMovie>;
    curMovie: "" | TypeMovie | 0 | undefined;
    getSliderData: (key: keyof typeof QueryTypes) =>
      | {
          id: number;
          backdrop_path: string;
          title: string;
        }[]
      | undefined;
  };

  page: {
    topPage: number;
    setTop: React.Dispatch<React.SetStateAction<number>>;
    setPlay: React.Dispatch<React.SetStateAction<number>>;
  };

  rest: {
    upOpacity: MotionValue<number>;
    navigate: NavigateFunction;
  };
};

const HomePresenter: FC<HomePresenterProps> = ({ data, page, rest }) => {
  const { topData, playData, getSliderData, curMovie } = data;
  const { topPage, setTop, setPlay } = page;
  const { upOpacity, navigate } = rest;
  return (
    <>
      {topData?.results && playData?.results && (
        <div className="flex flex-col justify-center min-h-screen w-full md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl bg-black text-white">
          <motion.section
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0, 0, 0, 1)), url(
                  ${imageUrlMaker(
                    playData.results[0]?.backdrop_path || "",
                    "w500"
                  )}
                ),url(${empty})`,
              padding: "4%",
            }}
            className="flex flex-col justify-center w-full h-screen2/3 2xl:h-screen xl:h-screen6/7 lg:h-screen3/5 bg-cover bg-no-repeat transparent transition-all duration 100"
          >
            <div className="absolute right-5 top-32 lg:right-7">
              <button
                className="hover:scale-105 active:scale-100 transition-all duration-100 ease-linear m-2 px-2 py-1 border-2 border-white rounded-md cursor-pointer "
                disabled={topPage < 2}
                onClick={() => {
                  setTop((pre) => pre - 1);
                  setPlay((pre) => pre - 1);
                }}
              >
                Prev
              </button>
              <button
                className="hover:scale-105 active:scale-100 transition-all duration-100 ease-linear m-2 px-2 py-1 border-2 border-white rounded-md cursor-pointer "
                disabled={
                  topPage >=
                  Math.min(topData.total_pages, playData?.total_pages)
                }
                onClick={() => {
                  setTop((pre) => pre + 1);
                  setPlay((pre) => pre + 1);
                }}
              >
                Next
              </button>
            </div>
            <motion.div
              style={{
                opacity: upOpacity,
                marginTop: "-5%",
              }}
              className="w-1/2"
            >
              <h1 className=" font-bold mt-7 mb-5">
                {playData.results[0].original_title}
              </h1>
              <p className=" mb-3">
                {playData.results[0].overview &&
                  sentenseShortter(playData.results[0].overview, 250)}
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                className="text-yellow-500/90 font-bold"
                onClick={() =>
                  navigate(`/movies/nowplaying/${playData.results[0].id}`)
                }
              >
                More
              </motion.button>
            </motion.div>
          </motion.section>

          <section className="relative -top-20 lg:-top-10 w-full px-1 ">
            {[QueryTypes.toprated, QueryTypes.nowplaying].map((item) => {
              const data = getSliderData(item);

              return (
                data && (
                  <div
                    key={item}
                    style={{ paddingBottom: "20%" }}
                    className="relative flex items-center justify-between w-full h-20 px-1"
                  >
                    {<Slider data={data} title={item} itemCount={5} />}
                  </div>
                )
              );
            })}
          </section>

          <Modal childId="modal" backAdress="/">
            {curMovie && <Detail curMovie={curMovie} />}
          </Modal>
        </div>
      )}
    </>
  );
};

export default HomePresenter;
