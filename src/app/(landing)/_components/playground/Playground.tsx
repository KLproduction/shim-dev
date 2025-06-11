"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Playground = () => {
  /* 1. 把 section 設成滾動區間 */
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* 2. 滾動 → 旋轉 + 位移 */
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [-180, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["-50vh", "50vh"]);

  return (
    <section
      ref={sectionRef}
      className="flex h-[200vh] w-full items-center justify-center"
    >
      {/* 加上 perspective 才看得出 3D 效果 */}
      <motion.div style={{ perspective: 1200 }}>
        {/* 3D 容器：transform-style 要 preserve-3d */}
        <motion.div
          style={{ rotateY, transformStyle: "preserve-3d" }}
          className="relative h-[200px] w-[200px]"
        >
          {/* ■ 正面（紅）*/}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-red-500 text-xl font-bold text-white"
            style={{ backfaceVisibility: "hidden" }}
          >
            FRONT
          </motion.div>

          {/* ■ 背面（藍）*/}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-blue-500 text-xl font-bold text-white"
            style={{
              transform: "rotateY(180deg)", // 永遠朝內翻 180°
              backfaceVisibility: "hidden",
            }}
          >
            BACK
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Playground;
