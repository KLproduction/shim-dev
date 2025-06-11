"use client";

import { Button } from "@/components/ui/button";
import { useFeatureStore } from "@/hook/store";
import { cn } from "@/lib/utils";
import React from "react";

type VisualProps = {
  id: string;
};
type Props = {
  children: React.ReactNode;
} & VisualProps;

const Visual = ({ children, id }: Props) => {
  const isFullScreenFeature = useFeatureStore(
    (state) => state.fullScreenFeatures,
  );
  const setFullScreenFeature = useFeatureStore(
    (state) => state.setFullScreenFeatures,
  );
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-white/75 backdrop-blur-2xl",
        "pointer-events-none opacity-0",
        `visual-${id}`,
      )}
    >
      <div className="relative max-w-6xl px-4">{children}</div>

      <Button
        className={cn(
          "back-to-site-btn absolute bottom-12 left-1/2 z-10 mx-auto w-fit -translate-x-1/2 cursor-pointer bg-zinc-800 text-white shadow-2xl",
        )}
        onClick={() => {
          setFullScreenFeature(null);
        }}
      >
        Back to site
      </Button>
    </div>
  );
};

const SaladOnTheRunVisual = ({ id }: VisualProps) => {
  const isFullScreenFeature = useFeatureStore(
    (state) => state.fullScreenFeatures,
  );
  return (
    <Visual id={id}>
      <img
        src="/SaladOnTheRunContent.PNG"
        alt="SaladOnTheRunContent"
        className={cn("object-cover object-center")}
      />
    </Visual>
  );
};
const EmberVisual = ({ id }: VisualProps) => {
  return (
    <Visual id={id}>
      <img
        src="/emberContent.PNG"
        alt="emberContent"
        className={cn("object-cover object-center")}
      />
    </Visual>
  );
};
const EngCityLinkerVisual = ({ id }: VisualProps) => {
  return (
    <Visual id={id}>
      <img
        src="/EngCityLinkerContent.PNG"
        alt="EngCityLinkerContent"
        className="object-cover object-center"
      />
    </Visual>
  );
};
const RamenZenVisual = ({ id }: VisualProps) => {
  return (
    <Visual id={id}>
      <img
        src="/ramenZenContent.PNG"
        alt="ramenZenContent"
        className="object-cover object-center"
      />
    </Visual>
  );
};
const OtherVisual = ({ id }: VisualProps) => {
  return (
    <Visual id={id}>
      <div className="h-full w-full bg-zinc-900">other</div>
    </Visual>
  );
};

export {
  SaladOnTheRunVisual,
  EmberVisual,
  EngCityLinkerVisual,
  RamenZenVisual,
  OtherVisual,
};
