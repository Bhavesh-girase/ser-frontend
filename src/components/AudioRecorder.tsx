import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2 } from "lucide-react";
import { sendAudio, sendAudioMock, type EmotionResult } from "@/lib/api";
import EmotionResults from "./EmotionResults";
import AudioWaveform from "./AudioWaveform";

interface AudioRecorderProps {
  onResult?: (result: EmotionResult) => void;
}

export default function AudioRecorder({ onResult }: AudioRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      setResult(null);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm");

        setLoading(true);
        try {
          let res: EmotionResult;
          try {
            res = await sendAudio(file);
          } catch {
            res = await sendAudioMock(file);
          }
          setResult(res);
          onResult?.(res);
        } catch (err) {
          console.error("Error analyzing audio:", err);
        }
        setLoading(false);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  }, [onResult]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Recording Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 flex flex-col items-center justify-center space-y-6"
      >
        {/* Record Button */}
        <div className="relative">
          {/* Pulse Rings */}
          <AnimatePresence>
            {recording && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-destructive/30"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 rounded-full bg-destructive/30"
                />
              </>
            )}
          </AnimatePresence>

          <motion.button
            onClick={recording ? stopRecording : startRecording}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              recording
                ? "bg-destructive shadow-[0_0_40px_hsl(var(--destructive)/0.5)]"
                : "bg-gradient-to-br from-neon-cyan to-neon-purple shadow-[0_0_40px_hsl(var(--neon-cyan)/0.3)] hover:shadow-[0_0_60px_hsl(var(--neon-cyan)/0.5)]"
            }`}
          >
            {recording ? (
              <Square className="w-8 h-8 text-destructive-foreground" />
            ) : (
              <Mic className="w-10 h-10 text-primary-foreground" />
            )}
          </motion.button>
        </div>

        {/* Status Text */}
        <div className="text-center">
          <motion.p
            key={recording ? "recording" : "idle"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-medium text-foreground"
          >
            {recording ? "Recording in progress..." : "Click to start recording"}
          </motion.p>
          <p className="text-sm text-muted-foreground mt-1">
            {recording
              ? "Click the button again to stop"
              : "Speak clearly into your microphone"}
          </p>
        </div>

        {/* Waveform Visualizer */}
        <AnimatePresence>
          {recording && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              className="w-full"
            >
              <AudioWaveform isActive={true} barCount={60} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card p-8 flex flex-col items-center justify-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-10 h-10 text-neon-cyan" />
            </motion.div>
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">Analyzing emotions...</p>
              <p className="text-sm text-muted-foreground">
                AI is processing your recording
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence mode="wait">
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <EmotionResults result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
