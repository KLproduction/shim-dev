"use client";

import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
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

  const services = [
    {
      title: "Provide What You Need",
      img: undefined,
    },
    {
      title: "Branding Webpages",
      img: "/ramenZenHead.PNG",
    },
    {
      title: "Order and Delivery Webapp",
      img: "/SaladOnTheRunContent.PNG",
    },
    {
      title: "Listing and Booking Webapp",
      img: "/EngCityLinkerContent.PNG",
    },
    {
      title: "Servers and Booking Webapp",
      img: "/emberContent.PNG",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50% 0% -30% 0%" });

  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      refs.current.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const inView =
            rect.top < window.innerHeight * 0.5 &&
            rect.bottom > window.innerHeight * 0.5;
          if (inView && !found) {
            setActiveIndex(idx);
            found = true;
          }
        }
      });
      if (!found) setActiveIndex(-1); // 當沒有任何 section in view 時，activeIndex 設為 -1
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-full w-full" ref={ref}>
      {/* Background image that changes according to activeIndex */}
      <div className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-black">
        {activeIndex !== -1 && (
          <div className="sticky top-0 h-screen w-full">
            <div className="flex h-full w-full items-center justify-center">
              <motion.img
                key={activeIndex}
                src={services[activeIndex].img}
                alt="background"
                className="z-0 h-[80%] w-[80%] object-fill object-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}
      </div>
      <ul className="relative z-10 flex h-full flex-col items-center gap-10 bg-transparent py-24 text-center">
        {services.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              refs.current[index] = el;
            }}
            className="flex min-h-[100vh] w-full items-center justify-center p-3"
          >
            <ServiceTitle className="font-milker text-2xl sm:text-6xl md:text-7xl">
              {item.title}
            </ServiceTitle>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default WhatIDO;
