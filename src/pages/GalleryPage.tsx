import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GallerySection } from '../components/GallerySection';

export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#0A211A] text-[#F7F3EA] pt-24 sm:pt-28">
      {/* 1. Header Banner */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-[#12352B]">
        <div className="absolute inset-0 z-0 select-none overflow-hidden opacity-25">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
            alt="Kee Event and Garden gallery ambiance"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A211A] via-[#0A211A]/80 to-[#0A211A]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12352B]/80 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.1]"
          >
            Moments Captured <br />
            <span className="text-[#D4AF6A] italic">At Kee Event & Garden</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-base sm:text-xl text-[#F7F3EA]/85 font-sans font-light max-w-2xl mx-auto leading-relaxed"
          >
            Explore our visual gallery featuring garden weddings, banquet receptions, serene outdoor lawns,
            and evening celebrations in Jos.
          </motion.p>
        </div>
      </section>

      {/* 2. Interactive Lightbox Gallery with Filter Tabs */}
      <GallerySection onPlanEvent={() => navigate('/contact')} />

      {/* 3. Bottom Visit CTA */}
      <section className="py-20 bg-[#081b15] border-t border-[#12352B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#F7F3EA] uppercase font-medium">
            Experience the Venue in Real Life
          </h3>
          <p className="mt-3 text-sm sm:text-base text-[#F7F3EA]/75 font-sans font-light max-w-lg mx-auto">
            Photographs capture a glimpse, but walking through the cool lawns and tranquil grounds of Kee
            reveals its true magic.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>SCHEDULE A GUIDED TOUR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
