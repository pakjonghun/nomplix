import React from "react";
import { useQuery } from "react-query";
import Slider from "../components/Slider";
import { tvApis } from "../store/apis/apis";
import { QueryTypes, TypeData, TypeTvOnAir } from "../utilities/types";
import { imageUrlMaker } from "../utilities/utility";
import {
  AnimatePresence,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import Modal from "../components/Modal";
import Detail from "../components/Detail";
import { useLocation, useParams } from "react-router-dom";

export type TypeCurMovie = {
  id: number;
  backdrop_path: string;
  title: string;
  original_title: string;
  release_date: string;
  original_language: string;
  vote_average: number;
  overview: string;
};

const TV = () => {
  const onAir = useQuery<TypeData<TypeTvOnAir>>(["tv", "onAir"], tvApis.onAir);
  const popular = useQuery<TypeData<TypeTvOnAir>>(
    ["tv", "popular"],
    tvApis.popular
  );
  const location = useLocation();

  const clickedQuery = () => {
    const regExp = /^(?:\/tv\/)([a-zA-Z]+)\/[0-9a-zA-Z]+/;
    const result = location.pathname.match(regExp);
    if (result?.length !== 2) return "";
    return result[1];
  };
  const { scrollY } = useViewportScroll();
  const beforeHidden = useTransform(scrollY, [120, 150], [1, 0]);

  const switchData = (key: string) => {
    if (!key.length) return;
    switch (key) {
      case "onair":
        return onAir.data?.results;

      case "popular":
        return popular.data?.results;

      default:
        throw new Error("error on tv slider data");
    }
  };

  const getSliderData = (key: keyof typeof QueryTypes) => {
    const cur = switchData(key);
    if (!cur) return;
    return cur.map((item) => ({
      id: item.id,
      backdrop_path: item.backdrop_path,
      title: item.name,
    }));
  };

  const { id } = useParams();
  const getModalData = (key: string) => {
    const cur = switchData(key);
    if (!cur || !id) return;
    const curTv = cur?.find((t) => t.id === +id);
    if (!curTv) return;
    return {
      id: curTv.id,
      backdrop_path: curTv.backdrop_path,
      title: curTv.name,
      original_title: curTv.original_name,
      release_date: curTv.first_air_date,
      original_language: curTv.original_language,
      vote_average: curTv.vote_average,
      overview: curTv.overview,
    };
  };

  const curTv = getModalData(clickedQuery());

  return (
    <article className=" min-h-screen w-full bg-gray-500 text-white">
      <header
        className="flex flex-col justify-center h-screen2/3 w-full mt-10 bg-contain bg-no-repeat sm:bg-cover"
        style={{
          padding: "4%",
          backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0.1),rgba(0,0,0,1)),
        url(${imageUrlMaker(
          onAir.data?.results[0].backdrop_path || "",
          "original"
        )})
        `,
        }}
      >
        <motion.div
          style={{ opacity: beforeHidden }}
          className=" -mt-24 w-7/12"
        >
          <h1 className="mb-5">{onAir.data?.results[0].original_name}</h1>
          <div className="mb-5 text-white/60 font-bold">
            <span className="mr-5">
              {onAir.data?.results[0].first_air_date}
            </span>
            <span>{onAir.data?.results[0].origin_country}</span>
          </div>
          <p>{onAir.data?.results[0].overview}</p>
        </motion.div>
      </header>
      <main>
        {[QueryTypes.onair, QueryTypes.popular].map((item) => {
          const data = getSliderData(item);
          return (
            data && (
              <div
                key={item}
                style={{ paddingBottom: "20%" }}
                className="relative flex justify-center h-0 top-5 "
              >
                <Slider key={item} data={data} itemCount={5} title={item} />
              </div>
            )
          );
        })}
        <AnimatePresence>
          {curTv && (
            <Modal backAdress="/tv" childId="modal">
              {<Detail curMovie={curTv} />}
            </Modal>
          )}
        </AnimatePresence>
      </main>
    </article>
  );
};

export default TV;
