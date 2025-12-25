export interface EmotionResult {
  final_emotion: string;
  confidence: number;
  sequence_votes: Record<string, number>;
  timeline: string[];
}

export async function sendAudio(file: File): Promise<EmotionResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:8000/predict", {
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
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];

  return {
    final_emotion: randomEmotion,
    confidence: Math.random() * 0.3 + 0.7,
    sequence_votes: {
      happy: Math.floor(Math.random() * 30),
      sad: Math.floor(Math.random() * 20),
      angry: Math.floor(Math.random() * 15),
      fear: Math.floor(Math.random() * 10),
      surprise: Math.floor(Math.random() * 15),
      neutral: Math.floor(Math.random() * 25),
    },
    timeline: Array.from({ length: 12 }, () =>
      emotions[Math.floor(Math.random() * emotions.length)]
    ),
  };
}
