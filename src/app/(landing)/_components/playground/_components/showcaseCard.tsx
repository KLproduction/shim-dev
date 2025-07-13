import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

type ShowcaseCardProps = {
  targetRef?: React.RefObject<HTMLDivElement | null>;
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ targetRef }) => {
  // 若沒傳 targetRef 則自己建立一個
  const localRef = useRef<HTMLDivElement>(null);
  const ref = targetRef || localRef;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [-300, 0]);

  const opacity2 = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
  const x2 = useTransform(scrollYProgress, [0, 0.3], [300, 0]);

  const opacity3 = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
  const x3 = useTransform(scrollYProgress, [0, 0.3], [-300, 0]);

  const opacity4 = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
  const y4 = useTransform(scrollYProgress, [0, 0.3], [300, 0]);

  return (
    <motion.div
      ref={ref}
      className="flex h-full w-full items-center justify-center p-3"
    >
      <motion.div className="grid grid-cols-2 gap-5 rounded-2xl p-10 opacity-80">
        <motion.img
          src="/ramenZenContent.PNG"
          alt=""
          className="h-[180px] w-[400px] shadow-xl"
          style={{
            opacity: opacity1,
            y: y1,
          }}
        />
        <motion.img
          src="/EngCityLinkerHead.PNG"
          alt=""
          className="h-[180px] w-[400px] shadow-xl"
          style={{
            opacity: opacity2,
            x: x2,
          }}
        />
        <motion.img
          src="/SaladOnTheRunContent.PNG"
          alt=""
          className="h-[180px] w-[400px] shadow-xl"
          style={{
            opacity: opacity3,
            x: x3,
          }}
        />
        <motion.img
          src="/emberContent.PNG"
          alt=""
          className="h-[180px] w-[400px] shadow-xl"
          style={{
            opacity: opacity4,
            y: y4,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ShowcaseCard;
