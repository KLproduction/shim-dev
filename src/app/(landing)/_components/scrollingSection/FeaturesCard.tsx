"use client";

import { useFeatureStore } from "@/hook/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {
  gradient?: string;
  children: React.ReactNode;
} & CardProps;

type CardProps = {
  id: string;
};

export const FeaturesCard = ({ gradient, children, id }: Props) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeatures);
  const setFullScreenFeature = useFeatureStore(
    (state) => state.setFullScreenFeatures,
  );
  const isFullScreenFeature = useFeatureStore(
    (state) => state.fullScreenFeatures,
  );
  return (
    <div
      className={cn(
        `absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br transition-opacity duration-500`,
        gradient,
        inViewFeature === id ? "opacity-100" : "opacity-0",
      )}
    >
      {children}
      <button
        onClick={() => setFullScreenFeature(id)}
        className="show-me-btn absolute right-3 bottom-3 z-50 cursor-pointer rounded-xl bg-zinc-800 px-4 py-2 text-white shadow-2xl"
      >
        Show me
      </button>
    </div>
  );
};
export const ToDo = ({ id }: CardProps) => {
  return (
    <FeaturesCard id={id} gradient="from-[#FFFFFF] to-[#F8B195]">
      <Image
        src="/SaladOnTheRunHead.PNG"
        alt="SaladOnTheRunHead"
        className="object-cover object-center"
        fill
      />
    </FeaturesCard>
  );
};
export const Colors = ({ id }: CardProps) => {
  return (
    <FeaturesCard id={id} gradient="from-[#F8B195] to-[#F67280]">
      <Image
        src="/emberHead.PNG"
        alt="emberHead"
        className="object-cover object-center"
        fill
      />
    </FeaturesCard>
  );
};
export const Availability = ({ id }: CardProps) => {
  return (
    <FeaturesCard id={id} gradient="from-[#ffffff] to-[#fff9e]">
      <Image
        src="/EngCityLinkerHead.PNG"
        alt="EngCityLinkerHead"
        className="rounded-2xl object-cover object-center p-3"
        fill
      />
    </FeaturesCard>
  );
};
export const Music = ({ id }: CardProps) => {
  return (
    <FeaturesCard id={id} gradient="from-[#B7F3D0] to-[#EFF9E]">
      <Image
        src="/ramenZenHead.PNG"
        alt="ramenZenHead"
        className="object-cover object-center"
        fill
      />
    </FeaturesCard>
  );
};
export const Scheduling = ({ id }: CardProps) => {
  return (
    <FeaturesCard id={id} gradient="from-[#s7F3D0] to-[#gFF9E]">
      <span />
    </FeaturesCard>
  );
};
export const Team = ({ id }: CardProps) => {
  return (
    <FeaturesCard id={id} gradient="from-[#f7F3D0] to-[#fFF9E]">
      <span />
    </FeaturesCard>
  );
};
