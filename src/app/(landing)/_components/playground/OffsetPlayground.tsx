import React, { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function OffsetPlayground() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end start"],
  });

  return (
    <div className="relative min-h-[200vh] w-full bg-white">
      <div className="flex flex-col items-center bg-red-200 p-8">
        <div className="fixed top-8 left-0 z-10 w-full px-4">
          <div className="mb-2 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">offset:</label>

            <span className="text-xs text-gray-500">
              e.g. <code>start start, end end</code>
            </span>
          </div>
          <div className="h-3 w-full rounded-xl bg-gray-300">
            <motion.div
              className="h-3 rounded-xl bg-blue-500"
              style={{ scaleX: scrollYProgress, originX: 0 }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-600">
            scrollYProgress:{" "}
            <motion.span>{scrollYProgress.get().toFixed(2)}</motion.span>
          </div>
        </div>
        <div className="h-[80vh]" />
        <div
          ref={ref}
          className="flex h-[60vh] w-full max-w-lg flex-col items-center justify-center rounded-2xl border-4 border-blue-500 bg-white text-2xl font-bold shadow-2xl"
        ></div>
        <div className="h-[150vh]" />
      </div>
    </div>
  );
}
