import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileAudio, X, Loader2 } from "lucide-react";
import { sendAudio, sendAudioMock, type EmotionResult } from "@/lib/api";
import EmotionResults from "./EmotionResults";

interface AudioUploaderProps {
  onResult?: (result: EmotionResult) => void;
}

export default function AudioUploader({ onResult }: AudioUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setLoading(true);
    setResult(null);

    try {
      // Try real API first, fall back to mock
      let res: EmotionResult;
      try {
        res = await sendAudio(selectedFile);
      } catch {
        res = await sendAudioMock(selectedFile);
      }
      setResult(res);
      onResult?.(res);
    } catch (err) {
      console.error("Error analyzing audio:", err);
    }

    setLoading(false);
  }, [onResult]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type.startsWith("audio/")) {
        handleFile(droppedFile);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFile(selectedFile);
      }
    },
    [handleFile]
  );

  const clearFile = useCallback(() => {
    setFile(null);
    setResult(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative glass-card p-8 transition-all duration-300 cursor-pointer group ${
          isDragOver
            ? "border-neon-cyan shadow-[0_0_30px_hsl(var(--neon-cyan)/0.3)]"
            : "hover:border-neon-cyan/50"
        }`}
      >
        <input
          type="file"
          accept="audio/*"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <motion.div
            animate={isDragOver ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            className="p-4 rounded-full bg-muted/50"
          >
            <Upload className="w-8 h-8 text-neon-cyan" />
          </motion.div>

          <div>
            <p className="text-lg font-medium text-foreground mb-1">
              Drop your audio file here
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse • WAV, MP3, WebM supported
            </p>
          </div>
        </div>

        {/* Animated border */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 border-dashed transition-colors duration-300 pointer-events-none ${
            isDragOver ? "border-neon-cyan" : "border-border group-hover:border-neon-cyan/50"
          }`}
        />
      </motion.div>

      {/* Selected File */}
      <AnimatePresence mode="wait">
        {file && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neon-cyan/10">
                <FileAudio className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
                AI is processing your audio
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
