import { useQueryClient } from "react-query";
import { useEffect } from "react";
import { useState } from "react";
export const usePagnation = (
  init: number,
  totalPage: number,
  key: string,
  api: Function
) => {
  const [curPage, setCurPage] = useState(init);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (curPage < totalPage) setCurPage(curPage + 1);
    queryClient.prefetchQuery([key, curPage + 1], () => api(curPage));
  }, [curPage, totalPage, api, key, queryClient]);

  return { curPage, setCurPage };
};
