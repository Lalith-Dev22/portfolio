import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CodeLoaderProps {
  onComplete: () => void;
}

export const CodeLoader = ({ onComplete }: CodeLoaderProps) => {
  const [show, setShow] = useState(true);
  const letters = "BOOTING DEV CORE...".split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 3500); // Loader duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0d0d] text-white overflow-hidden"
    >
      {/* Coder Cube Spinner */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <motion.div
          animate={{
            rotateY: 360,
            rotateX: 360,
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full bg-gradient-to-br from-pink-600 via-cyan-500 to-pink-600 rounded-[15%] flex items-center justify-center text-black text-5xl font-black shadow-[0_0_60px_#ec4899] blur-[0.3px]"
        >
          <div className="relative">
            <span className="absolute text-4xl text-pink-400 blur-[0.5px]">{"</>"}</span>
            <span className="absolute text-2xl text-cyan-300 top-4 left-4 blur-[0.5px]">{"{}"}</span>
            <span className="absolute text-xl text-green-400 -top-2 right-4 blur-[0.5px]">{"/* */"}</span>
          </div>
        </motion.div>
      </div>

      {/* Typing Letters */}
      <div className="flex mt-6 space-x-[2px] text-pink-400 font-mono text-lg sm:text-xl tracking-widest">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Matrix-style Code Rain */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 text-[10px] text-green-400 font-mono"
            style={{ left: `${i * 4}%`, writingMode: 'vertical-lr' }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 5 + 4,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            {"1011010_0x</>_".repeat(12)}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
