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
  }, [isInView, id, setInViewFeature]);

  return (
    <div
      className={cn(
        "font-heading feature-title py-16 text-2xl md:text-5xl md:font-bold",
        isInView ? "text-accent" : "text-zinc-300",
      )}
      ref={ref}
    >
      <div>{children}</div>
    </div>
  );
};

export default FeaturesTitle;
