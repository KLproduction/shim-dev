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

  useEffect(() => {
    if (isInView) {
      setInViewFeature(id);
    } else {
      setInViewFeature(null);
    }
  }, [isInView, id, setInViewFeature]);
  return (
    <div
      className={cn(
        "font-heading feature-title py-16 text-2xl font-bold md:text-5xl",
        isInView ? "text-zinc-800" : "text-zinc-300",
      )}
      ref={ref}
    >
      <div>{children}</div>
    </div>
  );
};

export default FeaturesTitle;
