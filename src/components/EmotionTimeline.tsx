import { motion } from "framer-motion";

interface EmotionTimelineProps {
  timeline: string[];
}

const emotionColors: Record<string, string> = {
  happy: "bg-emotion-happy text-black",
  sad: "bg-emotion-sad text-white",
  angry: "bg-emotion-angry text-white",
  fear: "bg-emotion-fear text-white",
  surprise: "bg-emotion-surprise text-black",
  disgust: "bg-emotion-disgust text-white",
  neutral: "bg-emotion-neutral text-white",
};

const emotionBorders: Record<string, string> = {
  happy: "border-emotion-happy shadow-[0_2px_8px_hsl(var(--emotion-happy)/0.3)]",
  sad: "border-emotion-sad shadow-[0_2px_8px_hsl(var(--emotion-sad)/0.3)]",
  angry: "border-emotion-angry shadow-[0_2px_8px_hsl(var(--emotion-angry)/0.3)]",
  fear: "border-emotion-fear shadow-[0_2px_8px_hsl(var(--emotion-fear)/0.3)]",
  surprise: "border-emotion-surprise shadow-[0_2px_8px_hsl(var(--emotion-surprise)/0.3)]",
  disgust: "border-emotion-disgust shadow-[0_2px_8px_hsl(var(--emotion-disgust)/0.3)]",
  neutral: "border-emotion-neutral shadow-[0_2px_8px_hsl(var(--emotion-neutral)/0.3)]",
};

export default function EmotionTimeline({ timeline }: EmotionTimelineProps) {
  return (
    <div className="glass-card p-3 xs:p-4 sm:p-5 md:p-6">
      <h4 className="text-sm xs:text-base sm:text-lg font-semibold text-foreground mb-3 xs:mb-4 sm:mb-5 flex items-center gap-1.5 xs:gap-2">
        <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-premium-blue" />
        Emotion Timeline
      </h4>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

        {/* Timeline Items */}
        <div className="relative flex gap-2 overflow-x-auto pb-4 scrollbar-thin">
          {timeline.map((emotion, index) => {
            const colorClass = emotionColors[emotion.toLowerCase()] || "bg-gray-500 text-white";
            const borderClass = emotionBorders[emotion.toLowerCase()] || "border-gray-500";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                {/* Time Marker */}
                <span className="text-xs text-muted-foreground">{index + 1}s</span>

                {/* Emotion Chip */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium capitalize border-2 ${colorClass} ${borderClass} cursor-default transition-all`}
                >
                  {emotion}
                </motion.div>

                {/* Connector Dot */}
                <div className="w-2 h-2 rounded-full bg-border" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
        <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
          Each segment represents ~1 second of audio
        </p>
      </div>
    </div>
  );
}
