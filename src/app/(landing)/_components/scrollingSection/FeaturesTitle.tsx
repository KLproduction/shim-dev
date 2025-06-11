"use client";

import { useFeatureStore } from "@/hook/store";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  id: string;
};

const FeaturesTitle = ({ children, id }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50% 0% -50% 0%" });
  const setInViewFeature = useFeatureStore((state) => state.setInViewFeatures);
  const inViewFeature = useFeatureStore((state) => state.inViewFeatures);

  useEffect(() => {
    if (isInView) {
      setInViewFeature(id);
    }
    if (!isInView && inViewFeature === id) {
      setInViewFeature(null);
    }
  }, [isInView, id, setInViewFeature, inViewFeature]);
  return (
    <p
      className={cn(
        "font-heading feature-title py-16 text-5xl font-bold",
        isInView ? "text-zinc-800" : "text-zinc-300",
      )}
      ref={ref}
    >
      {children}
    </p>
  );
};

export default FeaturesTitle;
