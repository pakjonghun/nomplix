import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { isTemplateTail } from "typescript";

const Search = ({}) => {
  const [params] = useSearchParams();
  const temp = params.get("term");

  return (
    <div className="mt-10 h-screen w-screen flex items-center justify-center">
      Search
    </div>
  );
};

export default Search;
