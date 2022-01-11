import React from "react";
import { useQuery } from "react-query";
import { movieApis } from "../apis";
import Loading from "../components/Loading";
import { imageUrlMaker } from "../utilities/utility";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import Detail from "../components/Detail";
import Slider from "../components/Slider";
import { TypeData } from "../utilities/types";

const Home = () => {
  const { isLoading, data } = useQuery<TypeData>(
    ["movie", "nowplay"],
    movieApis.nowPlaying
  );

  const isModal = useMatch("/movies/:id");
  const { id } = useParams();
  const navigate = useNavigate();

  const clickedMovie = isModal && data?.results.find((m) => m.id === +id!);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white">
        <motion.section
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0, 0, 0, 1)), url(
              ${imageUrlMaker(data?.results[0].backdrop_path || "", "w500")}
            )`,
          }}
          className="flex flex-col justify-center h-full w-full mt-20 p-10 bg-cover bg-no-repeat bg-black transition-all duration 100"
        >
          <div className="-mt-64 sm:-mt-52 lg:-mt-32">
            <h1 className=" text-2xl font-bold mb-7">
              {data?.results[0].original_title}
            </h1>
            <p className="w-1/2 text-xl">
              {data?.results[0].overview &&
              data?.results[0].overview.length > 100
                ? data?.results[0].overview
                : data?.results[0].overview.substring(0, 100)}
            </p>
          </div>
        </motion.section>
        {data && <Slider data={data} itemCount={5} />}

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
                className="fixed top-0 w-full h-screen bg-gradient-to-b from-slate-600/30 to-slate-200/0"
              />
              {id && clickedMovie && (
                <Detail id={id} clickedMovie={clickedMovie} />
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }
};

export default Home;
