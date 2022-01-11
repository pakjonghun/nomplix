import React, { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { imageUrlMaker } from "../../utilities/utility";
import { imgAni, pagingAni } from "./SliderAnimation";

type SliderPresenterProps = {
  funcs: {
    onExitComplete: () => void;
    onItemClick: (id: number) => void;
    onClickController: (direction: number) => void;
  };
  props: {
    direction: number;
    index: number;
    itemCount: number;
  };
  data: TypeData[];
};

type TypeData = {
  id: number;
  title: string;
  original_title: string;
  backdrop_path: string;
};

const SliderPresenter: FC<SliderPresenterProps> = ({ funcs, props, data }) => {
  return (
    <section className="relative w-full h-fit -top-64 sm:-top-52 lg:-top-32 bg-black">
      <AnimatePresence
        initial={false}
        onExitComplete={funcs.onExitComplete}
        custom={props.direction}
      >
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
          className={`absolute top-0 grid`}
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
                  alt={item.original_title}
                  src={imageUrlMaker(item.backdrop_path, "w500")}
                />

                <motion.div
                  className="absolute -bottom-5 origin-top group-hover:opacity-100  opacity-0 transition-opacity duration-500 delay-250 text-center"
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
      </AnimatePresence>
    </section>
  );
};

export default SliderPresenter;
