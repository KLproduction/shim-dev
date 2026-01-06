"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import { FC, ReactNode, useRef, useState } from "react";

export default function DotTransform() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHalf, setIsHalf] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const dotY = useTransform(scrollYProgress, [0.35, 0.55], ["0vh", "50vh"], {
    clamp: true,
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => setIsHalf(v >= 0.55));

  const small = "0%";
  const large = "120%";

  // 文字整體出場（你已改到 0.7 -> 1）
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.55, 0.8], [0.96, 1]);

  // blur/y 也對齊 0.7 -> 0.82（你原本仲係 0.32 -> 0.45）
  const textBlur = useTransform(
    scrollYProgress,
    [0.55, 0.8],
    ["blur(18px)", "blur(0px)"],
  );
  const textY = useTransform(scrollYProgress, [0.55, 0.8], ["10px", "0px"]);

  // stroke -> fill 的 fill 進度
  const fillOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  // shimmer 掃光位置（跟 scroll 走）
  const shimmerX = useTransform(scrollYProgress, [0.6, 1], ["-160%", "160%"]);
  const shimmerBgPos = useMotionTemplate`${shimmerX} 50%`;

  const WORDS = ["shimg", "solution"] as const;

  const makeRow = (repeat: number, offset: number) =>
    Array.from(
      { length: repeat },
      (_, i) => WORDS[(i + offset) % WORDS.length],
    );

  const ROWS = [
    makeRow(18, 0),
    makeRow(18, 1),
    makeRow(18, 2),
    makeRow(18, 3),
    makeRow(18, 0),
    makeRow(18, 3),
  ];

  interface WordProps {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
  }

  const IntroWord: FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
      <span className="relative inline-block">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-zinc-900/15 select-none dark:text-white/10"
        >
          {children}
        </span>

        <motion.span
          style={{ opacity }}
          className="text-zinc-900 dark:text-white"
        >
          {children}
        </motion.span>
      </span>
    );
  };

  const splitWords = (text: string): string[] => text.trim().split(/\s+/);
  const PARAGRAPHS: string[] = [
    "Help busy owners who just want something that works by building websites that generate more enquiries and bookings.",
    // "I work in a simple, structured process so you always know what’s next, with clear scope and honest advice from day one.",
    "Get a quick reply within 24 – 48 hours!",
  ];

  const paragraphWords = PARAGRAPHS.map(splitWords);
  const allWords = paragraphWords.flat();

  const introProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1], {
    clamp: true,
  });

  return (
    <section ref={ref} className="relative h-[400vh] w-full">
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
            {/* Introduction */}
            <div
              ref={ref}
              className={[
                "mx-auto w-full max-w-5xl",
                "text-center text-balance",
                "px-5 md:px-8 lg:px-10",
              ].join(" ")}
            >
              {paragraphWords.map((words, pIdx) => {
                const offset = paragraphWords
                  .slice(0, pIdx)
                  .reduce((sum, w) => sum + w.length, 0);

                return (
                  <p
                    key={`para-${pIdx}`}
                    className={[
                      "mx-auto flex flex-wrap justify-center",
                      "gap-x-2 gap-y-2",
                      "leading-[1.15] font-semibold tracking-tight",
                      "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
                      pIdx === 0 ? "mt-0" : "mt-6 md:mt-8",
                    ].join(" ")}
                  >
                    {words.map((word, i) => {
                      const globalIndex = offset + i;
                      const start = globalIndex / allWords.length;
                      const end = start + 1 / allWords.length;

                      return (
                        <IntroWord
                          key={`${pIdx}-${word}-${i}`}
                          progress={introProgress}
                          range={[start, end]}
                        >
                          {word}
                        </IntroWord>
                      );
                    })}
                  </p>
                );
              })}
            </div>
          </motion.div>
        </div>

        {!isHalf && (
          <motion.div
            className="bg-background absolute -top-5 left-1/2 -translate-x-1/2 rounded-full"
            style={{ y: dotY }}
            initial={{ width: 15, height: 15 }}
          />
        )}

        <motion.div
          className="bg-background pointer-events-none absolute inset-0 w-full bg-cover bg-center bg-no-repeat"
          initial={{ clipPath: `circle(${small} at 50% 50vh)` }}
          animate={{
            clipPath: `circle(${isHalf ? large : small} at 50% 50vh)`,
          }}
          transition={{ clipPath: { duration: 1, ease: "easeInOut" } }}
        >
          <div className="bg-background flex h-full w-full items-center justify-center">
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
              <div className="relative w-full overflow-x-hidden">
                <div className="font-milker flex w-max flex-col items-start gap-10 text-[clamp(2rem,10vw,5rem)] leading-[0.85] font-bold tracking-tighter uppercase">
                  {ROWS.map((row, rowIndex) => (
                    <BrandingRow
                      key={rowIndex}
                      row={row}
                      rowIndex={rowIndex}
                      totalRows={ROWS.length}
                      scrollYProgress={scrollYProgress}
                      startAt={0.55}
                      endAt={0.92}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
type BrandingRowProps = {
  row: readonly string[];
  rowIndex: number;
  totalRows: number;
  scrollYProgress: import("framer-motion").MotionValue<number>;
  startAt?: number;
  endAt?: number;
};

function BrandingRow({
  row,
  rowIndex,
  totalRows,
  scrollYProgress,
  startAt = 0.7,
  endAt = 0.92,
}: BrandingRowProps) {
  const span = endAt - startAt;
  const step = span / Math.max(totalRows, 1);

  // 每一行分到自己嘅出場區間
  const rowStart = startAt + rowIndex * step;
  const rowEnd = rowStart + step * 0.85;

  const isFirstRow = rowIndex === 0;

  const opacity = useTransform(
    scrollYProgress,
    isFirstRow ? [0, rowEnd] : [rowStart, rowEnd],
    isFirstRow ? [1, 1] : [0, 1],
  );

  const y = useTransform(
    scrollYProgress,
    isFirstRow ? [0, rowEnd] : [rowStart, rowEnd],
    isFirstRow ? ["0px", "0px"] : ["14px", "0px"],
  );

  const blur = useTransform(
    scrollYProgress,
    isFirstRow ? [0, rowEnd] : [rowStart, rowEnd],
    isFirstRow ? ["blur(0px)", "blur(0px)"] : ["blur(12px)", "blur(0px)"],
  );

  return (
    <motion.div
      className="flex w-max gap-6 whitespace-nowrap"
      style={{ opacity, y, filter: blur }}
    >
      {row.map((word, i) => (
        <span key={`${rowIndex}-${i}`}>{word}</span>
      ))}
    </motion.div>
  );
}
