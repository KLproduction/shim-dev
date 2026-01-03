"use client";

import React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const REASONS = [
  {
    icon: "01",
    title: "Built for early-stage teams",
    body: "Startups and small businesses need to move fast and stay flexible. I focus on shipping usable products quickly, without locking you into rigid structures.",
  },
  {
    icon: "02",
    title: "Clear scope, startup-friendly pricing",
    body: "You will always know what is included before we start. No bloated packages, no surprise add-ons, just what you actually need right now.",
  },
  {
    icon: "03",
    title: "Designed to evolve, not rebuild",
    body: "Even simple sites are structured so they can grow later. When you need login, CMS, or new features, you will not have to start over.",
  },
  {
    icon: "04",
    title: "One builder, end-to-end",
    body: "You work directly with the person designing and building your product. That means faster decisions, fewer misunderstandings, and less overhead.",
  },
  {
    icon: "05",
    title: "Early partner collaboration",
    body: "I work with a small number of teams at a time. You get attention, fast feedback, and someone who treats your project like a real product, not a ticket.",
  },
];

export default function WhyUs() {
  const shouldReduceMotion = useReducedMotion();
  const headingRef = React.useRef<HTMLDivElement | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "end start"],
  });

  const headingScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <section id="why-us" className="relative w-full bg-[#09090B]">
      <div className="mx-auto max-w-[95vw] px-4 py-20 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={containerVariants}
          className="relative text-center"
          ref={headingRef}
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-bold tracking-[0.3em] text-[#DFE104] uppercase"
          >
            Our philosophy
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-6 text-[clamp(3rem,12vw,9rem)] leading-[0.85] font-bold tracking-tighter text-[#FAFAFA] uppercase"
            style={shouldReduceMotion ? undefined : { scale: headingScale }}
          >
            Why choose
            <span className="block text-[#DFE104]">Shim solution</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-3xl text-lg leading-tight font-medium text-[#A1A1AA] md:text-xl lg:text-2xl"
          >
            We build digital products that shine. No bloat, just high-impact
            development for startups ready to scale.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="mt-16 border-y-2 border-[#3F3F46]"
        >
          {REASONS.map((reason) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              className="group grid gap-6 border-b-2 border-[#3F3F46] bg-[#09090B] p-8 transition-colors duration-200 md:grid-cols-[96px_1fr] md:items-start md:p-10"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.02, transition: { duration: 0.2 } }
              }
            >
              <div className="flex items-center justify-center">
                <div className="group-hover:border-accent group-hover:text-accent flex h-14 w-14 items-center justify-center border-2 border-[#3F3F46] text-lg font-bold tracking-tight text-[#FAFAFA] uppercase transition-colors duration-200 md:h-16 md:w-16">
                  {reason.icon}
                </div>
              </div>
              <div>
                <h3 className="group-hover:text-accent text-2xl font-bold tracking-tight text-[#FAFAFA] uppercase transition-colors duration-200 md:text-3xl">
                  {reason.title}
                </h3>
                <p className="group-hover:text-accent/70 mt-3 text-lg leading-tight font-medium text-[#A1A1AA] transition-colors duration-200 md:text-xl">
                  {reason.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
