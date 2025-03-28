import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function StaticCard({
  imageSrc,
  altText = "Card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  overlayContent = null,
}) {
  const ref = useRef(null);
  const opacity = useSpring(0);

  return (
    <figure
      ref={ref}
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
    >
      <motion.div
        className="relative"
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />
        {overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2]">{overlayContent}</motion.div>
        )}
      </motion.div>

      {captionText && (
        <motion.figcaption
          className="absolute left-0 top-0 bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3]"
          style={{
            opacity,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
