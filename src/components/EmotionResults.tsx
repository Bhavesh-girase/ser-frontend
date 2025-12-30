import { motion } from "framer-motion";
import { useMemo } from "react";
import type { EmotionResult } from "@/lib/api";
import EmotionBars from "./EmotionBars";
import EmotionTimeline from "./EmotionTimeline";

interface EmotionResultsProps {
  result: EmotionResult;
}

const emotionEmojis: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  fear: "😨",
  surprise: "😲",
  disgust: "🤢",
  neutral: "😐",
};

// Dynamic colors for each emotion glow
const emotionGlowColors: Record<string, string> = {
  happy: "rgba(234, 179, 8, 0.4)",
  sad: "rgba(59, 130, 246, 0.4)",
  angry: "rgba(239, 68, 68, 0.4)",
  fear: "rgba(168, 85, 247, 0.4)",
  surprise: "rgba(249, 115, 22, 0.4)",
  disgust: "rgba(34, 197, 94, 0.4)",
  neutral: "rgba(148, 163, 184, 0.4)",
};

// Animation variants for different emotions
const getEmotionAnimation = (emotion: string) => {
  const lowerEmotion = emotion.toLowerCase();
  
  switch (lowerEmotion) {
    case "happy":
      return {
        animate: {
          scale: [1, 1.15, 1],
          rotate: [0, -5, 5, 0],
        },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };
    case "sad":
      return {
        animate: {
          y: [0, 3, 0],
          scale: [1, 0.95, 1],
        },
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };
    case "angry":
      return {
        animate: {
          scale: [1, 1.1, 1],
          x: [-2, 2, -2, 2, 0],
        },
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        },
      };
    case "fear":
      return {
        animate: {
          scale: [1, 0.9, 1.05, 0.95, 1],
          y: [0, -3, 0],
        },
        transition: {
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };
    case "surprise":
      return {
        animate: {
          scale: [1, 1.25, 1],
          y: [0, -8, 0],
        },
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeOut",
        },
      };
    case "disgust":
      return {
        animate: {
          rotate: [0, -3, 3, 0],
          scale: [1, 0.95, 1],
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };
    default: // neutral
      return {
        animate: {
          scale: [1, 1.02, 1],
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };
  }
};

export default function EmotionResults({ result }: EmotionResultsProps) {
  const emoji = emotionEmojis[result.final_emotion.toLowerCase()] || "🎭";
  const confidencePercent = (result.confidence * 100).toFixed(1);
  const glowColor = emotionGlowColors[result.final_emotion.toLowerCase()] || emotionGlowColors.neutral;
  
  const emotionAnimation = useMemo(() => {
    return getEmotionAnimation(result.final_emotion);
  }, [result.final_emotion]);

  return (
    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-4 xs:p-5 sm:p-6 md:p-8 text-center"
      >
        {/* Dynamic Emoji with Glow */}
        <div className="relative inline-block">
          {/* Glow effect behind emoji */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ backgroundColor: glowColor }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Animated Emoji */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              ...emotionAnimation.animate,
            }}
            transition={{
              scale: { type: "spring", stiffness: 300, damping: 20, delay: 0.2 },
              rotate: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 },
              ...emotionAnimation.transition,
            }}
            className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 sm:mb-4 cursor-default select-none"
            style={{
              filter: `drop-shadow(0 4px 20px ${glowColor})`,
            }}
            whileHover={{ scale: 1.2 }}
          >
            {emoji}
          </motion.div>
        </div>

        {/* Emotion Label */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl font-display font-bold neon-text capitalize mb-2"
        >
          {result.final_emotion}
        </motion.h3>

        {/* Confidence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="text-muted-foreground">Confidence:</span>
          <span className="text-foreground font-semibold">{confidencePercent}%</span>
        </motion.div>

        {/* Confidence Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-3 sm:mt-4 h-1.5 sm:h-2 rounded-full bg-muted overflow-hidden max-w-[200px] sm:max-w-xs mx-auto"
          style={{ originX: 0 }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidencePercent}%` }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="h-full progress-gradient rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Distribution and Timeline */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <EmotionBars votes={result.sequence_votes} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <EmotionTimeline timeline={result.timeline} />
        </motion.div>
      </div>
    </div>
  );
}
