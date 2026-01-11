"use client";

import { useContactFormStore } from "@/hook/store";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const isNavigatingRef = useRef(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const { openContactForm, setContactFormPreset } = useContactFormStore();

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "features", label: "Work" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
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

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }
      if (mobileMenuRef.current?.contains(target)) {
        return;
      }
      if (mobileToggleRef.current?.contains(target)) {
        return;
      }
      setMobileOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [mobileOpen]);

  const scrollDurationMs = shouldReduceMotion ? 0 : 500;
  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.18,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        staggerDirection: -1,
      },
    },
    open: {
      height: "50vh",
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.22,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };
  const menuItemVariants = {
    closed: { opacity: 0, y: shouldReduceMotion ? 0 : -6 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      initial={false}
      animate={{ y: shouldReduceMotion ? "0%" : hidden ? "-100%" : "0%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="sticky top-0 z-50 bg-[#09090B]/80 text-[#FAFAFA] backdrop-blur-md"
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
              <ScrollLink
                key={link.id}
                to={link.id}
                smooth={!shouldReduceMotion}
                duration={scrollDurationMs}
                offset={0}
                onClick={() => {
                  isNavigatingRef.current = true;
                  setHidden(false);
                  window.setTimeout(() => {
                    isNavigatingRef.current = false;
                  }, scrollDurationMs + 100);
                }}
                className="cursor-pointer rounded-none border-2 border-transparent px-4 py-2 text-sm font-bold tracking-tight text-[#FAFAFA] uppercase transition-all duration-200 hover:border-[#DFE104] hover:bg-[#DFE104] hover:text-[#000000]"
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>
        </div>
        <button
          type="button"
          ref={mobileToggleRef}
          className="ml-auto rounded-none border-2 border-[#DFE104] px-3 py-2 text-xs font-bold text-[#DFE104] uppercase transition-all duration-200 hover:bg-[#DFE104] hover:text-[#000000] md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          Menu
        </button>
        <button
          type="button"
          onClick={() => {
            setContactFormPreset(null);
            openContactForm();
          }}
          className="hidden rounded-none border-2 border-[#DFE104] bg-[#DFE104] px-4 py-2 text-sm font-bold tracking-tight text-[#000000] uppercase transition-all duration-200 hover:scale-105 active:scale-95 md:inline-flex"
        >
          GET IN TOUCH
        </button>
      </div>
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full right-0 left-0 overflow-hidden bg-[#09090B]/50 backdrop-blur-3xl md:hidden"
            aria-label="Mobile navigation"
            style={{ willChange: "height, opacity" }}
            ref={mobileMenuRef}
          >
            <div className="mx-auto flex h-full w-full max-w-[95vw] flex-col items-end justify-around gap-2 px-2 py-4">
              {navLinks.map((link) => (
                <motion.div key={link.id} variants={menuItemVariants}>
                  <ScrollLink
                    to={link.id}
                    smooth={!shouldReduceMotion}
                    duration={scrollDurationMs}
                    offset={0}
                    onClick={() => {
                      isNavigatingRef.current = true;
                      setHidden(false);
                      setMobileOpen(false);
                      window.setTimeout(() => {
                        isNavigatingRef.current = false;
                      }, scrollDurationMs + 100);
                    }}
                    className="cursor-pointer rounded-none px-4 py-3 text-sm font-bold tracking-tight text-[#FAFAFA] uppercase transition-all duration-200 hover:bg-[#DFE104] hover:text-[#000000]"
                  >
                    {link.label}
                  </ScrollLink>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants}>
                <button
                  type="button"
                  onClick={() => {
                    setContactFormPreset(null);
                    openContactForm();
                    setMobileOpen(false);
                  }}
                  className="rounded-none border-2 border-[#DFE104] bg-[#DFE104] px-4 py-3 text-sm font-bold tracking-tight text-[#000000] uppercase transition-all duration-200 active:scale-95"
                >
                  GET IN TOUCH
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
