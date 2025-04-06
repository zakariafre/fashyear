import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalScrollBlur() {
  const { scrollYProgress } = useScroll();
  const blurAmount = useTransform(scrollYProgress, [0, 0.8], ["20px", "0px"]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{
        backdropFilter: `blur(${blurAmount})`,
        WebkitBackdropFilter: `blur(${blurAmount})`, // for Safari support
      }}
    />
  );
}
