"use client";

import { useContactFormStore } from "@/hook/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const isNavigatingRef = useRef(false);
  const { openContactForm, setContactFormPreset } = useContactFormStore();

  const navLinks = [
    { href: "#home", label: "Home" },

    { href: "#features", label: "Work" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) {
        return;
      }
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

  const handleAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) {
        return;
      }
      event.preventDefault();
      const target = document.querySelector(href);
      if (!target) {
        return;
      }
      isNavigatingRef.current = true;
      setHidden(false);
      target.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", href);
      window.setTimeout(() => {
        isNavigatingRef.current = false;
      }, 500);
    },
    [shouldReduceMotion],
  );

  return (
    <motion.nav
      initial={false}
      animate={{ y: shouldReduceMotion ? "0%" : hidden ? "-100%" : "0%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="sticky top-0 z-50 bg-[#09090B]/50 text-[#FAFAFA] backdrop-blur-md"
      style={{ willChange: "transform" }}
      aria-label="Primary"
    >
      <div className="mx-auto flex w-full max-w-[95vw] items-center justify-between px-2 py-4">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="font-milker text-xl text-[#DFE104] uppercase transition-colors md:text-2xl"
          >
            Shimg-Solution
          </Link>
          <div className="hidden items-center gap-3 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleAnchorClick(event, link.href)}
                className="rounded-none border-2 border-transparent px-4 py-2 text-sm font-bold tracking-tight text-[#FAFAFA] uppercase transition-all duration-200 hover:border-[#DFE104] hover:bg-[#DFE104] hover:text-[#000000]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setContactFormPreset(null);
            openContactForm();
          }}
          className="rounded-none border-2 border-[#DFE104] bg-[#DFE104] px-4 py-2 text-sm font-bold tracking-tight text-[#000000] uppercase transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Contact us
        </button>
      </div>
    </motion.nav>
  );
}
