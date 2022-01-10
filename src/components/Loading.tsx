import React from "react";
import { motion } from "framer-motion";
const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-black">
      <h1 className="mb-10 text-red-500 text-5xl font-extrabold">
        Now Loading...
      </h1>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 360] }}
        transition={{
          ease: "linear",
          duration: 1,
          delay: 0,
          repeat: Infinity,
        }}
        className="w-24 h-24 border-t-red-200 border-r-red-200  border-red-500 border-8 rounded-full"
      ></motion.div>
    </div>
  );
};

export default Loading;
