"use client";

import React, { useEffect, useState, useRef } from "react";
import ScrollingSection from "./_components/scrollingSection/ScrollingSection";
import { motion } from "framer-motion";

import WhatIDO from "./_components/what-i-do/WhatIDO";
import ColorChange from "./_components/colorChange/colorChange";

import Playground2 from "./_components/playground/Playground2";

import Lenis from "lenis";

import LightText from "./light/page";
import DotTransform from "./_components/playground/DotTransform";
import AboutMe from "./_components/AboutMe";
import AboutMeMobile from "./_components/AboutMeMobile";
import ScrollingSectionMobile from "./_components/scrollingSection/ScrollingSectionMobile";

type Props = {};

const Page = (props: Props) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <div>
        <LightText />
        <DotTransform />
      </div>
      <div className="relative z-10">
        <WhatIDO />
        <ColorChange />
      </div>
      {/* <Intro /> */}
      <AboutMe />
      <AboutMeMobile />
      <Playground2 />

      <div className="bg-background relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollingSection />
          <ScrollingSectionMobile />
          <div className="h-screen bg-black">more space</div>
        </div>
      </div>
    </main>
  );
};

export default Page;
