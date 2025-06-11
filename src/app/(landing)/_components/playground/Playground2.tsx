"use client";

import { useScrollFullScreen } from "@/hook/useScrollFullScreen";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {};

const Playground2 = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 2. 進度 0 → 1 映射成 0 → 180 度
  const rotateX = useTransform(scrollYProgress, [0.3, 0.8], [0, 180]);

  return (
    <section ref={ref} className="h-[220vh] w-full">
      {/* 3. sticky 住一個 100vh 的容器 */}
      <motion.div
        className="sticky top-0 h-screen w-full"
        style={{ perspective: 1000 }} // 立體視角
      >
        {/* 4. 真正做翻轉的 3D 容器 */}
        <motion.div
          className="relative h-full w-full"
          style={{
            rotateX,
            transformStyle: "preserve-3d",
          }}
        >
          {/* ■ FRONT 面 (紅) */}
          <div
            className="absolute inset-0 flex h-screen w-full items-center justify-center bg-red-500 text-3xl font-bold text-white"
            style={{ backfaceVisibility: "hidden" }}
          >
            FRONT
          </div>

          {/* ■ BACK 面 (藍) */}
          <div
            className="absolute inset-0 flex h-screen w-full items-center justify-center bg-blue-500 text-3xl font-bold text-white"
            style={{
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            BACK
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Playground2;
