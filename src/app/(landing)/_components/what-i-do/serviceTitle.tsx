"use client";

import { useFeatureStore } from "@/hook/store";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  backgroundImgSrc?: string;
};

const ServiceTitle = ({ children, className, backgroundImgSrc }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50% 0% -50% 0%" });

  return (
    <div className="relative inline-block w-full">
      {backgroundImgSrc && (
        <motion.img
          src={backgroundImgSrc}
          alt="background"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isInView ? 1 : 0,
            transition: { duration: 0.7, ease: "easeInOut" },
          }}
          style={{ filter: "blur(8px)" }}
        />
      )}
      <motion.p
        className={cn(
          "relative z-10",
          isInView ? "text-zinc-50" : "text-zinc-800",
          className,
        )}
        animate={{
          filter: isInView ? "blur(0px)" : "blur(4px)",
          y: isInView ? 0 : 20,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        ref={ref}
      >
        {children}
      </motion.p>
    </div>
  );
};

export default ServiceTitle;
