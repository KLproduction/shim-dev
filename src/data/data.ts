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
    title: "Use your calendar as a todo list",
    id: "todo-list",
    Card: ToDo,
    Visual: SaladOnTheRunVisual,
  },
  {
    title: "Color your calendar to organize",
    id: "colors",
    Card: Colors,
    Visual: EmberVisual,
  },
  {
    title: "Instantly know if someone is available",
    id: "availability",
    Card: Availability,
    Visual: EngCityLinkerVisual,
  },
  {
    title: "Track what you listened to when",
    id: "music",
    Card: Music,
    Visual: RamenZenVisual,
  },
  {
    title: "Send scheduling links guests love",
    id: "scheduling-links",
    Card: Scheduling,
    Visual: OtherVisual,
  },
  {
    title: "Always know what your team is up to",
    id: "team",
    Card: Team,
    Visual: OtherVisual,
  },
];
