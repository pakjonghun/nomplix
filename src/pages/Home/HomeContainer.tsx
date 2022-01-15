import { useTransform, useViewportScroll } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { QueryTypes, TypeMovie } from "../../utilities/types";
import { Spinner } from "@chakra-ui/react";
import { useNowPlayingQuery, useTopRatedQuery } from "../hooks/useQuery";
import HomePresenter from "./HomePresenter";

const Home = () => {
  const { scrollY } = useViewportScroll();
  const upOpacity = useTransform(scrollY, [150, 200], [1, 0]);

  const {
    data: playData,
    setCurPage: setPlay,
    isLoading: playLoading,
  } = useNowPlayingQuery();
  const {
    data: topData,
    curPage: topPage,
    setCurPage: setTop,
    isLoading: topLoading,
  } = useTopRatedQuery();

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const clickedQuery = () => {
    const regExp = /^(?:\/movies\/)([a-zA-Z]+)\/[0-9a-zA-Z]+/;
    const result = location.pathname.match(regExp);
    if (result?.length !== 2) return "";
    return result[1];
  };

  const getCurMovie = (queryKey: string) => {
    switch (queryKey) {
      case "nowplaying":
        return playData ? playData : 0;
      case "toprated":
        return topData ? topData : 0;
      default:
        throw new Error("not exist data");
    }
  };

  const clickedMovie = (id: string) => {
    const key = clickedQuery();
    if (!key.trim().length) return 0;

    const data = getCurMovie(key);
    if (!data) return 0;
    const result = data.results.find((m) => m.id === +id);
    if (result) return result;
    return 0;
  };

  const curMovie: "" | TypeMovie | 0 | undefined = id && clickedMovie(id);
  const getSliderData = (key: keyof typeof QueryTypes) => {
    let curData;
    switch (key) {
      case "nowplaying":
        curData = playData?.results;
        break;
      case "toprated":
        curData = topData?.results;
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

  if (playLoading || topLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const data = { topData, playData, curMovie, getSliderData };
  const page = { topPage, setPlay, setTop };
  const rest = { upOpacity, navigate };
  return <HomePresenter data={data} page={page} rest={rest} />;
};

export default Home;
