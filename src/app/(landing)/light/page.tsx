"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import "./light.css";

export default function LightText() {
  const [angle, setAngle] = useState(0.5);

  const handleUpdate = (latest: Record<string, string>) => {
    if (latest["--rotate"]) {
      const turn = parseFloat(latest["--rotate"].replace("turn", ""));
      setAngle(turn);
    }
  };

  const isCoderLit = angle <= 0.35;
  const isDesignerLit = angle >= 0.45;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const captionY = useTransform(scrollYProgress, [0.5, 1], [0, -500]);

  return (
    <div
      className="light-page relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      ref={sectionRef}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <motion.div
          style={{ "--rotate": "0.15turn" } as React.CSSProperties}
          animate={{ "--rotate": ["0.5turn", "0.3turn"] }}
          transition={{
            delay: 0.5,
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="light-gradient pointer-events-none absolute inset-0 h-full w-full"
          onUpdate={handleUpdate}
        />
      </motion.div>

      {/* light up text */}
      <div className="absolute top-1/2 left-0 z-20 -translate-y-1/2 rotate-90 px-6">
        <motion.span
          initial={{ opacity: 0.2 }}
          animate={{ opacity: isDesignerLit ? 0.2 : 0 }}
          transition={{ duration: 0.5 }}
          className="light-text-strong font-milker text-2xl uppercase select-none sm:text-4xl md:text-8xl"
        >
          Web Dev
        </motion.span>
      </div>
      <div className="absolute top-1/2 right-0 z-20 -translate-y-1/2 -rotate-90 px-6">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isCoderLit ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
          className="light-text-strong font-milker text-2xl uppercase select-none sm:text-4xl md:text-8xl"
        >
          Automation
        </motion.span>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-5 px-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, filter: "blur(16px)", y: 40 },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 1.2 },
            },
          }}
          className="light-text-muted mt-4 ml-3 w-full text-start text-base font-bold tracking-wider md:text-lg"
        >
          Building digital experiences that shine.
        </motion.p>
        <motion.h1
          variants={{
            hidden: { opacity: 0, filter: "blur(16px)", y: 40 },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 1.2 },
            },
          }}
          // bind the motion value directly via style to avoid type errors
          style={{ y: captionY }}
          className="font-milker text-center text-4xl font-bold brightness-50 select-none sm:text-6xl md:text-9xl lg:scale-120"
        >
          <div className="relative z-10 flex w-full flex-col items-start justify-start">
            <h1 className="block">SHIM </h1>
            <h1 className="block">SOLUTION</h1>
          </div>
          <div className="text-accent/50 absolute top-0 left-1 flex w-full flex-col items-start justify-start">
            <h1 className="block">SHIM </h1>
            <h1 className="block">SOLUTION</h1>
          </div>
          <div className="text-accent/50 absolute -bottom-1 left-1 flex w-full flex-col items-start justify-start">
            <h1 className="block">SHIM </h1>
            <h1 className="block">SOLUTION</h1>
          </div>
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, filter: "blur(16px)", y: 40 },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 1.2 },
            },
          }}
          className="light-text-muted mt-4 w-full text-end text-base font-bold tracking-wider md:text-lg"
        >
          UI/UX Design | Web Development | Branding
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, filter: "blur(16px)", y: 40 },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 1.2 },
            },
          }}
          className="mt-3 flex w-full flex-col flex-wrap items-center gap-3 sm:flex-row sm:justify-start md:gap-5"
        >
          <Button
            type="button"
            onClick={() => console.log("click")}
            className="border-border bg-accent text-accent-foreground hover:bg-accent/90 h-auto cursor-pointer gap-2 rounded-none border px-7 py-4 text-sm font-bold tracking-[0.16em] uppercase transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(223,225,4,0.35)] md:px-9 md:py-5 md:text-base"
          >
            View selected works
            <span aria-hidden="true">→</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="light-text-strong border-border hover:border-foreground h-auto cursor-pointer rounded-none px-7 py-4 text-sm font-semibold tracking-[0.16em] uppercase transition hover:-translate-y-0.5 hover:bg-transparent hover:shadow-[0_8px_22px_rgba(255,255,255,0.08)] md:px-9 md:py-5 md:text-base"
          >
            Contact me
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
