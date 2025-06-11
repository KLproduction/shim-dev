"use client";

import { useScrollFullScreen } from "@/hook/useScrollFullScreen";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  delay,
  motion,
  useAnimationControls,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const Hero1 = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

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

  useScrollFullScreen();

  return (
    <motion.div className="h-[100vh] w-full" ref={sectionRef}>
      <motion.div className="flex h-full w-full flex-col md:flex-row">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={showSolution ? "show" : "hidden"}
          className="relative z-30 flex h-1/2 w-full items-center justify-center gap-4 md:h-full md:w-1/2"
        >
          {word.split("").map((char, idx) => (
            <div key={idx} className="text-black">
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
                  className="font-milker pointer-events-none absolute bottom-0 left-0 w-full translate-y-[50%] opacity-90"
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

        <motion.div className="relative flex h-1/2 w-full items-center justify-center md:h-full md:w-1/2">
          {sideWord.split("").map((char, idx) => (
            <motion.h1
              key={idx}
              className={cn(
                "font-milker z-40 text-center text-4xl font-bold text-white drop-shadow-md drop-shadow-zinc-500 sm:text-6xl md:text-8xl lg:text-9xl",
              )}
              animate={showSolution && controlsArray[idx]}
              initial={{ opacity: 0.1 }}
            >
              {char}
            </motion.h1>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute top-0 right-0 h-full w-full overflow-hidden">
        <motion.div className="absolute bottom-0 left-0 z-20 h-[120vh] w-1/2 origin-bottom-right bg-black" />
        <motion.div
          className="absolute right-1/2 bottom-0 z-30 h-[120vh] w-[200%] origin-bottom-right -translate-x-1 bg-black"
          initial={{ rotate: 0 }}
          animate={{ rotate: 90 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          onAnimationComplete={() => setShowLeft(true)}
        />
        <motion.div
          className="absolute top-0 left-1/2 z-20 h-[120vh] w-[200%] origin-bottom-left bg-white"
          initial={{ rotate: 0 }}
          animate={showLeft && { rotate: -90 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          onAnimationComplete={() => setShowSolution(true)}
        />
      </div>
    </motion.div>
  );
};

export default Hero1;
