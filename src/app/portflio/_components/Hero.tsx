"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

type Props = {};

const Hero = (props: Props) => {
  const [showSolution, setShowSolution] = useState(false);
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const letterVariants = {
    hidden: { scaleY: 0 },
    show: {
      scaleY: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const word = "SHIM";

  return (
    <div className="h-[100vh] w-full">
      {/* 小螢幕 flex-col，md 以上 flex-row */}
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* 左半：小螢幕佔滿、md 以上 1/2 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex h-1/2 w-full items-center justify-center gap-4 md:h-full md:w-1/2"
          onAnimationComplete={() => setShowSolution(true)}
        >
          {word.split("").map((char, idx) => (
            <motion.h1
              key={idx}
              variants={letterVariants}
              style={{ transformOrigin: "center bottom" }}
              className="relative scale-y-[300%] text-center text-4xl font-bold sm:text-6xl md:text-8xl lg:text-9xl"
            >
              <span className="opacity-100">{char}</span>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 -z-10 w-full translate-y-[65%] scale-y-[-1] opacity-90"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
                }}
              >
                {char}
              </span>
            </motion.h1>
          ))}
        </motion.div>

        {/* 右半：小螢幕佔滿、md 以上 1/2 */}
        <AnimatePresence>
          {showSolution && (
            <motion.div className="relative flex h-1/2 w-full items-center justify-center md:h-full md:w-1/2">
              <motion.div
                className="absolute inset-0 z-0 bg-black"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{ transformOrigin: "left bottom" }}
              />
              <h1 className="z-10 scale-y-[300%] text-center text-4xl font-bold text-white sm:text-6xl md:text-8xl lg:text-9xl">
                SOLUTION
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;
