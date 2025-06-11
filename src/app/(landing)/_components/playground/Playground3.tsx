"use client";

import { useScrollFullScreen } from "@/hook/useScrollFullScreen";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {};

const Playground3 = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const imageSources = [
    "/ramenZenHead.PNG",
    "/ramenZenHead.PNG",
    "/ramenZenHead.PNG",
  ];

  const containerOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const containerScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-[200vh] w-full">
      <div className="absolute inset-0 min-h-full w-full bg-white" />
      <div className="sticky top-0 h-screen w-full">
        <motion.div
          className="min-h-full min-w-full bg-black"
          style={{ opacity: containerOpacity, scale: containerScale }}
        >
          <div className="flex h-full w-[70%] flex-col items-center justify-center gap-15">
            {imageSources.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Ramen Zen head ${idx + 1}`}
                loading="lazy"
                className="h-24 w-full object-cover transition-all duration-500 ease-in-out hover:z-10 hover:h-[70%] hover:w-[70%]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Playground3;
