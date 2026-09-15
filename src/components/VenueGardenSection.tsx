import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { VENUE_SPACES } from '../data/venueData';
import { useContent } from '../context/ContentContext';
import { EditorialMedia } from './EditorialMedia';

interface VenueGardenSectionProps {
  onViewGallery: () => void;
  onBookTour: () => void;
}

export const VenueGardenSection: React.FC<VenueGardenSectionProps> = ({
  onViewGallery,
  onBookTour,
}) => {
  const { content } = useContent();
  const spaces = (content.venue?.spaces && content.venue.spaces.length > 0) ? content.venue.spaces : VENUE_SPACES;

  return (
    <section id="venue" className="py-24 sm:py-32 bg-[#0A211A] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#12352B]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Grounds & Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.1]">
            Immerse In Nature, <br />
            <span className="text-[#D4AF6A] italic">Celebrated In Elegance.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/75 font-sans font-light leading-relaxed">
            Experience the harmony of manicured greenery and refined architectural spaces. Located in
            Jos, Kee Event and Garden offers lush outdoor lawns, sheltered halls, and picturesque
            ambient terraces crafted for high-end occasions.
          </p>
        </div>

        {/* Editorial Feature Showcase */}
        <div className="space-y-12 sm:space-y-16">
          {spaces.map((space: any, index: number) => {
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={space.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Large Rounded Media Container */}
                <div
                  className={`lg:col-span-7 relative group ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="rounded-3xl overflow-hidden aspect-[16/10] border border-[#D4AF6A]/25 bg-[#12352B] shadow-2xl relative">
                    <EditorialMedia
                      mediaType={space.mediaType || (space.video ? 'video' : 'image')}
                      image={space.image}
                      video={space.video}
                      alt={`${space.name} at Kee Event and Garden`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/85 via-transparent to-transparent pointer-events-none" />

                    {/* Setting tag */}
                    <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#0A211A]/80 backdrop-blur-md border border-[#D4AF6A]/40 text-[#D4AF6A] text-xs font-semibold uppercase tracking-wider">
                      {space.setting}
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 text-white/90">
                      <p className="font-serif text-xl sm:text-2xl text-[#F7F3EA]">{space.name}</p>
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF6A] uppercase">
                    Space Profile
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F3EA] uppercase mt-1">
                    {space.name}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#F7F3EA]/75 font-sans font-light leading-relaxed">
                    {space.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#12352B]">
                    {space.features && space.features.map((feature: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-[#F7F3EA]/85">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF6A] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      id={`venue-explore-${space.id}-btn`}
                      onClick={onViewGallery}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF6A] hover:text-[#E5C98A] uppercase underline underline-offset-4 cursor-pointer"
                    >
                      <span>View Gallery Images</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Bottom Banner & CTA: VIEW OUR GALLERY */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#12352B] via-[#153E33] to-[#0A211A] border border-[#D4AF6A]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F3EA] uppercase font-medium">
              Explore Our Visual Collection
            </h3>
            <p className="text-sm text-[#F7F3EA]/75 mt-2 font-sans font-light">
              See the beauty of daytime ceremonies, dusk banquets, and evening celebrations
              captured in our gallery.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              id="venue-view-gallery-btn"
              onClick={onViewGallery}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>VIEW OUR GALLERY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="venue-schedule-tour-btn"
              onClick={onBookTour}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#0A211A]/70 hover:bg-[#0A211A] border border-[#D4AF6A]/40 text-[#F7F3EA] text-xs font-medium tracking-[0.16em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>SCHEDULE A TOUR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
