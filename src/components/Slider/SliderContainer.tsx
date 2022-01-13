import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeData, TypeMovie } from "../../utilities/types";
import SliderPresenter from "./SliderPresent";

type SliderContainerProps = {
  data: TypeData<TypeMovie>;
  itemCount: number;
  title: string;
};

const SliderContainer: FC<SliderContainerProps> = ({
  data,
  itemCount,
  title,
}) => {
  const [index, setIndex] = useState<null | number>(null);
  const [direction, setDirection] = useState(1);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const localIndex = localStorage.getItem(title);
    switch (typeof localIndex) {
      case "object":
        setIndex(0);
        break;
      case "string":
        if (isNaN(+localIndex)) return;
        setIndex(+localIndex);
        break;
      default:
        break;
    }
  }, [title]);

  const navigate = useNavigate();

  const onExitComplete = () => {
    setIsSliding(false);
  };

  const offset = (index: number | null) => {
    if (index == null) return;
    if (!data) return [];
    return data.results.slice(index * itemCount, (1 + index) * itemCount);
  };

  const onItemClick = (id: number) => {
    navigate(`/movies/${title}/${id}`);
  };

  const onPlusClick = (totalPage: number) => {
    if (!index) return;
    setDirection(1);
    const cur = index === totalPage - 1 ? 0 : index + 1;
    setIndex(cur);
    localStorage.setItem(title, JSON.stringify(cur));
  };

  const onMinusClick = (totalPage: number) => {
    if (!index) return;
    setDirection(-1);
    const cur = !index ? totalPage - 1 : index - 1;
    setIndex(cur);
    localStorage.setItem(title, JSON.stringify(cur));
  };

  const onClickController = (direction: number) => {
    if (isSliding) return;
    if (!data?.results) return;
    if (!data.results.length) return;
    const totalPage = Math.floor(data.results.length / itemCount);
    setIsSliding(true);

    switch (direction) {
      case 1:
        onPlusClick(totalPage);
        break;
      case -1:
        onMinusClick(totalPage);
        break;
      default:
        throw new Error("slider error");
    }
  };

  const Data = offset(index);

  return (
    <>
      {Data == null ? null : (
        <SliderPresenter
          funcs={{ onExitComplete, onItemClick, onClickController }}
          data={Data}
          props={{ index, title, direction, itemCount }}
        />
      )}
    </>
  );
};

export default SliderContainer;
