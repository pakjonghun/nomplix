import { animate, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import { movieApis } from "../store/apis/apis";
import { TypeSearchData } from "../utilities/types";
import { imageUrlMaker, sentenseShortter } from "../utilities/utility";
import empty from "../images/empty.jpeg";

const Search = () => {
  const [params] = useSearchParams();
  const term = params.get("term");

  const { isLoading, data } = useQuery<TypeSearchData>([term], () =>
    movieApis.search(term || "")
  );

  return (
    <div className="bg-black h-full min-h-screen w-full pt-20 text-white">
      {isLoading ? (
        <Loading />
      ) : (
        <ul className="p-5">
          {data?.results.map((v) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 40 }}
              className="flex items-center max-w-screen-md px-4 py-2 mb-7 bg-gray-500/25 rounded-lg cursor-pointer"
              key={v.id}
            >
              <img
                className="w-20 h-20 mr-4"
                src={v.poster_path ? imageUrlMaker(v.poster_path) : empty}
                alt={v.title}
              />
              <div className="flex flex-col py-3 px-2">
                <h2 className=" font-bold text-lg">
                  {sentenseShortter(v.title || "", 31)}
                </h2>
                <p className="h-10 text-stone-400">
                  {sentenseShortter(v.overview || "", 50)}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
