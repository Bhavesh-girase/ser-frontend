import { motion } from "framer-motion";
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

export default function EmotionResults({ result }: EmotionResultsProps) {
  const emoji = emotionEmojis[result.final_emotion.toLowerCase()] || "🎭";
  const confidencePercent = (result.confidence * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 text-center"
      >
        {/* Emoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
          className="text-7xl mb-4"
        >
          {emoji}
        </motion.div>

        {/* Emotion Label */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-display font-bold neon-text capitalize mb-2"
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
          className="mt-4 h-2 rounded-full bg-muted overflow-hidden max-w-xs mx-auto"
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
      <div className="grid gap-6 lg:grid-cols-2">
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
