import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { useContent } from '../context/ContentContext';
import { EditorialMedia } from './EditorialMedia';

interface AboutSectionProps {
  onPlanEvent: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onPlanEvent }) => {
  const { content } = useContent();
  const about = content.about || {};
  const homepage = content.homepage || {};
  const mediaType = about.storyMediaType || about.mediaType || homepage.introMediaType || ((about.storyVideo || homepage.introVideo) ? 'video' : 'image');
  const imageUrl = about.storyImage || homepage.introImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85';
  const videoUrl = about.storyVideo || homepage.introVideo;

  const offerings = [
    'Weddings & Receptions',
    'Private Celebrations',
    'Corporate Gatherings',
    'Social Events',
    'Garden Occasions',
    'Tailored Catering',
    'Event Decoration',
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#0A211A] relative overflow-hidden">
      {/* Background ambient graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#12352B]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Media Composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF6A]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#12352B] aspect-[4/5] sm:aspect-[5/6]">
              <EditorialMedia
                mediaType={mediaType}
                image={imageUrl}
                video={videoUrl}
                alt="Bespoke garden ceremony and open-air event setting at Kee Event and Garden Jos"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Overlay Badge: Location in Jos */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0A211A]/90 backdrop-blur-md border border-[#D4AF6A]/30 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#12352B] text-[#D4AF6A] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F7F3EA] uppercase tracking-wider">
                    Serene Jos Location
                  </p>
                  <p className="text-[12px] text-[#F7F3EA]/70 mt-0.5 leading-snug">
                    Justice Akanbi Close, behind St. Piran Church, close to Tuscany, Jos, Plateau State
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Gold Accent Border */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl border-2 border-[#D4AF6A]/30 -z-10" />
          </motion.div>

          {/* Right Column: Editorial Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Kee Event & Garden</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.15]">
              Your Moment Deserves <br />
              <span className="text-[#D4AF6A] italic">The Right Setting.</span>
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg text-[#F7F3EA]/80 font-sans font-light leading-relaxed">
              <p>
                Kee Event and Garden is a modern events destination situated in the serene, cool
                atmosphere of Jos, Plateau State. Designed to inspire joy and celebration, our grounds
                combine the tranquility of open nature with refined hospitality.
              </p>
              <p>
                Whether you are hosting a romantic wedding, an intimate private celebration, an
                executive corporate gathering, or a relaxed garden occasion, we provide an expansive
                and adaptable environment. With both open lawn and covered space options, alongside
                comprehensive catering and event decoration services, every detail comes together seamlessly.
              </p>
            </div>

            {/* Offerings */}
            <div className="mt-8 pt-6 border-t border-[#12352B]">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF6A] uppercase mb-4">
                What We Accommodate
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {offerings.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-[#F7F3EA]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF6A] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-10 flex items-center gap-4">
              <button
                id="about-plan-event-btn"
                onClick={onPlanEvent}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.14em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Plan With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                id="about-call-btn"
                href={VENUE_INFO.phoneHref}
                className="px-6 py-3.5 rounded-full bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/30 text-[#F7F3EA] text-xs font-medium tracking-[0.14em] uppercase transition-all"
              >
                {VENUE_INFO.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
