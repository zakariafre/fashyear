import { motion } from "framer-motion";

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  return (
    <div className={`relative inline-block text-neutral-500 ${className}`} style={{ position: "relative" }}>
      {/* Base text (normal color) */}
      <span>{text}</span>

      {/* Shiny effect (moves left to right and repeats) */}
      <motion.span
        animate={{ backgroundPosition: ["200% 50%", "0% 50%"] }} 
        transition={{ duration: speed, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        className="absolute inset-0 bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default ShinyText;
