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
  const blur = useTransform(rotateX, [0, 90, 180], ["0px", "8px", "0px"]);
  const frontOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const backOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  return (
    <section ref={ref} className="h-[220vh] w-full">
      {/* 3. sticky 住一個 100vh 的容器 */}
      <motion.div
        className="font-milker sticky top-0 h-screen w-full overflow-hidden"
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
          <motion.div
            className="absolute inset-0 flex h-screen w-full scale-y-150 items-center justify-center bg-white text-4xl text-black sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              backfaceVisibility: "hidden",
              opacity: frontOpacity,
              filter: blur,
            }}
          >
            YOUR BUSINESS
          </motion.div>

          {/* ■ BACK 面 (藍) */}
          <motion.div
            className="absolute inset-0 flex h-screen w-full scale-y-150 items-center justify-center bg-white text-4xl text-black sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
              opacity: backOpacity,
              filter: blur,
            }}
          >
            MY BUSINESS
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Playground2;
