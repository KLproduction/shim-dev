"use client";

import React, { useEffect, useState, useRef } from "react";
import ScrollingSection from "./_components/scrollingSection/ScrollingSection";
import { motion } from "framer-motion";

import ColorChange from "./_components/colorChange/colorChange";
import Lenis from "lenis";

import ScrollingSectionMobile from "./_components/scrollingSection/ScrollingSectionMobile";
import FeatureTransform from "./_components/FeatureTransform";
import CaptionScroll from "./_components/captionScroll";
import PricingSection from "./_components/PricingSection";
import WhyUs from "./_components/WhyUs";
import DotTransform from "./_components/DotTransform";
import ContactMe from "./_components/Contact/ContactMe";
import ContactSheet from "./_components/Contact/contactSheet";
import LightText from "./light/LightText";
import LightTextCopy from "./light/LightText copy";

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
      <ContactSheet />
      <section id="home">
        {/* <LightText /> */}
        <LightTextCopy />
        <DotTransform />
        <div>
          <FeatureTransform />
        </div>
      </section>
      <CaptionScroll
        caption="SELECTED WORK"
        className="bg-background z-0 h-screen w-full"
        id="work"
      />
      <section id="features" className="bg-background relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollingSection />
          <ScrollingSectionMobile />
        </div>
      </section>
      <div className="h-screen w-full">
        <ColorChange toBackground="bg-[#F6F5F1]" />
      </div>
      <section id="pricing">
        <PricingSection />
      </section>
      <div className="h-screen w-full">
        <ColorChange
          fromBackground="bg-[#F6F5F1]"
          toBackground="bg-background"
        />
      </div>
      <section id="why-us">
        <WhyUs />
      </section>
      <div className="h-screen w-full">
        <ColorChange />
      </div>
      <section id="contact">
        <ContactMe />
      </section>
    </main>
  );
};

export default Page;
