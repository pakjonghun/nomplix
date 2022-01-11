import React, { FC } from "react";
import { motion } from "framer-motion";

const starAni = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1 },
};

const Stars: FC<{ vote: number }> = ({ vote }) => {
  const num = Math.floor(vote);
  return (
    <div className="flex">
      {[...Array(num)].map((_, idx) => (
        <motion.svg
          key={idx}
          variants={starAni}
          initial="initial"
          animate="animate"
          transition={{
            type: "linear",
            opacity: { delay: 0.3 * idx },
          }}
          className="w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="yellow"
            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
          />
        </motion.svg>
      ))}
      {[...Array(Math.ceil(vote - num))].map((_, idx) => (
        <motion.svg
          key={idx + ""}
          variants={starAni}
          initial="initial"
          animate="animate"
          transition={{
            type: "linear",
            opacity: { delay: 0.3 * num },
          }}
          className="w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="yellow"
            d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z"
          />
        </motion.svg>
      ))}
    </div>
  );
};

export default Stars;
