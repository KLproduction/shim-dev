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
      title: "Branding Webpages",
      img: "/ramenZenHead.PNG",
    },
    {
      title: "E-commerce Webapp",
      img: "/SaladOnTheRunContent.PNG",
    },
    {
      title: "Listing Platform",
      img: "/EngCityLinkerContent.PNG",
    },
    {
      title: "Servers and Appointment Booking",
      img: "/emberContent.PNG",
    },
  ];
  const servicesMobile = [
    {
      title: "Branding Webpages",
      img: "/remanzenMobile.png",
    },
    {
      title: "E-commerce Webapp",
      img: "/SaladOnTheRunMobile.PNG",
    },
    {
      title: "Listing Platform",
      img: "/englinkMobile.png",
    },
    {
      title: "Servers and Appointment Booking",
      img: "/emberMobile.PNG",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50% 0% -30% 0%" });

  useEffect(() => {
    const checkOrientation = () => {
      setIsVertical(window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return (
    <div className="relative h-full w-full" ref={ref}>
      {/* Background image that changes according to activeIndex */}
      <div className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-black">
        {activeIndex !== -1 && (
          <div className="sticky top-0 h-screen w-full">
            <div className="flex h-full w-full items-center justify-center">
              <motion.img
                key={activeIndex + (isVertical ? "-vertical" : "-horizontal")}
                src={
                  isVertical
                    ? servicesMobile[activeIndex].img
                    : services[activeIndex].img
                }
                alt="background"
                className="z-0 h-[80%] w-[80%] object-fill object-center"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 0.5, filter: "blur(0px)" }}
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
