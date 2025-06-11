"use client";

import RotateCard from "@/components/global/RotateCard";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import ShowcaseCard from "../playground/_components/showcaseCard";

type Props = {};

const Intro = (props: Props) => {
  const roles = ["UI/UX DESIGNER", "WEL DEVELOPER", "FULL STACK"];
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rotateYLeft = useTransform(scrollYProgress, [0.1, 0.8], [0, 70]);
  const zMoveLeft = useTransform(scrollYProgress, [0.6, 0.95], [0, 500]);
  const opacityTextleft = useTransform(scrollYProgress, [0.6, 0.95], [1, 0]);

  const rotateYRight = useTransform(scrollYProgress, [0.1, 0.8], [0, -70]);
  const zMoveRight = useTransform(scrollYProgress, [0.6, 0.95], [0, 500]);
  const opacityTextRight = useTransform(scrollYProgress, [0.6, 0.95], [1, 0]);

  return (
    <div className="bg-background relative h-[250vh] w-full" ref={sectionRef}>
      <div className="relative h-full w-full">
        <div className="sticky top-0 h-screen w-full">
          <div
            className="h-full w-full overflow-hidden"
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="pointer-events-none absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
              style={{
                rotateY: rotateYLeft,
                transformStyle: "preserve-3d",
                z: zMoveLeft,
                opacity: opacityTextleft,
              }}
            >
              <motion.div
                className="flex origin-top-left flex-col items-start justify-center gap-3 p-20"
                initial={{ rotate: 45, x: -1000, y: -1000, opacity: 0 }}
                whileInView={{ rotate: 0, x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {roles.map((role, index) => (
                  <motion.div
                    key={index}
                    className={cn("font-milker origin-top-left text-7xl")}
                    initial={{ x: -(index * 10 + 100), opacity: 0 }}
                    whileInView={{ rotate: 0, x: 0, opacity: 1 }}
                    transition={{
                      duration: 1 + index * 0.1,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                  >
                    {role}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute top-0 right-0 h-1/2 w-full md:h-full md:w-1/2"
              style={{
                rotateY: rotateYRight,
                transformStyle: "preserve-3d",
                z: zMoveRight,
                opacity: opacityTextRight,
              }}
            >
              {/* <RotateCard rotateY={0} perspective={1200}>
            </RotateCard> */}
              <ShowcaseCard ref={sectionRef} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
