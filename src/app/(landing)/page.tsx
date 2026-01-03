"use client";

import React, { useEffect, useState, useRef } from "react";
import ScrollingSection from "./_components/scrollingSection/ScrollingSection";
import { motion } from "framer-motion";

import ColorChange from "./_components/colorChange/colorChange";
import Lenis from "lenis";

import LightText from "./light/page";

import ScrollingSectionMobile from "./_components/scrollingSection/ScrollingSectionMobile";
import FeatureTransform from "./_components/FeatureTransform";
import CaptionScroll from "./_components/captionScroll";
import PricingSection from "./_components/PricingSection";
import WhyUs from "./_components/WhyUs";
import DotTransform from "./_components/DotTransform";

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
        <div>
          <FeatureTransform />
        </div>
      </div>
      <CaptionScroll
        caption="SELECTED WORK"
        className="bg-background h-screen w-full"
      />

      <div className="relative z-10">{/* <WhatIDO /> */}</div>

      <div className="bg-background relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollingSection />
          <ScrollingSectionMobile />
        </div>
      </div>
      <PricingSection />
      <WhyUs />
    </main>
  );
};

export default Page;
