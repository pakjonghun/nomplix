import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { movieApis } from "../store/apis/apis";
import { imageUrlMaker, sentenseShortter } from "../utilities/utility";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Detail from "../components/Detail";
import Slider from "../components/Slider";
import { TypeData, TypeMovie } from "../utilities/types";
import Modal from "../components/Modal";
import ClientStatusWrapper from "../components/ClientStatusWrapper";
import { useAppDispatch } from "../hooks/store";
import { getNowPlaying } from "../store/reducers/movies";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, error, data } = useQuery<TypeData<TypeMovie>>(
    ["movie", "nowplay"],
    movieApis.nowPlaying
  );

  const topQuery = useQuery<TypeData<TypeMovie>>(
    ["movie", "toop"],
    movieApis.topRated
  );

  useEffect(() => {
    if (data?.results) dispatch(getNowPlaying(data.results));
  }, [data, dispatch]);

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
  const booleans = { isLoading, isError, isSuccess: data?.isSuccess };
  const rest = { error, statusMessage: data?.status_message };

  return (
    <ClientStatusWrapper booleans={booleans} rest={rest}>
      {data?.results && (
        <div className="flex flex-col min-h-screen w-full md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl bg-black text-white">
          <motion.section
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0, 0, 0, 1)), url(
                  ${imageUrlMaker(data.results[0]?.backdrop_path || "", "w500")}
                )`,
              padding: "4%",
            }}
            className="flex flex-col justify-center w-full h-screen2/3 2xl:h-screen xl:h-screen6/7 lg:h-screen3/5 bg-cover bg-no-repeat transparent transition-all duration 100"
          >
            <div style={{ marginTop: "-5%" }}>
              <h1 className=" font-bold mt-7 mb-5">
                {data?.results[0].original_title}
              </h1>
              <p className="w-1/2 mb-3">
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
            </div>
          </motion.section>

          <section className="relative -top-32 lg:-top-10 w-full px-1 ">
            <div
              style={{ paddingBottom: "20%" }}
              className="relative flex items-center justify-between w-full h-20 px-1"
            >
              {<Slider data={data} title={"nowplaying"} itemCount={5} />}
            </div>

            {!topQuery.isLoading && topQuery.data && (
              <div
                style={{ paddingBottom: "20%" }}
                className="relative flex items-center justify-between w-full h-20 px-1"
              >
                {
                  <Slider
                    data={topQuery.data}
                    title={"toprated"}
                    itemCount={5}
                  />
                }
              </div>
            )}
          </section>

          <Modal childId="modal" backAdress="/">
            {curMovie && <Detail curMovie={curMovie} />}
          </Modal>
        </div>
      )}
    </ClientStatusWrapper>
  );
};

export default Home;
