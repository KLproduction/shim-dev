// app/components/Playground4.tsx
"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";

export default function DotTransform() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHalf, setIsHalf] = useState(false);

  /* 1️⃣ 取得 0→1 的滾動進度 */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* 2️⃣ 小圓點 Y 位移：0vh → 50vh */
  const dotY = useTransform(scrollYProgress, [0, 0.3], ["0vh", "50vh"]);

  /* 3️⃣ 過半觸發黑幕展開 */
  useMotionValueEvent(scrollYProgress, "change", (v) => setIsHalf(v >= 0.3));

  const small = "0%"; // 小圓半徑 ≈ 15–20px
  const large = "120%"; // 足以覆蓋整個視窗對角線

  return (
    <section ref={ref} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 白色背景 */}
        <div className="absolute inset-0 bg-zinc-50"></div>

        {/* 1️⃣ Moving Dot ─ 未過半才顯示 */}
        {!isHalf && (
          <motion.div
            className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-black"
            style={{ y: dotY }}
            initial={{ width: 15, height: 15 }}
          />
        )}

        {/* 2️⃣ Explosion Mask ─ clip-path 從小圓心爆開 */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-black"
          initial={{ clipPath: `circle(${small} at 50% 50vh)` }}
          animate={{
            clipPath: `circle(${isHalf ? large : small} at 50% 50vh)`,
          }}
          transition={{ clipPath: { duration: 0.6, ease: "easeInOut" } }}
        />
      </div>
    </section>
  );
}
