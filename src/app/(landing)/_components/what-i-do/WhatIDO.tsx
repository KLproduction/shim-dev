"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import ServiceTitle from "./serviceTitle";
import ColorChange from "../colorChange/colorChange";

type Props = {};

const WhatIDO = (props: Props) => {
  const item = [
    "High-Converting Pages",
    "Optimized for SEO",
    "Designed for Mobile",
    "Custom Visuals",
    "Effective User Flows",
    "Built to Scale",
  ];

  return (
    <div className="h-full w-full">
      {/* <div className="pointer-events-none top-0 z-10 h-24 w-full bg-gradient-to-t from-black to-transparent pb-20" /> */}
      <ul className="flex h-full flex-col items-center gap-10 bg-black py-24 text-center">
        {item.map((item, index) => (
          <div key={index} className="p-3">
            <ServiceTitle className="font-milker text-2xl sm:text-6xl md:text-7xl">
              {item}
            </ServiceTitle>
          </div>
        ))}
      </ul>
      <ColorChange />
    </div>
  );
};

export default WhatIDO;
