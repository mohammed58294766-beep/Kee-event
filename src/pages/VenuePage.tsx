import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Check,
} from 'lucide-react';
import { VENUE_SPACES } from '../data/venueData';
import { useContent } from '../context/ContentContext';
import { EditorialMedia } from '../components/EditorialMedia';

export const VenuePage: React.FC = () => {
  const { content } = useContent();
  const venue = content.venue || {};

  const heroTitle = venue.title || venue.heroTitle || 'Spaces Crafted For Unforgettable Moments.';
  const heroSubtitle = venue.subtitle || venue.heroSubtitle || 'Explore the tranquil garden atmosphere, sheltered pavilions, and ambient celebration terraces available at Kee Event and Garden in Jos.';
  const heroMediaType = venue.heroMediaType || (venue.heroVideo ? 'video' : 'image');
  const heroImage = venue.heroImage || 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=80';
  const heroVideo = venue.heroVideo;
  const spaces = (venue.spaces && venue.spaces.length > 0) ? venue.spaces : VENUE_SPACES;

  const defaultVenueFeatures = [
    {
      title: 'Manicured Natural Turf',
      desc: 'Lush, level green lawns surrounded by mature trees, ideal for wedding canopies, aisle walks, and golden hour ceremonies.',
    },
    {
      title: 'Covered Pavilion & Hall',
      desc: 'High-clearance ventilated indoor structure keeping celebrations weatherproof, sheltered from unexpected rain or intense sun.',
    },
    {
      title: 'Sunset Twilight Terrace',
      desc: 'A paved, ambient courtyard designed with festive lighting and comfortable seating for cocktail hours and evening toasts.',
    },
    {
      title: 'Reliable Infrastructure',
      desc: 'Standby backup electricity readiness, clean restroom facilities, and dedicated loading zones for caterers and styling teams.',
    },
    {
      title: 'Secure Gated Perimeter',
      desc: 'Private estate with perimeter wall, gate marshals, and on-site parking for peace of mind throughout your event.',
    },
    {
      title: 'Adaptable Capacity',
      desc: 'Fluid layout options accommodating intimate 50-guest garden parties up to 500+ banquet dining configurations.',
    },
  ];

  const setupConfigurations = [
    {
      title: 'Banquet & Reception Layout',
      subtitle: 'Dining Elegance',
      desc: 'Round tables, gold Chiavari chairs, elegant charger plates, centerpieces, and spacious aisles for effortless guest circulation.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Ceremony & Vow Layout',
      subtitle: 'Romantic Open-Air Aisle',
      desc: 'Straight bridal processional aisle flanked by flower pillars leading to an arched wedding stage framed by natural greenery.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Cocktail & Evening Lounge',
      subtitle: 'Sunset Socializing',
      desc: 'High-top cocktail tables, perimeter lounge sofas, mood lighting, and small chops stations under the evening Jos sky.',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <div className="w-full bg-[#0A211A] text-[#F7F3EA] pt-24 sm:pt-28">
      {/* 1. Cinematic Page Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-b border-[#12352B]">
        <div className="absolute inset-0 z-0 select-none overflow-hidden opacity-30">
          <EditorialMedia
            mediaType={heroMediaType}
            image={heroImage}
            video={heroVideo}
            alt="Kee Event and Garden grounds"
            className="w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A211A] via-[#0A211A]/80 to-[#0A211A] pointer-events-none" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12352B]/80 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Grounds & Spaces</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.1]"
          >
            {heroTitle.includes('Unforgettable Moments') ? (
              <>
                {heroTitle.replace(/Unforgettable Moments\.?/i, '')} <br />
                <span className="text-[#D4AF6A] italic">Unforgettable Moments.</span>
              </>
            ) : (
              heroTitle
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-base sm:text-xl text-[#F7F3EA]/85 font-sans font-light max-w-2xl mx-auto leading-relaxed"
          >
            {heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              id="venue-hero-book-btn"
              to="/contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              <span>BOOK THE VENUE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              id="venue-hero-gallery-btn"
              to="/gallery"
              className="px-7 py-4 rounded-full bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/30 text-[#F7F3EA] text-xs font-medium tracking-[0.14em] uppercase transition-all"
            >
              <span>VIEW OUR GALLERY</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Spaces Showcase */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Areas</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.15]">
              Flexible Indoor & <br />
              <span className="text-[#D4AF6A] italic">Garden Configurations</span>
            </h2>
            <p className="mt-4 text-base text-[#F7F3EA]/75 font-sans font-light leading-relaxed">
              Every celebration possesses its own unique character. At Kee, our spaces can be booked
              individually or harmonized together for complete estate privacy.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {spaces.map((space: any, index: number) => {
              const isReversed = index % 2 !== 0;
              return (
                <motion.div
                  key={space.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8 }}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Column */}
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
                        alt={space.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/85 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#0A211A]/80 backdrop-blur-md border border-[#D4AF6A]/40 text-[#D4AF6A] text-xs font-semibold uppercase tracking-wider">
                        {space.setting}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="font-serif text-2xl sm:text-3xl text-[#F7F3EA]">{space.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Detail Column */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-center space-y-4 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF6A] uppercase">
                      Space Profile
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F3EA] uppercase">
                      {space.name}
                    </h3>
                    <p className="text-sm sm:text-base text-[#F7F3EA]/80 font-sans font-light leading-relaxed">
                      {space.description}
                    </p>

                    {/* Features list */}
                    <div className="pt-4 border-t border-[#12352B] space-y-2">
                      {space.features && space.features.map((feat: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F7F3EA]/90">
                          <Check className="w-4 h-4 text-[#D4AF6A] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <Link
                        to="/contact"
                        className="px-6 py-3 rounded-full bg-[#D4AF6A] hover:bg-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-wider uppercase transition-all shadow-md inline-flex items-center gap-2"
                      >
                        <span>Enquire For This Space</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Event Setups & Configurations */}
      <section className="py-20 sm:py-28 bg-[#081b15] border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seating & Layouts</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
              Event Setups & Environments
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/70 font-sans font-light">
              See how our flexible indoor and garden footprints transform for different occasion styles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {setupConfigurations.map((setup, idx) => (
              <motion.div
                key={setup.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="rounded-3xl overflow-hidden bg-[#12352B]/40 border border-[#D4AF6A]/20 flex flex-col justify-between group hover:border-[#D4AF6A]/50 transition-all shadow-xl"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={setup.image}
                      alt={setup.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-serif text-[#D4AF6A] italic">
                      {setup.subtitle}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium">
                      {setup.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#F7F3EA]/75 font-sans font-light leading-relaxed">
                      {setup.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#12352B]/80 mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
                    Custom Arrangements
                  </span>
                  <Link
                    to="/contact"
                    className="text-xs text-[#F7F3EA]/60 group-hover:text-[#D4AF6A] transition-colors flex items-center gap-1 font-medium uppercase"
                  >
                    <span>Request Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Amenities & Venue Infrastructure */}
      <section className="py-20 sm:py-28 bg-[#0A211A] border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Operational Excellence</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
              Amenities & Logistical Comforts
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/70 font-sans font-light">
              Essential conveniences that ensure smooth execution for hosts, vendors, and guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultVenueFeatures.map((item: any, idx: number) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#12352B]/30 border border-[#D4AF6A]/20 hover:border-[#D4AF6A]/40 transition-all"
              >
                <div className="w-3 h-3 rounded-full bg-[#D4AF6A] mb-4" />
                <h3 className="font-serif text-xl text-[#F7F3EA] uppercase font-medium">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#F7F3EA]/70 font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Banner with CTAs */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#12352B] via-[#153E33] to-[#0A211A] border border-[#D4AF6A]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F3EA] uppercase font-medium">
                Ready to Experience Kee in Person?
              </h3>
              <p className="text-sm text-[#F7F3EA]/75 mt-2 font-sans font-light">
                Browse our real event gallery or schedule a guided walk-through with our team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                id="venue-view-gallery-bottom-cta"
                to="/gallery"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>VIEW OUR GALLERY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                id="venue-book-venue-bottom-cta"
                to="/contact"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#0A211A]/80 hover:bg-[#0A211A] border border-[#D4AF6A]/40 text-[#F7F3EA] text-xs font-medium tracking-[0.16em] uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>BOOK THE VENUE</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
