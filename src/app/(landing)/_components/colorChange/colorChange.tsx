"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  fromBackground?: string;
  toBackground?: string;
};

const ColorChange = ({ fromBackground, toBackground }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const blur = useTransform(
    scrollYProgress,
    [0.9, 1],
    ["blur(12px)", "blur(0px)"],
  );

  return (
    <section
      ref={targetRef}
      className={cn(
        "relative h-screen w-full",
        fromBackground ? fromBackground : "bg-background",
      )}
    >
      <motion.div
        className={cn(
          "absolute inset-0 h-screen w-full transition-opacity duration-200",
          toBackground ? toBackground : "bg-foreground",
        )}
        style={{ opacity, filter: blur }}
      />
    </section>
  );
};

export default ColorChange;
