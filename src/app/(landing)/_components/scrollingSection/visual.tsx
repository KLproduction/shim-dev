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
  const isOpen = isFullScreenFeature === id;
  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      setFullScreenFeature(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setFullScreenFeature]);
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-2xl",
        "pointer-events-none opacity-0",
        `visual-${id}`,
      )}
    >
      {/* Close X button */}
      <div className="relative max-w-6xl px-4">
        <>{children}</>
      </div>

      <Button
        className={cn(
          "back-to-site-btn absolute bottom-10 left-1/2 z-10 mx-auto w-fit -translate-x-1/2 cursor-pointer bg-zinc-800 text-white shadow-2xl",
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
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = React.useState(false);
  const [videoSrc, setVideoSrc] = React.useState<string | undefined>(
    "/SaladOnTheRunVideo.mp4",
  );

  React.useEffect(() => {
    if (isFullScreenFeature === id) {
      setShouldPlay(true);
      setVideoSrc("/SaladOnTheRunVideo.mp4");
    } else {
      setShouldPlay(false);
      setVideoSrc(undefined);
    }
  }, [isFullScreenFeature, id]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  }, [shouldPlay]);

  return (
    <Visual id={id}>
      <video
        ref={videoRef}
        key={shouldPlay ? `video-${id}-active` : `video-${id}`}
        src={videoSrc}
        className={cn("h-full w-full object-cover object-center")}
        autoPlay
        loop
        playsInline
        controls
      />
    </Visual>
  );
};
const EmberVisual = ({ id }: VisualProps) => {
  const isFullScreenFeature = useFeatureStore(
    (state) => state.fullScreenFeatures,
  );
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = React.useState(false);
  const [videoSrc, setVideoSrc] = React.useState<string | undefined>(
    "/SalonVideo.mp4",
  );

  React.useEffect(() => {
    if (isFullScreenFeature === id) {
      setShouldPlay(true);
      setVideoSrc("/SalonVideo.mp4");
    } else {
      setShouldPlay(false);
      setVideoSrc(undefined);
    }
  }, [isFullScreenFeature, id]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  }, [shouldPlay]);

  return (
    <Visual id={id}>
      <video
        ref={videoRef}
        key={shouldPlay ? `video-${id}-active` : `video-${id}`}
        src={videoSrc}
        className={cn("h-full w-full object-cover object-center")}
        autoPlay
        loop
        playsInline
        controls
      />
    </Visual>
  );
};
const EngCityLinkerVisual = ({ id }: VisualProps) => {
  const isFullScreenFeature = useFeatureStore(
    (state) => state.fullScreenFeatures,
  );
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = React.useState(false);
  const [videoSrc, setVideoSrc] = React.useState<string | undefined>(
    "/ECLinkerVideo.mp4",
  );

  React.useEffect(() => {
    if (isFullScreenFeature === id) {
      setShouldPlay(true);
      setVideoSrc("/ECLinkerVideo.mp4");
    } else {
      setShouldPlay(false);
      setVideoSrc(undefined);
    }
  }, [isFullScreenFeature, id]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  }, [shouldPlay]);
  return (
    <Visual id={id}>
      <video
        ref={videoRef}
        key={shouldPlay ? `video-${id}-active` : `video-${id}`}
        src={videoSrc}
        className={cn("h-full w-full object-cover object-center")}
        autoPlay
        loop
        playsInline
        controls
      />
    </Visual>
  );
};
const RamenZenVisual = ({ id }: VisualProps) => {
  const isFullScreenFeature = useFeatureStore(
    (state) => state.fullScreenFeatures,
  );
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = React.useState(false);
  const [videoSrc, setVideoSrc] = React.useState<string | undefined>(
    "/remanzenVideo.mp4",
  );

  React.useEffect(() => {
    if (isFullScreenFeature === id) {
      setShouldPlay(true);
      setVideoSrc("/remanzenVideo.mp4");
    } else {
      setShouldPlay(false);
      setVideoSrc(undefined);
    }
  }, [isFullScreenFeature, id]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  }, [shouldPlay]);

  return (
    <Visual id={id}>
      <video
        ref={videoRef}
        key={shouldPlay ? `video-${id}-active` : `video-${id}`}
        src={videoSrc}
        className={cn("h-full w-full object-cover object-center")}
        autoPlay
        loop
        playsInline
        controls
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
