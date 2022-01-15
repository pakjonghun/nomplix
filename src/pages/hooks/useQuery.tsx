import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { usePagnation } from "../../hooks/usePagenation";
import { movieKeys } from "../../reactQuery/keys";
import { movieApis } from "../../store/apis/apis";
import { TypeData, TypeMovie } from "../../utilities/types";

const usePaging = (init = 1) => {
  const [curPage, setCurPage] = useState(init);
  return { curPage, setCurPage };
};

const usePreFetch = (curPage: number, totalPage?: number) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (totalPage && curPage < totalPage) {
      const next = curPage + 1;
      queryClient.prefetchQuery([movieKeys.playing, next], () =>
        movieApis.nowPlaying(next)
      );
    }
  }, [totalPage, curPage, queryClient]);
};

export const useNowPlayingQuery = () => {
  const { curPage, setCurPage } = usePaging();
  const { data, isLoading } = useQuery<TypeData<TypeMovie>>(
    ["play", curPage],
    () => movieApis.nowPlaying(curPage)
  );

  usePreFetch(curPage, data?.total_pages!);

  return { data, isLoading, setCurPage, curPage };
};

export const useTopRatedQuery = () => {
  const { curPage, setCurPage } = usePaging();
  const { data, isLoading } = useQuery<TypeData<TypeMovie>>(
    ["rated", curPage],
    () => movieApis.topRated(curPage)
  );

  usePreFetch(curPage, data?.total_pages!);

  return { data, isLoading, setCurPage, curPage };
};
