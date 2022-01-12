import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeData, TypeMovie } from "../../utilities/types";
import SliderPresenter from "./SliderPresent";

type SliderContainerProps = {
  data: TypeData<TypeMovie>;
  itemCount: number;
};

const SliderContainer: FC<SliderContainerProps> = ({ data, itemCount }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSliding, setIsSliding] = useState(false);

  const navigate = useNavigate();

  const onExitComplete = () => {
    setIsSliding(false);
  };

  const offset = (index: number) => {
    if (!data) return [];
    return data.results.slice(index * itemCount, (1 + index) * itemCount);
  };

  const onItemClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  const onPlusClick = (totalPage: number) => {
    setDirection(1);
    setIndex(index === totalPage ? 0 : index + 1);
  };

  const onMinusClick = (totalPage: number) => {
    setDirection(-1);
    setIndex(!index ? totalPage : index - 1);
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

  return (
    <SliderPresenter
      funcs={{ onExitComplete, onItemClick, onClickController }}
      data={offset(index)}
      props={{ index, direction, itemCount }}
    />
  );
};

export default SliderContainer;
