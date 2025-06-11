import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  perspective?: number; // default 1200
  rotateY?: number;
  rotateX?: number;
  rotateZ?: number;
};

const RotateCard = ({
  children,
  perspective = 1200,
  rotateY,
  rotateX,
  rotateZ,
}: Props) => {
  const rotation = {
    ...(rotateX !== undefined ? { rotateX } : {}),
    ...(rotateY !== undefined ? { rotateY } : {}),
    ...(rotateZ !== undefined ? { rotateZ } : {}),
  };

  if (Object.keys(rotation).length === 0) {
    rotation.rotateX = 45;
  }

  return (
    <motion.div className="h-full w-full" style={{ perspective }}>
      <motion.div
        className="flex h-full w-full items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div className="origin-center" style={rotation}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RotateCard;
