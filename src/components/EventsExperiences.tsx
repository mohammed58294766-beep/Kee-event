import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowRight, Camera } from 'lucide-react';
import { EVENT_EXPERIENCES } from '../data/venueData';
import { EventExperience } from '../types';

interface EventsExperiencesProps {
  onSelectExperienceForBooking: (experienceTitle: string) => void;
}

export const EventsExperiences: React.FC<EventsExperiencesProps> = ({
  onSelectExperienceForBooking,
}) => {
  const [selectedId, setSelectedId] = useState<string>(EVENT_EXPERIENCES[0].id);
  const activeExp: EventExperience =
    EVENT_EXPERIENCES.find((exp) => exp.id === selectedId) || EVENT_EXPERIENCES[0];

  return (
    <section id="experiences" className="py-24 sm:py-32 bg-[#0A211A] relative border-t border-[#12352B]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#12352B]/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Versatile Spaces & Occasions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
            Crafted For Every Celebration
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/70 font-sans font-light">
            From intimate gatherings under Jos blue skies to lavish evening galas, discover how our
            spaces transform to match your event vision.
          </p>
        </div>

        {/* Experience Selector Navigation Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none no-scrollbar">
          {EVENT_EXPERIENCES.map((exp) => {
            const isSelected = exp.id === selectedId;
            return (
              <button
                key={exp.id}
                id={`exp-tab-${exp.id}`}
                onClick={() => setSelectedId(exp.id)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#D4AF6A] text-[#0A211A] font-semibold shadow-[0_4px_16px_rgba(212,175,106,0.3)]'
                    : 'bg-[#12352B]/60 text-[#F7F3EA]/70 hover:text-[#F7F3EA] hover:bg-[#12352B] border border-[#D4AF6A]/20'
                }`}
              >
                {exp.title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Editorial Feature Card for Active Experience */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#12352B]/50 border border-[#D4AF6A]/25 rounded-3xl p-6 sm:p-10 backdrop-blur-sm"
          >
            {/* Visual Left */}
            <div className="lg:col-span-7 relative">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-[#D4AF6A]/30 relative group shadow-2xl">
                <img
                  src={activeExp.image}
                  alt={`${activeExp.title} at Kee Event and Garden`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/80 via-transparent to-transparent" />
                {/* Subtitle badge in image */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0A211A]/80 backdrop-blur-md border border-[#D4AF6A]/40 text-[#D4AF6A] text-[11px] uppercase tracking-wider font-medium">
                  {activeExp.subtitle}
                </div>
                {/* Photography Replacement Note */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-md bg-[#0A211A]/75 text-[#F7F3EA]/60 text-[10px] flex items-center gap-1.5 backdrop-blur-xs">
                  <Camera className="w-3 h-3 text-[#D4AF6A]" />
                  <span>Preview imagery • Replaced with client photography</span>
                </div>
              </div>
            </div>

            {/* Description & Features Right */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <p className="text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-1">
                  Occasion Overview
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F7F3EA] uppercase font-medium">
                  {activeExp.title}
                </h3>
                <p className="text-sm text-[#D4AF6A]/90 font-serif italic mt-1">
                  {activeExp.subtitle}
                </p>
                <p className="mt-4 text-sm sm:text-base text-[#F7F3EA]/80 font-sans font-light leading-relaxed">
                  {activeExp.description}
                </p>

                {/* Highlights */}
                <div className="mt-6 pt-6 border-t border-[#12352B]/80">
                  <p className="text-xs font-semibold tracking-wider text-[#F7F3EA] uppercase mb-3">
                    Venue Highlights
                  </p>
                  <div className="space-y-2">
                    {activeExp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F7F3EA]/85">
                        <div className="w-4 h-4 rounded-full bg-[#D4AF6A]/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#D4AF6A]" />
                        </div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capacity Hint */}
                <div className="mt-6 p-3.5 rounded-xl bg-[#0A211A]/60 border border-[#D4AF6A]/20 text-xs text-[#F7F3EA]/70">
                  <span className="text-[#D4AF6A] font-medium">Capacity flexibility:</span>{' '}
                  {activeExp.capacityHint}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  id={`book-exp-btn-${activeExp.id}`}
                  onClick={() => onSelectExperienceForBooking(activeExp.title)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#D4AF6A] hover:bg-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.14em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Enquire For {activeExp.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
