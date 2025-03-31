import { useRef, useEffect } from "react";
import "../index.css";

const Noise = ({
  patternSize = 5,
  patternScaleX = 1,
  patternScaleY = 1,
  patternAlpha = 15, 
}) => {
  const grainRef = useRef(null);

  useEffect(() => {
    const canvas = grainRef.current;
    const ctx = canvas.getContext("2d");

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext("2d");
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(patternScaleX, patternScaleY);
    };

    const generateStaticNoise = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha; // Adjust transparency
      }
      patternCtx.putImageData(patternData, 0, 0);
      ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();
    generateStaticNoise();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternAlpha]);

  return <canvas className="noise-overlay z-[1000]" ref={grainRef} />;
};

export default Noise;
