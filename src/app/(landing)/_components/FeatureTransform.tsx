"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {};

export default function FeatureTransform(props: Props) {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = React.useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  const redOpacity = useTransform(scrollYProgress, [0, 0.5, 0.6], [1, 0.5, 0]);
  const firstClip = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3, 0.55],
    [
      "circle(0% at 50% 0%)",
      "circle(130% at 50% 0%)",
      "circle(220% at 50% 0%)",
      "circle(0% at 100% 0%)",
    ],
  );

  const secClip = useTransform(
    scrollYProgress,
    [0.25, 0.65, 0.9],
    ["circle(0% at 0% 100%)", "circle(200% at 0% 100%)", "circle(0% at 0% 0%)"],
  );
  const blueOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.3, 0.95],
    [0, 1, 0.5],
  );
  const secBlur = useTransform(scrollYProgress, [0.25, 0.45], [18, 0]);

  // GREEN: center expand
  const thirdClip = useTransform(
    scrollYProgress,
    [0.58, 0.9, 1],
    [
      "circle(0% at 100% 0%)",
      "circle(100% at 50% 0%)",
      "circle(220% at 50% 0%)",
    ],
  );
  const thirdOpacity = useTransform(scrollYProgress, [0.55, 0.78], [0, 1]);
  const thirdBlur = useTransform(scrollYProgress, [0.66, 0.82], [18, 0]);

  return (
    <div
      ref={sectionRef}
      className="text-accent bg-background sticky top-0 min-h-[360vh]"
    >
      {/* Red base */}
      <motion.div
        className="sticky top-0 z-10 flex h-[120vh] transform-gpu flex-col items-center justify-center gap-6 px-6 will-change-[clip-path,filter] md:flex-row"
        style={{
          opacity: redOpacity,
          clipPath: firstClip,
        }}
      >
        <div className="flex w-full justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <h1 className="font-milker text-base sm:text-lg md:text-7xl">
              E-commerce
            </h1>
            <p className="text-foreground w-2/3 text-2xl">
              From product pages to checkout and order management. Secure online
              payments, cart experience, and an admin dashboard to handle orders
              and fulfilment.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:block">
            <div className="bg-accent pointer-events-none absolute -bottom-3 -left-3 z-0 h-1/2 w-1/2" />
            <div className="bg-accent pointer-events-none absolute -top-3 -right-3 z-0 h-1/3 w-1/3" />
          </div>

          <img
            src="/eatdisplay.png"
            alt="Eat display"
            className="relative max-h-[60vh] w-auto max-w-[90vw] object-contain"
          />
          {/* Light shadow */}
          <div className="pointer-events-none absolute top-0 left-1/2 z-20 h-56 w-56 -translate-x-1/2 rounded-full mix-blend-screen blur-3xl [background:radial-gradient(circle_at_center,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.25)_28%,rgba(255,255,255,0.0)_65%)]" />
        </div>
      </motion.div>

      {/* Blue grows out from red center */}
      <motion.div
        className="sticky top-0 z-10 flex h-[120vh] transform-gpu flex-col items-center justify-center gap-6 px-6 will-change-[clip-path,filter] md:flex-row"
        style={{
          clipPath: secClip,
          opacity: blueOpacity,
          filter: secBlur,
        }}
      >
        <div className="flex w-full items-center justify-center sm:order-2">
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <h1 className="font-milker text-base sm:text-lg md:text-7xl">
              Booking <br />
              Platform
            </h1>
            <p className="text-foreground w-2/3 text-2xl">
              A complete booking flow for service businesses. Set availability,
              services, and pricing, then manage appointments in an admin page
              with clear status tracking.
            </p>
          </div>
        </div>
        <div className="relative lg:order-1">
          <div className="hidden lg:block">
            <div className="bg-accent pointer-events-none absolute -right-3 -bottom-3 z-0 h-1/2 w-1/2" />
            <div className="bg-accent pointer-events-none absolute -top-3 -left-3 z-0 h-1/3 w-1/3" />
          </div>

          <img
            src="/salondisplay.png"
            alt="Reman display"
            className="relative z-10 max-h-[60vh] w-auto max-w-[90vw] object-contain"
          />

          {/* Light shadow */}
          <div className="pointer-events-none absolute top-0 left-1/2 z-20 h-56 w-56 -translate-x-1/2 rounded-full mix-blend-screen blur-3xl [background:radial-gradient(circle_at_center,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.25)_28%,rgba(255,255,255,0.0)_65%)]" />
        </div>
      </motion.div>

      {/* Green grows out from blue center */}
      <motion.div
        className="sticky top-0 z-20 flex h-[120vh] transform-gpu flex-col items-center justify-center gap-6 px-6 will-change-[clip-path,filter] md:flex-row"
        style={{
          clipPath: thirdClip,
          opacity: thirdOpacity,
          filter: thirdBlur,
        }}
      >
        <div className="flex w-full flex-col items-center justify-end gap-3">
          <h1 className="font-milker text-base sm:text-lg md:text-7xl">
            Admin / CMS
          </h1>
          <p className="text-foreground w-2/3 text-2xl">
            Built-in admin tools so you can manage your website without touching
            code. Add products, update prices, upload images, and organise
            categories anytime.
          </p>
        </div>
        <div className="relative">
          <div className="hidden lg:block">
            <div className="bg-accent pointer-events-none absolute -bottom-3 -left-3 z-0 h-1/2 w-1/2" />
            <div className="bg-accent pointer-events-none absolute -top-3 -right-3 z-0 h-1/3 w-1/3" />
          </div>
          <img
            src="/ecldisplay.png"
            alt="ECL display"
            className="relative max-h-[60vh] w-auto max-w-[90vw] object-cover"
          />
          {/* Light shadow */}
          <div className="pointer-events-none absolute top-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full mix-blend-screen blur-3xl [background:radial-gradient(circle_at_center,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.25)_28%,rgba(255,255,255,0.0)_65%)]" />
        </div>
      </motion.div>
    </div>
  );
}
