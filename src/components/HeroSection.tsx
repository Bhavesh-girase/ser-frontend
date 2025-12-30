import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";
import FloatingSphere from "./FloatingSphere";
import AudioWaveform from "./AudioWaveform";

interface HeroSectionProps {
  onScrollToApp?: () => void;
}

export default function HeroSection({ onScrollToApp }: HeroSectionProps) {
  const handleCTAClick = () => {
    if (onScrollToApp) {
      onScrollToApp();
    } else {
      // Scroll to the next section
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
   <section className="relative min-h-fit md:min-h-screen flex flex-col items-center justify-start md:justify-center overflow-hidden pt-6 xs:pt-8 sm:pt-10 md:pt-0 pb-4 sm:pb-2">

      {/* Gradient Overlays - More Subtle */}
      <div className="absolute inset-0 bg-gradient-radial from-premium-blue/8 via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

      {/* 3D Sphere */}
      

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">

        {/* Headline with Enhanced Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-[2rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 sm:mb-6 md:mb-8 leading-[1.15] tracking-tight"
        >
          <span 
            className="inline-block"
            style={{
              background: "linear-gradient(135deg, hsl(38, 75%, 55%) 0%, hsl(215, 65%, 55%) 50%, hsl(270, 50%, 60%) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 20px hsla(38, 75%, 55%, 0.3))",
            }}
          >
            Decode Emotions
          </span>
          <br />
          <span 
            className="text-foreground inline-block"
            style={{
              textShadow: "0 2px 40px hsla(220, 15%, 90%, 0.1)",
            }}
          >
            Through Voice
          </span>
        </motion.h1>

        {/* Subheadline with increased letter spacing */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
          style={{ letterSpacing: "0.02em" }}
        >
          Experience the future of emotion recognition. Our AI analyzes speech patterns 
          to reveal the hidden emotions in every voice.
        </motion.p>

        {/* Waveform */}
        <motion.div
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: 1.3, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mb-2 sm:mb-6 md:mb-8 overflow-hidden"
        >
          <AudioWaveform barCount={40} className="xs:hidden" />
          <AudioWaveform barCount={60} className="hidden xs:flex sm:hidden" />
          <AudioWaveform barCount={80} className="hidden sm:flex md:hidden" />
          <AudioWaveform barCount={100} className="hidden md:flex" />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          onClick={handleCTAClick}
          className="group relative inline-flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg xs:rounded-xl sm:rounded-2xl font-semibold text-xs xs:text-sm sm:text-base md:text-lg overflow-hidden transition-all duration-500"
          style={{
            background: "linear-gradient(135deg, hsl(38, 75%, 55%) 0%, hsl(215, 65%, 55%) 100%)",
            boxShadow: "0 8px 32px hsla(38, 75%, 55%, 0.3), 0 0 0 1px hsla(255, 255%, 255%, 0.1) inset",
          }}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 12px 48px hsla(38, 75%, 55%, 0.4), 0 0 0 1px hsla(255, 255%, 255%, 0.2) inset",
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(90deg, transparent, hsla(255, 255%, 255%, 0.2), transparent)",
              animation: "shimmer 2s infinite",
            }}
          />
          <Mic className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-primary-foreground relative z-10" />
          <span className="text-primary-foreground relative z-10">Analyze Your Voice</span>
        </motion.button>

        {/* Secondary text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-2 sm:mt-4 md:mt-6 text-[10px] xs:text-xs sm:text-sm text-muted-foreground/70"
        >
          No signup required • Free to use
        </motion.p>
      </div>
    </section>
  );
}
