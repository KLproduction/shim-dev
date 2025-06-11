"use client";

import { useEffect, useRef } from "react";

export const useScrollFullScreen = () => {
  const snappedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!snappedRef.current && window.scrollY > 0) {
        snappedRef.current = true;
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
        // 也可以改寫成 window.innerHeight * 1.0, *2.0 之類自訂
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};
