import React, { FC } from "react";
import { useQuery } from "react-query";
import { movieApis } from "../store/apis/apis";
import { motion, useViewportScroll } from "framer-motion";
import { imageUrlMaker, videoUrlMaker } from "../utilities/utility";
import Stars from "./Stars";
import { TypeMovie, TypeMovieDetail, TypeVideoData } from "../utilities/types";
import Loading from "./Loading";

const Detail: FC<{ id: string; clickedMovie: TypeMovie }> = ({
  id,
  clickedMovie,
}) => {
  const { isLoading, data } = useQuery<TypeMovieDetail>(
    ["movie", "detail"],
    () => movieApis.detail(id)
  );

  const { isLoading: isVLoading, data: Vdata } = useQuery<TypeVideoData>(
    ["movie", "video"],
    () => movieApis.video(id)
  );
  const { scrollY } = useViewportScroll();

  return (
    <motion.div
      style={{
        top: scrollY.get() + 50,
      }}
      id="modal"
      layoutId={id}
      className="absolute left-0 right-0 my-0 mx-auto w-9/12 h-screen2/3 pb-4 bg-gray-800 rounded-md shadow-lg overflow-y-scroll "
    >
      {clickedMovie && (
        <>
          <img
            className="w-full"
            src={imageUrlMaker(clickedMovie.backdrop_path)}
            alt={clickedMovie.title}
          />
          <h2 className="relative left-5 font-bold">
            {clickedMovie.original_title}
          </h2>
          <div className="relative -top-18 px-5">
            {data?.genres && (
              <span>{data.genres.map((g) => g.name).join(" | ")}</span>
            )}
          </div>
          <div className="relative -top-18 px-5">
            <div className="flex mb-5">
              <span className="mr-5">{clickedMovie.release_date}</span>
              <span className="mr-5">{clickedMovie.original_language}</span>
              {!isLoading && data?.homepage && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.homepage}
                >
                  Homepage
                </a>
              )}
            </div>

            <Stars vote={clickedMovie.vote_average} />
            <div className="mt-5">
              {isVLoading ? (
                <Loading />
              ) : (
                <div
                  style={{ paddingBottom: "70%" }}
                  className="relative w-full h-0 overflow-hidden"
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    title={Vdata?.results[0].name}
                    src={
                      Vdata?.results[0]
                        ? videoUrlMaker(Vdata?.results[0].key)
                        : ""
                    }
                  />
                </div>
              )}
            </div>
            <p className="mt-5">{clickedMovie.overview}</p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Detail;
