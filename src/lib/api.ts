export interface EmotionResult {
  final_emotion: string;
  confidence: number;
  sequence_votes: Record<string, number>;
  timeline: string[];
}

export async function sendAudio(file: File): Promise<EmotionResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://ser-backend-jv1n.onrender.com", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}

// Mock function for demo purposes when backend is not available
export async function sendAudioMock(file: File): Promise<EmotionResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const emotions = ["happy", "sad", "angry", "fear", "surprise", "neutral"];
  
  // Pick a dominant emotion randomly
  const dominantEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  
  // Generate votes where the dominant emotion has the highest count
  const baseVotes: Record<string, number> = {};
  let totalVotes = 0;
  
  emotions.forEach((emotion) => {
    if (emotion === dominantEmotion) {
      // Dominant emotion gets 35-50% of votes
      baseVotes[emotion] = Math.floor(Math.random() * 20) + 40;
    } else {
      // Other emotions get lower random values
      baseVotes[emotion] = Math.floor(Math.random() * 15) + 2;
    }
    totalVotes += baseVotes[emotion];
  });

  // Calculate confidence based on how dominant the winning emotion is
  const dominantPercentage = baseVotes[dominantEmotion] / totalVotes;
  const confidence = 0.6 + (dominantPercentage * 0.35); // 60-95% confidence

  // Generate timeline that reflects the dominant emotion appearing more often
  const timeline = Array.from({ length: 12 }, () => {
    const rand = Math.random();
    if (rand < 0.5) {
      // 50% chance of dominant emotion
      return dominantEmotion;
    } else {
      // 50% chance of any emotion (including dominant)
      return emotions[Math.floor(Math.random() * emotions.length)];
    }
  });

  return {
    final_emotion: dominantEmotion,
    confidence: Math.min(confidence, 0.95),
    sequence_votes: baseVotes,
    timeline,
  };
}
