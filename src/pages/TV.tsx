import React from "react";
import { useQuery } from "react-query";
import Slider from "../components/Slider";
import { tvApis } from "../store/apis/apis";
import { QueryTypes, TypeData, TypeTvOnAir } from "../utilities/types";
import { imageUrlMaker } from "../utilities/utility";

const TV = () => {
  const onAir = useQuery<TypeData<TypeTvOnAir>>(["tv", "onAir"], tvApis.onAir);
  const popular = useQuery<TypeData<TypeTvOnAir>>(
    ["tv", "popular"],
    tvApis.popular
  );

  const getSliderData = (key: keyof typeof QueryTypes) => {
    let cur;
    switch (key) {
      case "onair":
        cur = onAir.data?.results;
        break;

      case "popular":
        cur = popular.data?.results;
        break;

      default:
        throw new Error("error on tv slider data");
    }

    if (!cur) return;
    return cur.map((item) => ({
      id: item.id,
      backdrop_path: item.backdrop_path,
      title: item.name,
    }));
  };

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
        <div className=" -mt-24 w-7/12">
          <h1 className="mb-5">{onAir.data?.results[0].original_name}</h1>
          <div className="mb-5 text-white/60 font-bold">
            <span className="mr-5">
              {onAir.data?.results[0].first_air_date}
            </span>
            <span>{onAir.data?.results[0].origin_country}</span>
          </div>
          <p>{onAir.data?.results[0].overview}</p>
        </div>
      </header>
      <main>
        {[QueryTypes.onair, QueryTypes.popular].map((item) => {
          const data = getSliderData(item);
          return (
            data && (
              <div
                style={{ paddingBottom: "20%" }}
                className="relative flex justify-center h-0 top-5 "
              >
                <Slider key={item} data={data} itemCount={5} title={item} />
              </div>
            )
          );
        })}
      </main>
    </article>
  );
};

export default TV;
