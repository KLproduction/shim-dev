"use client";

import { useFeatureStore } from "@/hook/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className={cn(
        `absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br transition-opacity duration-500`,
        gradient,
        inViewFeature === id
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      {isMobile ? (
        <div
          onClick={() => setFullScreenFeature(id)}
          style={{ cursor: "pointer", width: "100%", height: "100%" }}
        >
          {children}
        </div>
      ) : (
        <>
          {children}
          <button
            onClick={() => setFullScreenFeature(id)}
            className="show-me-btn absolute right-3 bottom-3 z-50 hidden cursor-pointer rounded-xl border border-zinc-800 bg-zinc-50 px-4 py-2 text-zinc-800 shadow-2xl md:block"
          >
            Show me
          </button>
        </>
      )}{" "}
    </div>
  );
};

export const Salad = ({ id }: CardProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <FeaturesCard id={id} gradient="from-[#FFFFFF] to-[#F8B195]">
      {isMobile ? (
        <Image
          src="/SaladOnTheRunMobileCover.PNG"
          alt="SaladOnTheRunHead"
          className="object-cover object-center"
          fill
        />
      ) : (
        <Image
          src="/SaladOnTheRunHead.PNG"
          alt="SaladOnTheRunHead"
          className="object-cover object-center"
          fill
        />
      )}
    </FeaturesCard>
  );
};
export const Salon = ({ id }: CardProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <FeaturesCard id={id} gradient="from-[#F8B195] to-[#F67280]">
      {isMobile ? (
        <Image
          src="/emberMobileCover.PNG"
          alt="emberHead"
          className="object-cover object-center"
          fill
        />
      ) : (
        <Image
          src="/emberHead.PNG"
          alt="emberHead"
          className="object-cover object-center"
          fill
        />
      )}
    </FeaturesCard>
  );
};
export const English = ({ id }: CardProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <FeaturesCard id={id} gradient="from-[#ffffff] to-[#fff9e]">
      {isMobile ? (
        <Image
          src="/englinkMobileCover.png"
          alt="EngCityLinkerHead"
          className="rounded-2xl object-cover object-center p-3"
          fill
        />
      ) : (
        <Image
          src="/EngCityLinkerHead.PNG"
          alt="EngCityLinkerHead"
          className="rounded-2xl object-cover object-center p-3"
          fill
        />
      )}
    </FeaturesCard>
  );
};
export const Reman = ({ id }: CardProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <FeaturesCard id={id} gradient="from-[#B7F3D0] to-[#EFF9E]">
      {isMobile ? (
        <Image
          src="/remanzenMobileCover.png"
          alt="ramenZenHead"
          className="object-cover object-center"
          fill
        />
      ) : (
        <Image
          src="/ramenZenHead.PNG"
          alt="ramenZenHead"
          className="object-cover object-center"
          fill
        />
      )}
    </FeaturesCard>
  );
};
