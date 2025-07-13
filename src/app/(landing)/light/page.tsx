"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import "./light.css";

export default function LightText() {
  // 控制燈光旋轉角度的 state
  const [angle, setAngle] = useState(0.5); // 0.5turn ~ 0.3turn

  // 監聽動畫進度
  const handleUpdate = (latest: any) => {
    if (latest["--rotate"]) {
      // 轉成 0~1 的 turn
      const turn = parseFloat(latest["--rotate"].replace("turn", ""));
      setAngle(turn);
    }
  };

  // 判斷 Designer/Coder 是否被照到
  const isCoderLit = angle <= 0.35;
  const isDesignerLit = angle >= 0.45;

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
          animate={{ "--rotate": ["0.5turn", "0.3turn"] }}
          transition={{
            delay: 0.5,
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="light-gradient absolute inset-0 h-full w-full"
          onUpdate={handleUpdate}
        />
      </motion.div>

      {/* 左右 Designer/Coder */}
      <div className="absolute top-1/2 left-0 z-20 -translate-y-1/2 rotate-90 px-6">
        <motion.span
          initial={{ opacity: 0.2 }}
          animate={{ opacity: isDesignerLit ? 0.2 : 0 }}
          transition={{ duration: 0.5 }}
          className="font-milker text-2xl text-zinc-100 uppercase select-none sm:text-4xl md:text-8xl"
        >
          Designer
        </motion.span>
      </div>
      <div className="absolute top-1/2 right-0 z-20 -translate-y-1/2 -rotate-90 px-6">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isCoderLit ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
          className="font-milker text-2xl text-zinc-100 uppercase select-none sm:text-4xl md:text-8xl"
        >
          Coder
        </motion.span>
      </div>

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
