import {
  Salad,
  Salon,
  English,
  Reman,
} from "@/app/(landing)/_components/scrollingSection/FeaturesCard";
import {
  EmberVisual,
  EngCityLinkerVisual,
  OtherVisual,
  RamenZenVisual,
  SaladOnTheRunVisual,
} from "@/app/(landing)/_components/scrollingSection/visual";

export const features = [
  {
    title: "Salad on the Run",
    subTitle: "Food Order and Delivery",
    id: "salad",
    Card: Salad,
    Visual: SaladOnTheRunVisual,
  },
  {
    title: "Salon Shim",
    subTitle: "Hair Salon Booking and Management",
    id: "salon",
    Card: Salon,
    Visual: EmberVisual,
  },
  {
    title: "EngCity Linker",
    subTitle: "Language Learning Platform",
    id: "engcitylinker",
    Card: English,
    Visual: EngCityLinkerVisual,
  },
  {
    title: "RamenZen ",
    subTitle: "Japanese Restaurant Promote Page",
    id: "ramenzen",
    Card: Reman,
    Visual: RamenZenVisual,
  },
];
