import React from "react";
import { useQuery } from "react-query";
import Slider from "../components/Slider";
import { tvApis } from "../store/apis/apis";
import { TypeData, TypeTvOnAir } from "../utilities/types";
import { imageUrlMaker } from "../utilities/utility";

const TV = () => {
  const onAir = useQuery<TypeData<TypeTvOnAir>>(["tv", "onAir"], tvApis.onAir);
  const popular = useQuery(["tv", "popular"], tvApis.popular);
  const a = imageUrlMaker(onAir.data?.results[0].backdrop_path || "");
  console.log(a);
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
        <section className=" -mt-24 w-7/12">
          <h1 className="mb-5">{onAir.data?.results[0].original_name}</h1>
          <div className="mb-5 text-white/60 font-bold">
            <span className="mr-5">
              {onAir.data?.results[0].first_air_date}
            </span>
            <span>{onAir.data?.results[0].origin_country}</span>
          </div>
          <p>{onAir.data?.results[0].overview}</p>
        </section>
      </header>
      <main>
        <section></section>
      </main>
    </article>
  );
};

export default TV;
