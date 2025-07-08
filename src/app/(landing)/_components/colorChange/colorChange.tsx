"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {};

const ColorChange = (props: Props) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <section ref={targetRef} className="relative h-screen w-full bg-black">
      <motion.div
        className="bg-background absolute inset-0 h-screen w-full transition-opacity duration-200"
        style={{ opacity }}
      />
    </section>
  );
};

export default ColorChange;
