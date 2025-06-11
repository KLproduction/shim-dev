"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const TransitionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <>
      <AnimatePresence mode="wait">
        <div key={pathname} className="">
          <motion.div
            className="fixed z-[70] h-screen w-screen rounded-b-[100px] bg-black"
            initial={{ height: "140vh" }}
            animate={{ height: "0vh" }}
            exit={{ height: "140vh" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="fixed bottom-0 z-[60] h-screen w-screen rounded-t-[100px] bg-black"
            initial={{ height: "140vh" }}
            animate={{
              height: "0vh",
              transition: { delay: 0.5 },
            }}
          />
          <motion.div
            className="pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-[60] m-auto h-fit w-fit cursor-default text-6xl text-white sm:text-8xl"
            initial={{ opacity: 1 }}
            animate={{
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1>
              {pathname !== "/"
                ? pathname.replace("/", "").toUpperCase()
                : "HOME"}
            </h1>
          </motion.div>

          {/* <motion.div className="absolute top-[6rem] h-[calc(100vh-6rem)] w-screen"> */}
          <motion.div className={""}>{children}</motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default TransitionProvider;
