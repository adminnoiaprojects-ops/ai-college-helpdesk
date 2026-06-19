import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoiaLogo from "./NoiaLogo";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds loading time
    const intervalTime = 30;
    const increment = (100 / duration) * intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 300); // Small pause at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white selection:bg-transparent"
    >
      {/* Centered Brand Container */}
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        
        {/* Animated Logo Container */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotateY: [0, 180, 360]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <NoiaLogo className="h-20 w-20" animate={false} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-xl font-bold tracking-tight text-white"
        >
          Noia AI <span className="font-light text-neutral-400">Helpdesk</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-2 font-sans text-xs text-neutral-500"
        >
          Initializing intelligent workspace...
        </motion.p>

        {/* Progress bar container */}
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-neutral-900 border border-neutral-950">
          <motion.div
            className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Percentage text */}
        <span className="mt-2.5 font-mono text-[10px] text-neutral-500 tracking-wider">
          {Math.min(100, Math.floor(progress))}%
        </span>
      </div>
    </motion.div>
  );
}
