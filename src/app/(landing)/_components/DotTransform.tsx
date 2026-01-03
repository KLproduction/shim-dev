"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useState } from "react";

export default function DotTransform() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHalf, setIsHalf] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const dotY = useTransform(scrollYProgress, [0, 0.3], ["0vh", "50vh"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIsHalf(v >= 0.3));

  const small = "0%";
  const large = "120%";

  // 文字整體出場（你已改到 0.7 -> 1）
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.82], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.7, 0.82], [0.96, 1]);

  // blur/y 也對齊 0.7 -> 0.82（你原本仲係 0.32 -> 0.45）
  const textBlur = useTransform(
    scrollYProgress,
    [0.7, 0.82],
    ["blur(18px)", "blur(0px)"],
  );
  const textY = useTransform(scrollYProgress, [0.7, 0.82], ["10px", "0px"]);

  // stroke -> fill 的 fill 進度
  const fillOpacity = useTransform(scrollYProgress, [0.74, 0.9], [0, 1]);

  // shimmer 掃光位置（跟 scroll 走）
  const shimmerX = useTransform(scrollYProgress, [0.72, 1], ["-160%", "160%"]);
  const shimmerBgPos = useMotionTemplate`${shimmerX} 50%`;

  return (
    <section ref={ref} className="relative h-[250vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-zinc-50">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            animate={{ opacity: isHalf ? 0 : 1 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 0.2,
              once: false,
            }}
          >
            <h1 className="hidden text-4xl font-bold text-zinc-900 md:block lg:text-7xl">
              Provide What You Need
            </h1>
            <div className="flex flex-col items-start text-4xl font-bold text-zinc-900 md:hidden">
              <h1>Provide</h1>
              <h1>What</h1>
              <h1>You</h1>
              <h1>Need</h1>
            </div>
          </motion.div>
        </div>

        {!isHalf && (
          <motion.div
            className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-black"
            style={{ y: dotY }}
            initial={{ width: 15, height: 15 }}
          />
        )}

        <motion.div
          className="pointer-events-none absolute inset-0 w-full bg-black bg-cover bg-center bg-no-repeat"
          initial={{ clipPath: `circle(${small} at 50% 50vh)` }}
          animate={{
            clipPath: `circle(${isHalf ? large : small} at 50% 50vh)`,
          }}
          transition={{ clipPath: { duration: 1, ease: "easeInOut" } }}
          style={{ backgroundImage: "url(/remantable.png)" }}
        >
          <div className="flex h-full w-full items-center justify-center bg-black/50">
            <motion.div
              className="font-milker flex flex-col gap-12 text-center"
              style={{
                opacity: textOpacity,
                scale: textScale,
                filter: textBlur,
                y: textY,
              }}
            >
              {/* BRANDING */}
              <div className="relative inline-block">
                {/* Outline (stroke) */}
                <span className="block text-4xl tracking-[0.22em] text-transparent uppercase [-webkit-text-stroke:2px_rgba(255,255,255,0.85)] md:text-7xl lg:text-8xl">
                  branding
                </span>

                {/* Fill reveal */}
                <motion.span
                  className="absolute inset-0 block text-4xl tracking-[0.22em] text-white uppercase md:text-7xl lg:text-8xl"
                  style={{ opacity: fillOpacity }}
                >
                  branding
                </motion.span>

                {/* Shimmer overlay (clipped to text) */}
                <motion.span
                  className="absolute inset-0 block bg-clip-text text-4xl tracking-[0.22em] text-transparent uppercase opacity-80 mix-blend-screen md:text-7xl lg:text-8xl"
                  style={{
                    opacity: fillOpacity,
                    backgroundImage:
                      "linear-gradient(110deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 65%)",
                    backgroundSize: "240% 100%",
                    backgroundPosition: shimmerBgPos,
                  }}
                ></motion.span>
              </div>

              <div className="mx-auto h-px w-24 bg-white/70 md:w-28" />

              {/* OPERATION */}
              <div className="relative inline-block">
                {/* Outline (stroke) */}
                <span className="block text-4xl tracking-[0.28em] text-transparent uppercase [-webkit-text-stroke:2px_rgba(255,255,255,0.75)] md:text-7xl">
                  operation
                </span>

                {/* Fill reveal */}
                <motion.span
                  className="absolute inset-0 block text-4xl tracking-[0.28em] text-white/95 uppercase md:text-7xl"
                  style={{ opacity: fillOpacity }}
                >
                  operation
                </motion.span>

                {/* Shimmer overlay */}
                <motion.span
                  className="absolute inset-0 block bg-clip-text text-4xl tracking-[0.28em] text-transparent uppercase opacity-70 mix-blend-screen md:text-7xl"
                  style={{
                    opacity: fillOpacity,
                    backgroundImage:
                      "linear-gradient(110deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 65%)",
                    backgroundSize: "240% 100%",
                    backgroundPosition: shimmerBgPos,
                  }}
                >
                  operation
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
