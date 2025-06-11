"use client";

import React, { useEffect } from "react";
import ScrollingSection from "./_components/scrollingSection/ScrollingSection";

import WhatIDO from "./_components/what-i-do/WhatIDO";
import ColorChange from "./_components/colorChange/colorChange";
import Hero1 from "./_components/Hero1";
import Intro from "./_components/intro/Intro";
import Playground from "./_components/playground/Playground";
import Playground2 from "./_components/playground/Playground2";
import { useScrollFullScreen } from "@/hook/useScrollFullScreen";
import Playground3 from "./_components/playground/Playground3";
import OffsetPlayground from "./_components/playground/OffsetPlayground";
import Lenis from "lenis";

type Props = {};

const Page = (props: Props) => {
  // useScrollFullScreen();
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
      lenis.destroy(); // Clean up on unmount
    };
  }, []);

  return (
    <main>
      <div>
        <div className="sticky top-0 z-0 h-screen">
          <Hero1 />
        </div>
      </div>
      <Intro />
      {/* <OffsetPlayground /> */}
      <Playground3 />
      {/* <Playground /> */}

      <Playground2 />

      <div className="relative z-10">
        <WhatIDO />
      </div>
      <ColorChange />
      <div className="bg-background relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollingSection />
          <div className="h-screen">more space</div>
        </div>
      </div>
    </main>
  );
};

export default Page;
