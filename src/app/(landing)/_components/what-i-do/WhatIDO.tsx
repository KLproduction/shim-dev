"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import ServiceTitle from "./serviceTitle";

type Props = {};

const WhatIDO = (props: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50% 0% -50% 0%" });
  const item = [
    "i PROVIDE",
    "FULL STACK DIGITAL SOLUTION",
    "CREATIVE WEB DESIGN",
    "UI/UX DESIGN",
    "FIGMA TO NEXTJS",
  ];

  return (
    <div className="h-full w-full">
      <div className="pointer-events-none top-0 z-10 h-24 w-full bg-gradient-to-t from-black to-transparent pb-20" />
      <ul className="flex h-full flex-col items-center gap-3 bg-black py-24 text-center">
        {item.map((item, index) => (
          <div key={index}>
            <ServiceTitle className="font-milker text-7xl">{item}</ServiceTitle>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default WhatIDO;
