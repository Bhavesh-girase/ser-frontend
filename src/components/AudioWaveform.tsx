import { motion } from "framer-motion";
import { useMemo } from "react";

interface AudioWaveformProps {
  isActive?: boolean;
  barCount?: number;
  className?: string;
}

export default function AudioWaveform({ 
  isActive = false, 
  barCount = 40,
  className = "" 
}: AudioWaveformProps) {
  // Generate random offsets for more organic look
  const barData = useMemo(() => {
    return Array.from({ length: barCount }).map((_, i) => ({
      delay: i * 0.03 + Math.random() * 0.02,
      baseHeight: Math.sin((i / barCount) * Math.PI) * 100,
      randomFactor: 0.7 + Math.random() * 0.6,
    }));
  }, [barCount]);

  return (
    <div className={`flex items-center justify-center gap-[1px] sm:gap-[2px] h-16 sm:h-20 md:h-24 ${className}`}>
      {barData.map((bar, i) => {
        const centerDistance = Math.abs(i - barCount / 2) / (barCount / 2);
        const heightMultiplier = 1 - centerDistance * 0.3;
        
        return (
          <motion.div
            key={i}
            className="w-[2px] sm:w-[3px] rounded-full"
            style={{
              background: `linear-gradient(to top, 
                hsl(38, 75%, 55%) 0%, 
                hsl(215, 65%, 55%) 50%, 
                hsl(270, 50%, 60%) 100%)`,
              boxShadow: isActive 
                ? "0 0 8px hsla(38, 75%, 55%, 0.4)" 
                : "0 0 4px hsla(215, 65%, 55%, 0.2)",
            }}
            initial={{ height: 6 }}
            animate={
              isActive
                ? {
                    height: [
                      6, 
                      bar.baseHeight * 0.9 * heightMultiplier * bar.randomFactor, 
                      6
                    ],
                    opacity: [0.5, 1, 0.5],
                  }
                : {
                    height: [
                      6, 
                      bar.baseHeight * 0.35 * heightMultiplier * bar.randomFactor, 
                      10,
                      bar.baseHeight * 0.25 * heightMultiplier,
                      6
                    ],
                    opacity: [0.25, 0.6, 0.35, 0.5, 0.25],
                  }
            }
            transition={{
              duration: isActive ? 0.4 + Math.random() * 0.2 : 2.5 + Math.random() * 1,
              repeat: Infinity,
              delay: bar.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
