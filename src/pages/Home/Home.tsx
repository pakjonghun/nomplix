import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { movieApis } from "../../store/apis/apis";
import { imageUrlMaker, sentenseShortter } from "../../utilities/utility";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Detail from "../../components/Detail";
import Slider from "../../components/Slider";
import { QueryTypes, TypeData, TypeMovie } from "../../utilities/types";
import Modal from "../../components/Modal";
import { useAppDispatch } from "../../hooks/store";
import { getNowPlaying } from "../../store/reducers/movies";
import { Spinner } from "@chakra-ui/react";
import { useNowPlayingQuery, useTopRatedQuery } from "../hooks/useQuery";
import empty from "../../images/empty.jpeg";
import { movieKeys } from "../../reactQuery/keys";

const Home = () => {
  const { scrollY } = useViewportScroll();
  const upOpacity = useTransform(scrollY, [150, 200], [1, 0]);

  const { data, isLoading, curPage, setCurPage } = useNowPlayingQuery();
  const topQuery = useTopRatedQuery();

  const navigate = useNavigate();
  const location = useLocation();

  const clickedQuery = () => {
    const regExp = /^(?:\/movies\/)([a-zA-Z]+)\/[0-9a-zA-Z]+/;
    const result = location.pathname.match(regExp);
    if (result?.length !== 2) return "";
    return result[1];
  };

  const getCurMovie = (queryKey: string) => {
    switch (queryKey) {
      case "nowplaying":
        return data ? data : 0;
      case "toprated":
        return topQuery.data ? topQuery.data : 0;
      default:
        throw new Error("not exist data");
    }
  };

  const { id } = useParams();

  const clickedMovie = (id: string) => {
    const key = clickedQuery();
    if (!key.trim().length) return 0;

    const data = getCurMovie(key);
    if (!data) return 0;
    const result = data.results.find((m) => m.id === +id);
    if (result) return result;
    return 0;
  };

  const curMovie = id && clickedMovie(id);
  const getSliderData = (key: keyof typeof QueryTypes) => {
    let curData;
    switch (key) {
      case "nowplaying":
        curData = data?.results;
        break;
      case "toprated":
        curData = topQuery.data?.results;
        break;
      default:
        throw new Error("error on get slider data");
    }

    if (!curData) return;
    return curData.map((item) => ({
      id: item.id,
      backdrop_path: item.backdrop_path,
      title: item.title,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {data?.results && (
        <div className="flex flex-col justify-center min-h-screen w-full md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl bg-black text-white">
          <motion.section
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0, 0, 0, 1)), url(
                  ${imageUrlMaker(data.results[0]?.backdrop_path || "", "w500")}
                ),url(${empty})`,
              padding: "4%",
            }}
            className="flex flex-col justify-center w-full h-screen2/3 2xl:h-screen xl:h-screen6/7 lg:h-screen3/5 bg-cover bg-no-repeat transparent transition-all duration 100"
          >
            <div className="absolute right-5 top-32 lg:right-7">
              <button
                className="hover:scale-105 active:scale-100 transition-all duration-100 ease-linear m-2 px-2 py-1 border-2 border-white rounded-md cursor-pointer "
                disabled={curPage < 2}
                onClick={() => {
                  topQuery.setCurPage((pre) => pre - 1);
                  setCurPage((pre) => pre - 1);
                }}
              >
                Prev
              </button>
              <button
                className="hover:scale-105 active:scale-100 transition-all duration-100 ease-linear m-2 px-2 py-1 border-2 border-white rounded-md cursor-pointer "
                disabled={curPage >= data.total_pages}
                onClick={() => {
                  topQuery.setCurPage((pre) => pre + 1);
                  setCurPage((pre) => pre + 1);
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
                {data?.results[0].original_title}
              </h1>
              <p className=" mb-3">
                {data?.results[0].overview &&
                  sentenseShortter(data.results[0].overview, 250)}
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                className="text-yellow-500/90 font-bold"
                onClick={() =>
                  navigate(`/movies/nowplaying/${data.results[0].id}`)
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

export default Home;
