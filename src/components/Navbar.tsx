"use client";

import Link from "next/link";
import { AuthButtons } from "@/components/AuthButtons";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 40) {
        setHidden(true); // scroll down, hide
      } else {
        setHidden(false); // scroll up, show
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-md"
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="hover:text-primary text-lg font-bold tracking-tight transition-colors"
        >
          Motion Playground
        </Link>
        <Link href="/portflio" className="hover:text-primary transition-colors">
          Portfolio
        </Link>
      </div>
      <AuthButtons />
    </motion.nav>
  );
}
