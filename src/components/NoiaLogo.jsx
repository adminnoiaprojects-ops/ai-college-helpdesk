import { motion } from "framer-motion";

export default function NoiaLogo({ className = "h-8 w-8", animate = true }) {
  const logoVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 rounded-full bg-white/10 blur-[6px] pointer-events-none" />
      
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        {/* Left Vertical Pillar */}
        <motion.path
          d="M25 80V20L45 50"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? "hidden" : "visible"}
          animate="visible"
          variants={logoVariants}
        />
        {/* Right Vertical Pillar and Diagonal */}
        <motion.path
          d="M75 20V80L55 50"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? "hidden" : "visible"}
          animate="visible"
          variants={logoVariants}
        />
        {/* Center Interlocking Spark Link */}
        <motion.path
          d="M45 50L55 50"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={animate ? "hidden" : "visible"}
          animate="visible"
          variants={logoVariants}
          transition={{ delay: 0.5 }}
        />
      </svg>
    </div>
  );
}
