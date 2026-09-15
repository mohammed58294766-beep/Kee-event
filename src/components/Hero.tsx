import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/venueData';
import { useContent } from '../context/ContentContext';
import { EditorialMedia } from './EditorialMedia';

interface HeroProps {
  onPlanEvent: () => void;
  onExploreVenue: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlanEvent, onExploreVenue }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { content } = useContent();
  const homepage = content.homepage || {};
  const slides = (homepage.heroSlides && homepage.heroSlides.length > 0)
    ? homepage.heroSlides
    : (homepage.slides && homepage.slides.length > 0 ? homepage.slides : HERO_SLIDES);

  const heroBadge = homepage.heroTagline || homepage.heroBadge || 'Jos, Plateau State • Premier Event Destination';
  const heroTitle = homepage.heroHeadline || homepage.heroTitle || 'Where Moments Become Memories.';
  const heroSubtitle = homepage.heroSupportingText || homepage.heroSubtitle || 'A beautiful setting for weddings, celebrations, corporate gatherings and unforgettable occasions in Jos.';
  const ctaPrimaryText = homepage.primaryCtaText || homepage.ctaPrimaryText || 'PLAN YOUR EVENT';
  const ctaSecondaryText = homepage.secondaryCtaText || homepage.ctaSecondaryText || 'EXPLORE THE VENUE';

  // Automatic carousel transition
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0A211A]"
    >
      {/* Background Carousel Images - Images crossfade without affecting text */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        {slides.map((slide: any, index: number) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <EditorialMedia
                mediaType={slide.mediaType || (slide.video ? 'video' : 'image')}
                image={slide.image}
                video={slide.video}
                alt={slide.alt || slide.title || 'Kee Event and Garden'}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[8000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
                autoPlay={isActive}
                muted
                loop
                playsInline
              />
            </div>
          );
        })}

        {/* Luxury Dark Vignette Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0A211A] via-[#0A211A]/55 to-[#0A211A]/70" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A211A]/40 to-[#0A211A]/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12352B]/80 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{heroBadge}</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.08] max-w-4xl"
        >
          {heroTitle.includes('Memories') ? (
            <>
              {heroTitle.replace(/Memories\.?/i, '')} <br className="hidden sm:inline" />
              <span className="italic font-light text-[#D4AF6A]">Memories.</span>
            </>
          ) : (
            heroTitle
          )}
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#F7F3EA]/85 font-sans font-light max-w-2xl leading-relaxed"
        >
          {heroSubtitle}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <button
            id="hero-plan-event-btn"
            onClick={onPlanEvent}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-[0_8px_24px_rgba(212,175,106,0.3)] flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>{ctaPrimaryText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            id="hero-explore-venue-btn"
            onClick={onExploreVenue}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#12352B]/80 hover:bg-[#12352B] border border-[#D4AF6A]/40 hover:border-[#D4AF6A] text-[#F7F3EA] text-xs sm:text-sm font-medium tracking-[0.16em] uppercase backdrop-blur-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{ctaSecondaryText}</span>
          </button>
        </motion.div>

        {/* Carousel Indicators */}
        <div
          className="mt-12 flex items-center gap-3 z-30"
          role="tablist"
          aria-label="Hero Slide Indicators"
        >
          {slides.map((slide: any, idx: number) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id || idx}
                id={`hero-slide-dot-${idx}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Switch to slide ${idx + 1}: ${slide.title || 'Slide'}`}
                aria-selected={isActive}
                className={`transition-all duration-300 rounded-full focus:outline-none cursor-pointer ${
                  isActive
                    ? 'w-9 h-2.5 bg-[#D4AF6A] shadow-[0_0_12px_rgba(212,175,106,0.5)]'
                    : 'w-2.5 h-2.5 bg-[#F7F3EA]/30 hover:bg-[#F7F3EA]/60'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <motion.button
        id="hero-scroll-indicator"
        onClick={onExploreVenue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-[#F7F3EA]/60 hover:text-[#D4AF6A] transition-colors cursor-pointer group"
      >
        <span className="text-[10px] tracking-[0.3em] font-sans font-medium uppercase">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#D4AF6A]" />
        </motion.div>
      </motion.button>
    </section>
  );
};
