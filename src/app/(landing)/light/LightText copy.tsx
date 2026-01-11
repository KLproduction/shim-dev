"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useContactFormStore } from "@/hook/store";
import "./light.css";

export default function LightTextCopy() {
  const [angle, setAngle] = useState(0.5);
  const reduceMotion = useReducedMotion();
  const { openContactForm, setContactFormPreset } = useContactFormStore();

  const handleUpdate = (latest: Record<string, string>) => {
    if (latest["--rotate"]) {
      const turn = parseFloat(latest["--rotate"].replace("turn", ""));
      setAngle(turn);
    }
  };

  const isCoderLit = angle <= 0.4;
  const isDesignerLit = angle >= 0.3;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const captionY = useTransform(
    scrollYProgress,
    [0.5, 1],
    reduceMotion ? [0, 0] : [0, -250],
  );

  const handleScrollTo = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
      event.preventDefault();
      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", targetId);
    },
    [reduceMotion],
  );

  return (
    <div
      className="light-page relative flex min-h-screen w-full flex-col overflow-hidden bg-[#09090B] pt-12 text-[#FAFAFA]"
      ref={sectionRef}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.8 }}
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <motion.div
          style={{ "--rotate": "0.15turn" } as React.CSSProperties}
          animate={
            reduceMotion
              ? { "--rotate": "0.35turn" }
              : { "--rotate": ["0.5turn", "0.3turn"] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  delay: 0.3,
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
          className="light-gradient pointer-events-none absolute inset-0 h-full w-full"
          onUpdate={handleUpdate}
        />
      </motion.div>

      <motion.div
        className="relative z-10 flex w-full flex-col gap-6 px-6 py-16 sm:px-12 lg:px-24 lg:py-24"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {/* Header section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            },
          }}
          className="relative z-20 flex w-full flex-col items-start justify-start gap-3"
        >
          <div className="border-accent hidden items-center gap-3 border-2 bg-white/5 p-1 md:flex">
            <div className="bg-accent h-3 w-3 rounded-full" />
            <span className="text-xs font-bold tracking-widest text-[#A1A1AA] uppercase lg:text-xs">
              AVAILABLE FOR NEW PROJECTS
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <motion.h1
            variants={{
              hidden: { opacity: 0, filter: "blur(16px)", y: 40 },
              show: {
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 1.1 },
              },
            }}
            style={{ y: captionY }}
            className="font-milker flex max-w-4xl flex-col items-start text-[clamp(2rem,12vw,5rem)] leading-[0.8] font-bold tracking-tighter uppercase"
          >
            <span>BUILD</span>
            <span className="text-accent">SMART</span>
            <span>LAUNCH</span>
            <span className="text-accent">FAST</span>
            <span>SCALE WHEN READY</span>
          </motion.h1>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isCoderLit ? 0.2 : 0 }}
            transition={{ duration: 0.3 }}
            className="font-milker text-accent hidden max-w-4xl flex-col items-start text-[clamp(2rem,12vw,4rem)] leading-[0.8] font-bold tracking-tighter uppercase lg:flex lg:text-[clamp(2rem,12vw,6rem)]"
          >
            SHIMG SOLUTION
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isDesignerLit ? 0.2 : 0 }}
            transition={{ duration: 2 }}
            className="font-milker text-accent flex max-w-4xl flex-col items-start text-[clamp(2rem,12vw,4rem)] leading-[0.8] font-bold tracking-tighter uppercase lg:hidden"
          >
            SHIMG SOLUTION
          </motion.span>
        </div>
        {/* Subheading and description */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            },
          }}
          className="max-w-2xl space-y-4"
        >
          <p className="text-base leading-relaxed font-medium text-[#A1A1AA] md:text-2xl">
            UI/UX Design | Web Development | Branding.
          </p>
        </motion.div>
        {/* Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            },
          }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button
            type="button"
            onClick={(event) => handleScrollTo(event, "#features")}
            className="h-auto gap-2 rounded-none border-2 border-[#DFE104] bg-[#DFE104] px-8 py-3 text-xs font-bold tracking-widest text-black uppercase transition-all duration-200 hover:scale-105 active:scale-95 sm:px-10 sm:py-4 sm:text-sm"
          >
            VIEW WORKS
            <span aria-hidden="true">+</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setContactFormPreset(null);
              openContactForm();
            }}
            className="h-auto rounded-none border-2 border-[#3F3F46] bg-transparent px-8 py-3 text-xs font-bold tracking-widest text-[#FAFAFA] uppercase transition-all duration-200 hover:scale-105 hover:bg-[#FAFAFA] hover:text-black active:scale-95 sm:px-10 sm:py-4 sm:text-sm"
          >
            GET IN TOUCH
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
