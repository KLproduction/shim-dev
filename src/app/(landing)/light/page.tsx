"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import "./light.css";

export default function LightText() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
        className="absolute inset-0 h-full w-full"
      >
        <motion.div
          style={{ "--rotate": "0.15turn" } as React.CSSProperties}
          animate={{
            "--rotate": ["0.5turn", "0.3turn"],
          }}
          transition={{
            delay: 0.5,
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="light-gradient absolute inset-0 h-full w-full"
        />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-5 px-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, filter: "blur(16px)", y: 40 },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 1.2 },
            },
          }}
          className="mt-4 ml-3 w-full text-start text-base font-bold tracking-wider text-zinc-300 md:text-lg"
        >
          Building digital experiences that shine.
        </motion.p>
        <motion.h1
          variants={{
            hidden: { opacity: 0, filter: "blur(16px)", y: 40 },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 1.2 },
            },
          }}
          className="font-milker text-center text-4xl font-bold text-zinc-200 select-none sm:text-6xl md:text-7xl"
        >
          SHIM SOLUTION
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, filter: "blur(16px)", y: 40 },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 1.2 },
            },
          }}
          className="mt-4 w-full text-end text-base font-bold tracking-wider text-zinc-300 md:text-lg"
        >
          UI/UX Design | Web Development | Branding
        </motion.p>
      </motion.div>
    </div>
  );
}
