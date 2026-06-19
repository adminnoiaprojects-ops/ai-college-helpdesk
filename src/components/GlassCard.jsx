import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", delay = 0, hoverEffect = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={hoverEffect ? { 
        y: -4, 
        borderColor: "rgba(255, 255, 255, 0.15)",
        backgroundColor: "rgba(255, 255, 255, 0.035)",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)" 
      } : {}}
      className={`glass-panel rounded-2xl p-6 transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
