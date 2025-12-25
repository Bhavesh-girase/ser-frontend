import { motion } from "framer-motion";

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
  return (
    <div className={`flex items-center justify-center gap-[2px] h-20 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        const delay = i * 0.05;
        const baseHeight = Math.sin((i / barCount) * Math.PI) * 100;
        
        return (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-neon-cyan via-neon-purple to-neon-magenta"
            initial={{ height: 8 }}
            animate={
              isActive
                ? {
                    height: [8, baseHeight * 0.8, 8],
                    opacity: [0.5, 1, 0.5],
                  }
                : {
                    height: [8, baseHeight * 0.3, 8],
                    opacity: [0.3, 0.6, 0.3],
                  }
            }
            transition={{
              duration: isActive ? 0.5 : 2,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
