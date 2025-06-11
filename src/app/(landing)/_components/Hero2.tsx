"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  delay,
  motion,
  useAnimationControls,
} from "framer-motion";
import React, { useEffect, useState } from "react";

type Props = {};

const Hero2 = (props: Props) => {
  const [showSolution, setShowSolution] = useState(true);

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const word = "SHIM";
  const sideWord = "SOLUTION";

  const controlsArray = sideWord.split("").map(() => useAnimationControls());

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startBlinking = () => {
      let count = 0;

      const blink = () => {
        controlsArray.forEach((controls) => {
          const shouldBlink = Math.random() < 0.4; // 40% 機率閃
          if (shouldBlink) {
            controls.start({
              opacity: [1, 0.2, 1],
              transition: {
                duration: 0.3,
                repeat: 0,
                delay: 0.5,
              },
            });
          }
        });

        count++;
        if (count < Math.floor(Math.random() * 3) + 3) {
          setTimeout(blink, 100); // 閃幾次（每次 120ms）
        } else {
          const nextDelay = Math.floor(Math.random() * 500) + 500;
          timeoutId = setTimeout(startBlinking, nextDelay);
        }
      };

      blink();
    };

    timeoutId = setTimeout(startBlinking, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="h-[100vh] w-full">
      <div className="flex h-full w-full flex-col bg-black">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={showSolution ? "show" : "hidden"}
          className="relative flex h-1/2 w-full items-center justify-center gap-4"
        >
          <motion.div
            className="absolute inset-0 top-1/2 left-1/2 z-20 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl filter md:h-100 md:w-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onAnimationComplete={() => setShowSolution(true)}
          />

          {word.split("").map((char, idx) => (
            <div key={idx} className="z-20">
              <motion.h1
                style={{ transformOrigin: "center bottom" }}
                className="relative scale-y-[300%] text-center text-4xl font-bold sm:text-6xl"
              >
                <span className="font-milker opacity-100">{char}</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 0 }}
                  aria-hidden="true"
                  className="font-milker pointer-events-none absolute bottom-0 left-0 z-10 w-full translate-y-[50%] opacity-90"
                  style={{
                    /* 3D 透視設定 */
                    transform: `
                    perspective(30px)
                    rotateX(40deg)
                    scaleY(-1)
  
                  `,
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
                  }}
                >
                  {char}
                </motion.span>
              </motion.h1>
            </div>
          ))}
        </motion.div>

        <motion.div className="relative flex h-1/2 w-full items-center justify-center">
          {sideWord.split("").map((char, idx) => (
            <motion.h1
              key={idx}
              className={cn(
                "font-milker z-10 text-center text-4xl font-bold text-white drop-shadow-md drop-shadow-zinc-500 sm:text-6xl md:text-8xl lg:text-9xl",
              )}
              animate={showSolution && controlsArray[idx]}
              initial={{ opacity: 0.1 }}
            >
              {char}
            </motion.h1>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero2;
