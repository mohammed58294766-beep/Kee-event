import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 350);
          return 100;
        }
        return prev + 5;
      });
    }, 45);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A211A] text-[#F7F3EA] px-6"
      >
        {/* Subtle background ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#12352B]/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#D4AF6A]/10 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
          {/* Emblem */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mb-6 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full border border-[#D4AF6A]/40 flex items-center justify-center bg-[#12352B]/60 shadow-[0_0_30px_rgba(212,175,106,0.15)]">
              <span className="font-serif text-3xl font-semibold tracking-wider text-[#D4AF6A]">
                K
              </span>
            </div>
            {/* Rotating halo accent */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-1.5 rounded-full border border-[#D4AF6A]/20 border-t-[#D4AF6A] border-r-transparent"
            />
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-1"
          >
            <h1 className="font-serif text-2xl md:text-3xl tracking-[0.2em] font-medium text-[#F7F3EA] uppercase">
              Kee Event & Garden
            </h1>
            <p className="text-[11px] tracking-[0.3em] text-[#D4AF6A] uppercase font-sans font-medium">
              Jos • Plateau State • Nigeria
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs italic font-serif text-[#F7F3EA]/70 mt-3 flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#D4AF6A]" />
            Where moments become memories
            <Sparkles className="w-3 h-3 text-[#D4AF6A]" />
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-[#12352B] rounded-full overflow-hidden mt-8 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <p className="text-[10px] text-[#F7F3EA]/40 uppercase tracking-widest mt-2">
            Loading Experience
          </p>

          {/* Skip button */}
          <button
            id="skip-loading-btn"
            onClick={onComplete}
            className="mt-6 text-[11px] tracking-wider text-[#F7F3EA]/40 hover:text-[#D4AF6A] transition-colors uppercase underline underline-offset-4"
          >
            Enter Now
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
