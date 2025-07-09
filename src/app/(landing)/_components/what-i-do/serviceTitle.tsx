"use client";

import { useFeatureStore } from "@/hook/store";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ServiceTitle = ({ children, className }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50% 0% -30% 0%" });

  return (
    <motion.p
      className={cn(isInView ? "text-zinc-50" : "text-zinc-800", className)}
      animate={{
        filter: isInView ? "blur(0px)" : "blur(4px)",

        y: isInView ? 0 : 20,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      ref={ref}
    >
      {children}
    </motion.p>
  );
};

export default ServiceTitle;
