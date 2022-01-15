import React, { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getId, imageUrlMaker } from "../../utilities/utility";
import { imgAni, pagingAni } from "./SliderAnimation";
import { TypeSlider } from "../../utilities/types";
import emptyImg from "../../images/empty.jpeg";

type SliderPresenterProps = {
  funcs: {
    onExitComplete: () => void;
    onItemClick: (id: number) => void;
    onClickController: (direction: number) => void;
  };
  props: {
    direction: number;
    index: number | null;
    itemCount: number;
    title: string;
  };
  data: TypeSlider[];
};

const SliderPresenter: FC<SliderPresenterProps> = ({ funcs, props, data }) => {
  return (
    <AnimatePresence
      initial={false}
      onExitComplete={funcs.onExitComplete}
      custom={props.direction}
    >
      <h3 className="-mb-5 mx-auto">{props.title.toUpperCase()}</h3>
      <motion.div
        key={getId()}
        onClick={() => funcs.onClickController(-1)}
        className="absolute left-0 pl-1 top-1/2 -translate-y-1/2 text-white cursor-pointer text-2xl sm:text-3xl lg:text-4xl font-extrabold z-10 hover:scale-110 active:scale-100 transition-transform duration-200 ease-linear"
      >
        {"〈"}
      </motion.div>
      <motion.div
        style={{
          gridTemplateColumns: [...Array(props.itemCount)]
            .map(() => `1fr`)
            .join(" "),
        }}
        custom={props.direction}
        key={props.index}
        variants={pagingAni}
        initial="init"
        animate="show"
        exit="exit"
        className="absolute top-0 left-0 h-full w-full grid px-6"
      >
        {data.map((item) => {
          return (
            <motion.div
              onClick={() => funcs.onItemClick(item.id)}
              layoutId={item.id + ""}
              variants={imgAni}
              initial="normal"
              whileHover="hover"
              key={item.id}
              transition={{ type: "tween" }}
              className="flex flex-col items-center justify-center first:origin-left last:origin-right group cursor-pointer"
            >
              <img
                alt={item.title}
                src={imageUrlMaker(item.backdrop_path)}
                onError={(event) => (event.currentTarget.src = emptyImg)}
              />

              <motion.div
                className="absolute bottom-2 origin-top group-hover:opacity-100  opacity-0 transition-opacity duration-500 delay-250 text-center"
                initial="normal"
                animate="hover"
              >
                <h4 className="text-xs font-bold">
                  {item.title.length > 10
                    ? item.title.substring(0, 10) + "..."
                    : item.title}
                </h4>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        key={getId()}
        onClick={() => funcs.onClickController(1)}
        className="absolute top-1/2 -translate-y-1/2 right-0 pr-1 text-white cursor-pointer text-2xl sm:text-3xl lg:text-4xl font-extrabold z-10 hover:scale-110 active:scale-100 transition-transform duration-200 ease-linear "
      >
        {"〉"}
      </motion.div>
    </AnimatePresence>
  );
};

export default SliderPresenter;
