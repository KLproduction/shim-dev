import {
  Availability,
  Colors,
  Music,
  ToDo,
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
    Card: ToDo,
    Visual: SaladOnTheRunVisual,
  },
  {
    title: "Salon Shim",
    subTitle: "Hair Salon Booking and Management",
    id: "salon",
    Card: Colors,
    Visual: EmberVisual,
  },
  {
    title: "EngCity Linker",
    subTitle: "Language Learning Platform",
    id: "engcitylinker",
    Card: Availability,
    Visual: EngCityLinkerVisual,
  },
  {
    title: "RamenZen ",
    subTitle: "Japanese Restaurant Promote Page",
    id: "ramenzen",
    Card: Music,
    Visual: RamenZenVisual,
  },
];
