import { useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Mic } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import AudioUploader from "@/components/AudioUploader";
import AudioRecorder from "@/components/AudioRecorder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const appRef = useRef<HTMLDivElement>(null);

  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onScrollToApp={scrollToApp} />

      {/* App Section */}
      <section
        ref={appRef}
        className="relative min-h-screen py-20 px-4"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Analyze Your <span className="neon-text">Voice</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload an audio file or record directly from your microphone. Our AI will analyze the emotional content in seconds.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-14 glass-card p-1 mb-8">
                <TabsTrigger
                  value="upload"
                  className="flex items-center gap-2 h-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-cyan/20 data-[state=active]:to-neon-purple/20 data-[state=active]:text-foreground rounded-xl transition-all"
                >
                  <Upload className="w-4 h-4" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger
                  value="record"
                  className="flex items-center gap-2 h-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-cyan/20 data-[state=active]:to-neon-purple/20 data-[state=active]:text-foreground rounded-xl transition-all"
                >
                  <Mic className="w-4 h-4" />
                  Record Audio
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-0">
                <AudioUploader />
              </TabsContent>

              <TabsContent value="record" className="mt-0">
                <AudioRecorder />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Powered by AI • Speech Emotion Recognition
            </p>
          </motion.footer>
        </div>
      </section>
    </div>
  );
};

export default Index;
