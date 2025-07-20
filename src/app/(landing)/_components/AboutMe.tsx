"use client";

import RotateCard from "@/components/global/RotateCard";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

type Props = {};

const AboutMe = (props: Props) => {
  // 技術棧 logo 資訊
  const techStack = [
    { name: "React", src: "/next.svg" },
    { name: "TypeScript", src: "/Typescrip.svg" },
    { name: "TailwindCSS", src: "/Tailwind_CSS_Logo.svg" },
    { name: "Prisma", src: "/prisma-logo.svg" },
    { name: "Supabase", src: "/supabase-logo.svg" },
    { name: "Framer Motion", src: "/framer-motion-logo.svg" },
    { name: "Node.js", src: "/Node.js_logo.svg" },
    { name: "PostgreSQL", src: "/Postgresql_elephant.svg" },
    { name: "Vercel", src: "/vercel.svg" },
    // 你可以根據 public/ 裡的圖檔再補充
  ];
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
    <div>
      <div className="bg-background relative h-[250vh] w-full" ref={sectionRef}>
        <div className="relative h-full w-full">
          <div className="sticky top-0 h-screen w-full">
            <div
              className="h-full w-full overflow-hidden"
              style={{ perspective: 1000 }}
            >
              {/* RIGHT CONTAINER: Tech Stack Grid */}
              <motion.div
                className="absolute top-0 right-0 h-1/2 w-full md:h-full md:w-1/2"
                style={{
                  rotateY: rotateYRight,
                  transformStyle: "preserve-3d",
                  z: zMoveRight,
                  opacity: opacityTextRight,
                }}
              >
                <motion.div
                  className="grid w-full origin-top-left grid-cols-2 gap-6 p-10 md:grid-cols-4 md:p-20"
                  initial={{ rotate: 10, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className="flex flex-col items-center gap-2"
                      initial={{
                        x: -(index * 10 + 100),
                        rotateX: 180,
                        opacity: 0,
                      }}
                      whileInView={{ x: 0, opacity: 1, rotateX: 0 }}
                      transition={{
                        duration: 1 + index * 0.1,
                        ease: "easeInOut",
                        delay: index * 0.1,
                      }}
                    >
                      <img
                        src={tech.src}
                        alt={tech.name}
                        className="h-12 w-12 drop-shadow-xl md:h-16 md:w-16"
                        title={tech.name}
                      />
                      <span className="text-xs text-zinc-400 md:text-sm">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              {/* LEFT CONTAINER: About Me Text */}
              <motion.div
                className="absolute top-1/2 left-0 w-1/2 -translate-y-1/2"
                style={{
                  rotateY: rotateYLeft,
                  transformStyle: "preserve-3d",
                  z: zMoveLeft,
                  opacity: opacityTextleft,
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-2xl md:p-20">
                  <h1 className="font-milker mb-2 text-3xl font-bold text-zinc-900 drop-shadow-lg md:text-5xl lg:text-6xl">
                    About Me
                  </h1>
                  <p className="max-w-xl text-start text-base leading-relaxed text-zinc-700 md:text-lg">
                    {`Hey, I’m a marketing expert with years of hands-on experience—so I don’t just build good-looking websites, I make sure they actually help you hit your business goals and drive profit. I know what works online, and I use that knowledge to create sites that not only look great but also convert.`}
                  </p>
                  <p className="max-w-xl text-start text-base leading-relaxed text-zinc-700 md:text-lg">
                    {`One thing that sets me apart: I care just as much about the admin side as I do about the user side. After years of using admin panels myself, I know how frustrating a clunky backend can be. That’s why I always build sites that are super easy for teams to manage and update—no tech headaches, just smooth operations.`}
                  </p>
                  <p className="max-w-xl text-start text-base leading-relaxed text-zinc-700 md:text-lg">
                    {`In short: I build websites that work hard for your business, front to back.`}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
