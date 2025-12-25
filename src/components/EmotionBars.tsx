import { motion } from "framer-motion";

interface EmotionBarsProps {
  votes: Record<string, number>;
}

const emotionColors: Record<string, string> = {
  happy: "from-emotion-happy to-yellow-400",
  sad: "from-emotion-sad to-blue-400",
  angry: "from-emotion-angry to-red-400",
  fear: "from-emotion-fear to-purple-400",
  surprise: "from-emotion-surprise to-orange-300",
  disgust: "from-emotion-disgust to-green-400",
  neutral: "from-emotion-neutral to-gray-400",
};

export default function EmotionBars({ votes }: EmotionBarsProps) {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  // Sort by percentage descending
  const sortedEmotions = Object.entries(votes)
    .map(([emotion, count]) => ({
      emotion,
      count,
      percent: total > 0 ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.percent - a.percent);

  return (
    <div className="glass-card p-6">
      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-neon-cyan" />
        Emotion Distribution
      </h4>

      <div className="space-y-4">
        {sortedEmotions.map(({ emotion, percent }, index) => {
          const colorClass = emotionColors[emotion.toLowerCase()] || "from-gray-500 to-gray-400";

          return (
            <motion.div
              key={emotion}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="capitalize text-foreground font-medium">{emotion}</span>
                <span className="text-muted-foreground">{percent.toFixed(1)}%</span>
              </div>

              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
                  style={{
                    boxShadow: percent > 20 ? `0 0 10px hsl(var(--neon-cyan) / 0.3)` : "none",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
