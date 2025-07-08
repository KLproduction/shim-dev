"use client";

import { useScrollFullScreen } from "@/hook/useScrollFullScreen";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Playground2 from "./Playground2";

type Props = {};

const Playground3 = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { once: false, margin: "-50% 0% -50% 0%" });
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
  const containerRotate = useTransform(scrollYProgress, [0, 0.2], [-5, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[200vh] w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 h-screen w-full origin-top-right"
        animate={{
          rotate: isInView ? 0 : -10,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* <motion.div
          className="min-h-full min-w-full bg-black"
          // style={{ opacity: containerOpacity, scale: containerScale }}
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
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Playground3;
