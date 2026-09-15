import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Heart,
  Users,
  Briefcase,
  Trees,
  GlassWater,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { useContent } from '../context/ContentContext';
import { EditorialMedia } from '../components/EditorialMedia';

export const AboutPage: React.FC = () => {
  const { content } = useContent();
  const about = content.about || {};
  const siteSettings = content.siteSettings || VENUE_INFO;

  const heroTitle = about.heading || about.heroTitle || 'Your Moment Deserves The Right Setting.';
  const heroSubtitle = about.subheading || about.heroSubtitle || "A premier event destination located in the tranquil, refreshing atmosphere of Jos, Plateau State – designed for life's most unforgettable occasions.";
  const storyHeading = about.heading || about.storyHeading || 'A Harmonious Blend of Nature & Hospitality';
  const storyMediaType = about.storyMediaType || about.mediaType || (about.storyVideo ? 'video' : 'image');
  const storyImage = about.storyImage || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80';
  const storyVideo = about.storyVideo;

  const storyParagraphs = [
    about.introParagraph || 'Kee Event and Garden was established with a singular focus: to offer the people of Jos and visiting hosts a refined, picturesque, and dependable environment for their most valued milestones.',
    about.storyParagraph1 || 'Jos is renowned across Nigeria for its temperate, refreshing highland climate and scenic serenity. At Kee, we harness this natural gift by providing manicured outdoor lawns, serene tree canopies, and protected indoor/covered configurations that allow hosts and guests to celebrate comfortably in any weather.',
    about.storyParagraph2 || 'Every element of our venue – from the layout of the grounds to our dedicated event decoration, catering, and rental partnerships – is geared toward providing hosts with peace of mind and guests with cherished memories.',
  ];

  const occasionSuitability = [
    {
      title: 'Weddings & Receptions',
      icon: <Heart className="w-5 h-5 text-[#D4AF6A]" />,
      desc: 'Lush natural backdrops, romantic manicured lawn aisles, and flexible indoor/outdoor arrangements for ceremonial vows, banquets, and lively evening receptions.',
    },
    {
      title: 'Private Celebrations',
      icon: <GlassWater className="w-5 h-5 text-[#D4AF6A]" />,
      desc: 'Milestone birthdays, wedding anniversaries, family homecomings, and graduation banquets hosted with intimacy, dignity, and tailored hospitality.',
    },
    {
      title: 'Corporate Gatherings',
      icon: <Briefcase className="w-5 h-5 text-[#D4AF6A]" />,
      desc: 'Executive leadership retreats, annual general meetings, corporate dinners, galas, and professional seminars requiring focused atmosphere and logistical readiness.',
    },
    {
      title: 'Social Events',
      icon: <Users className="w-5 h-5 text-[#D4AF6A]" />,
      desc: 'Alumni reunions, community dinners, festive end-of-year gatherings, and cultural celebrations designed with spacious dining and socializing areas.',
    },
    {
      title: 'Garden Occasions',
      icon: <Trees className="w-5 h-5 text-[#D4AF6A]" />,
      desc: 'Embracing the famously crisp and refreshing air of Jos with open-air picnics, Sunday acoustic afternoons, high tea gatherings, and serene daytime brunches.',
    },
  ];

  return (
    <div className="w-full bg-[#0A211A] text-[#F7F3EA] pt-24 sm:pt-28">
      {/* 1. Page Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-b border-[#12352B]">
        <div className="absolute inset-0 z-0 select-none overflow-hidden opacity-30">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80"
            alt="Kee Event and Garden atmosphere"
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
            <span>About Kee Event & Garden</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.1]"
          >
            {heroTitle.includes('The Right Setting') ? (
              <>
                {heroTitle.replace(/The Right Setting\.?/i, '')} <br />
                <span className="text-[#D4AF6A] italic">The Right Setting.</span>
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
        </div>
      </section>

      {/* 2. Editorial Story & Setting */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image Composition */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#D4AF6A]/30 bg-[#12352B] shadow-2xl aspect-[4/5]">
                <EditorialMedia
                  mediaType={storyMediaType}
                  image={storyImage}
                  video={storyVideo}
                  alt="Evening banquet table setup at Kee Event and Garden"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0A211A]/90 backdrop-blur-md border border-[#D4AF6A]/30">
                  <p className="font-serif text-lg text-[#F7F3EA] uppercase font-medium">
                    Jos, Plateau State
                  </p>
                  <p className="text-xs text-[#F7F3EA]/70 mt-0.5">
                    {siteSettings.address || 'Justice Akanbi Close, behind St. Piran Church, close to Tuscany'}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block absolute -bottom-5 -right-5 w-44 h-44 rounded-3xl border border-[#D4AF6A]/30 -z-10" />
            </motion.div>

            {/* Right Text Editorial */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Philosophy</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.15]">
                {storyHeading.includes('Nature & Hospitality') ? (
                  <>
                    {storyHeading.replace(/Nature & Hospitality/i, '')} <br />
                    <span className="text-[#D4AF6A] italic">Nature & Hospitality</span>
                  </>
                ) : (
                  storyHeading
                )}
              </h2>
              <div className="space-y-4">
                {storyParagraphs.map((para: string, idx: number) => (
                  <p key={idx} className="text-base sm:text-lg text-[#F7F3EA]/80 font-sans font-light leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  id="about-explore-venue-cta"
                  to="/venue"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>EXPLORE THE VENUE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  id="about-plan-event-link"
                  to="/contact"
                  className="px-7 py-4 rounded-full bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/30 text-[#F7F3EA] text-xs font-medium tracking-[0.14em] uppercase transition-all"
                >
                  <span>PLAN YOUR EVENT</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Occasions We Accommodate */}
      <section className="py-20 sm:py-28 bg-[#081b15] border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Occasions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
              Suitability For Diverse Occasions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/70 font-sans font-light">
              We provide versatile space configurations suited for celebrations of every scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {occasionSuitability.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#12352B]/40 border border-[#D4AF6A]/20 hover:border-[#D4AF6A]/45 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#F7F3EA]/75 font-sans font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#12352B]/80 flex items-center justify-between">
                  <span className="text-[11px] text-[#D4AF6A] uppercase tracking-wider font-semibold">
                    Kee Experience
                  </span>
                  <Link
                    to="/contact"
                    className="text-xs text-[#F7F3EA]/70 group-hover:text-[#D4AF6A] transition-colors flex items-center gap-1 font-medium uppercase"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Location Context & Accessibility */}
      <section className="py-20 sm:py-28 bg-[#0A211A] border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#12352B]/40 border border-[#D4AF6A]/30 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prime Jos Location</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#F7F3EA] uppercase font-medium">
                Situated In A Quiet, Accessible Pocket of Jos
              </h3>
              <p className="text-sm sm:text-base text-[#F7F3EA]/75 font-sans font-light leading-relaxed">
                Located on Justice Akanbi Close, directly behind St. Piran Church and close to Tuscany
                restaurant. This established central location offers both the convenience of easy access
                for guests arriving from across Jos and the peaceful exclusivity of a tucked-away estate.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                id="about-call-venue-btn"
                href={siteSettings.phoneHref || VENUE_INFO.phoneHref}
                className="w-full py-3.5 px-6 rounded-full bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/40 text-[#F7F3EA] text-xs font-medium tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4AF6A]" />
                <span>Call {siteSettings.phoneDisplay || VENUE_INFO.phoneDisplay}</span>
              </a>
              <a
                id="about-whatsapp-btn"
                href={siteSettings.whatsAppHref || VENUE_INFO.whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
