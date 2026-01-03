// CaptionScroll.tsx
"use client";

import React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type CaptionScrollProps = {
  caption: string;
  className?: string;
  id?: string;
  fromScale?: number;
  toScale?: number;
  fromOpacity?: number;
  toOpacity?: number;
};

export default function CaptionScroll({
  caption,
  className,
  id,
  fromScale = 1.4,
  toScale = 0.8,
  fromOpacity = 1,
  toOpacity = 0.5,
}: CaptionScrollProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [fromScale, toScale]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [fromOpacity, toOpacity],
  );

  return (
    <div
      id={id}
      ref={containerRef}
      className={[
        "relative z-50 flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-8 lg:px-12",
        className,
      ].join(" ")}
    >
      <motion.p
        className="w-full max-w-[80vw] text-center text-[clamp(2rem,10vw,9rem)] leading-[0.85] font-bold tracking-tighter [text-wrap:balance] text-[#FAFAFA] uppercase sm:text-[clamp(2.75rem,11vw,9rem)]"
        style={
          shouldReduceMotion
            ? undefined
            : { scale, opacity, transformOrigin: "50% 50%" }
        }
      >
        {caption}
      </motion.p>
    </div>
  );
}
