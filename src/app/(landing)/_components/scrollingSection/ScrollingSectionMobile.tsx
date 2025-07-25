"use client";

import { features } from "@/data/data";
import FeaturesTitle from "./FeaturesTitle";
import { stagger, useAnimate } from "framer-motion";
import { useFeatureStore } from "@/hook/store";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";

type Props = {};

const ScrollingSectionMobile = (props: Props) => {
  const [scope, animate] = useAnimate();
  const isFullScreenFeature = useFeatureStore(
    (state) => state.fullScreenFeatures,
  );
  const lastFullScreenFeature = useFeatureStore(
    (state) => state.lastFullScreenFeatures,
  );

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (isFullScreenFeature) {
      animate([
        [
          ".feature-title",
          { opacity: 0, x: "-200px" },
          { duration: 0.3, delay: stagger(0.1) },
        ],
        [
          `.feature-card`,
          { opacity: 0, scale: 0 },
          { duration: 0.3, delay: 0.1, at: "<" },
        ],
        [".show-me-btn", { opacity: 0, x: "-10px", at: "<" }],
        [
          `.visual-${lastFullScreenFeature}`,
          { opacity: 1, scale: 1, pointerEvents: "auto" },
          { at: "<" },
        ],
        [
          ".back-to-site-btn",
          { opacity: 1, y: "0px" },
          { at: "<", delay: 0.2, duration: 0.3 },
        ],
      ]);
    } else {
      animate([
        [".back-to-site-btn", { opacity: 0, y: "300px" }],
        [
          `.visual-${lastFullScreenFeature}`,
          { opacity: 0, scale: 0.7, pointerEvents: "none" },
        ],
        [
          ".feature-title",
          { opacity: 1, x: "0px" },
          { duration: 0.3, delay: stagger(0.1), at: "<" },
        ],
        [
          ".feature-card",
          { opacity: 1, scale: 1 },
          { duration: 0.3, delay: 0.1, at: "<" },
        ],
        [".show-me-btn", { opacity: 1, x: "0px" }],
      ]);
    }
  }, [isFullScreenFeature, animate]);
  return (
    <div className="md:hidden">
      <div ref={scope}>
        {features.map((feature) => (
          <feature.Visual key={feature.id} id={feature.id} />
        ))}

        <div className="bg-background flex w-full items-start gap-20">
          <div className="w-full py-[50vh]">
            <ul>
              {features.map((feature) => (
                <li key={feature.id}>
                  <FeaturesTitle id={feature.id}>
                    <div className="flex flex-col gap-2">
                      <div className="text-sm text-zinc-500">
                        {feature.subTitle}
                      </div>
                      <div className="font-milker">{feature.title}</div>
                    </div>
                  </FeaturesTitle>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticky top-0 flex h-screen w-full items-center">
            <div
              className={cn(
                "feature-card relative aspect-video w-full origin-bottom-left rounded-2xl bg-transparent shadow-2xl",
                isMobile ? "aspect-[9/16]" : "aspect-video",
              )}
            >
              {features.map((feature) => (
                <feature.Card key={feature.id} id={feature.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingSectionMobile;
