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
    appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <HeroSection onScrollToApp={scrollToApp} />

      {/* App Section */}
      <section
        ref={appRef}
        className="relative mt-0 pt-10 xs:pt-12 sm:pt-14 md:pt-16 pb-10 xs:pb-12 sm:pb-14 md:pb-16 px-3 xs:px-4 sm:px-5 md:px-6 scroll-mt-28"
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-14"
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 xs:mb-4 sm:mb-5 tracking-tight">
              Analyze Your <span className="neon-text">Voice</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed px-2">
              Upload an audio file or record directly from your microphone. Our AI will analyze the emotional content in seconds.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-10 xs:h-11 sm:h-12 md:h-14 glass-card p-0.5 xs:p-1 sm:p-1.5 mb-4 xs:mb-5 sm:mb-6 md:mb-8">
                <TabsTrigger
                  value="upload"
                  className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 h-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-premium-gold/15 data-[state=active]:to-premium-blue/15 data-[state=active]:text-foreground rounded-md xs:rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-[10px] xs:text-xs sm:text-sm md:text-base"
                >
                  <Upload className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger
                  value="record"
                  className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 h-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-premium-gold/15 data-[state=active]:to-premium-blue/15 data-[state=active]:text-foreground rounded-md xs:rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-[10px] xs:text-xs sm:text-sm md:text-base"
                >
                  <Mic className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
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

          {/* Premium Divider */}
          <div className="premium-divider my-6 xs:my-8 sm:my-10 md:my-14" />

          {/* Footer */}
          <motion.footer
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="py-3 xs:py-4 sm:py-6 md:py-8 text-center"
>
  <div className="flex items-center justify-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity duration-300">
    <span>Made with</span>
    <motion.span
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="text-red-500"
    >
      ❤️
    </motion.span>
    <span>by</span>
    <a 
      href="https://www.linkedin.com/in/bhavesh-girase-a1a975340/" 
      className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold hover:underline"
    >
      Bhavesh
    </a>
  </div>
</motion.footer>
        </div>
      </section>
    </div>
  );
};

export default Index;
