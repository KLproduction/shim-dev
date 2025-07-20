import {
  Availability,
  Colors,
  Music,
  Scheduling,
  Team,
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
    id: "todo-list",
    Card: ToDo,
    Visual: SaladOnTheRunVisual,
  },
  {
    title: "Ember Salon",
    subTitle: "Hair Salon Booking and Management",
    id: "colors",
    Card: Colors,
    Visual: EmberVisual,
  },
  {
    title: "Eng City Linker",
    subTitle: "Language Learning Platform",
    id: "availability",
    Card: Availability,
    Visual: EngCityLinkerVisual,
  },
  {
    title: "Ramen Zen ",
    subTitle: "Japanese Restaurant Promote Page",
    id: "music",
    Card: Music,
    Visual: RamenZenVisual,
  },
];
