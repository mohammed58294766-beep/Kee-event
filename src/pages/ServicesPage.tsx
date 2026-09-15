import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Check,
  Building2,
  Wand2,
  UtensilsCrossed,
  Armchair,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { VENUE_INFO, VENUE_SERVICES } from '../data/venueData';
import { useContent } from '../context/ContentContext';
import { ServiceItem } from '../types';

export const ServicesPage: React.FC = () => {
  const { content } = useContent();
  const servicesContent = content.services || {};
  const siteSettings = content.siteSettings || VENUE_INFO;

  const heroTitle = servicesContent.heroTitle || 'Tailored Hospitality & Event Services.';
  const heroSubtitle = servicesContent.heroSubtitle || 'From comprehensive venue hire to creative floral styling, exquisite catering coordination, and luxury rental decor in Jos.';
  const servicesList: ServiceItem[] = Array.isArray(servicesContent) && servicesContent.length > 0
    ? servicesContent
    : (servicesContent.services && servicesContent.services.length > 0 ? servicesContent.services : VENUE_SERVICES);

  const getIcon = (idx: number, iconName?: string) => {
    if (iconName === 'Building' || idx === 0) return <Building2 className="w-6 h-6 text-[#D4AF6A]" />;
    if (iconName === 'Sparkles' || idx === 1) return <Wand2 className="w-6 h-6 text-[#D4AF6A]" />;
    if (iconName === 'Utensils' || idx === 2) return <UtensilsCrossed className="w-6 h-6 text-[#D4AF6A]" />;
    return <Armchair className="w-6 h-6 text-[#D4AF6A]" />;
  };

  const coordinationSteps = [
    {
      step: '01',
      title: 'Initial Consultation',
      desc: 'We discuss your event date, estimated guest count, theme preferences, and space requirements.',
    },
    {
      step: '02',
      title: 'Site Visit & Walkthrough',
      desc: 'Tour the lush lawns, covered pavilion, and terraces in person with our venue manager in Jos.',
    },
    {
      step: '03',
      title: 'Custom Proposal & Date Lock',
      desc: 'Confirm your tailored package, catering details, and styling setup to officially secure your date.',
    },
    {
      step: '04',
      title: 'Flawless Event Day',
      desc: 'Our on-site team facilitates access, vendor coordination, utilities, and security so you can enjoy your celebration.',
    },
  ];

  return (
    <div className="w-full bg-[#0A211A] text-[#F7F3EA] pt-24 sm:pt-28">
      {/* 1. Page Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-b border-[#12352B]">
        <div className="absolute inset-0 z-0 select-none overflow-hidden opacity-30">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=80"
            alt="Event hospitality at Kee Event and Garden"
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
            <span>Hospitality & Coordination</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.1]"
          >
            {heroTitle.includes('Event Services') ? (
              <>
                {heroTitle.replace(/Event Services\.?/i, '')} <br />
                <span className="text-[#D4AF6A] italic">Event Services.</span>
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
              id="services-hero-book-btn"
              to="/contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              <span>DISCUSS YOUR EVENT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              id="services-hero-whatsapp-btn"
              href={siteSettings.whatsAppHref || VENUE_INFO.whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-full bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/30 text-[#F7F3EA] text-xs font-medium tracking-[0.14em] uppercase transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Core Service Offerings (4 Services) */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>What We Provide</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
              Full-Spectrum Event Solutions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/70 font-sans font-light">
              Whether you only need space hire or a complete turnkey package with decor and rentals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesList.map((service: ServiceItem, idx: number) => (
              <motion.div
                key={service.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 sm:p-10 rounded-3xl bg-[#12352B]/40 border border-[#D4AF6A]/25 hover:border-[#D4AF6A]/55 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    {getIcon(idx, service.iconName)}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F3EA] uppercase font-medium">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#F7F3EA]/80 font-sans font-light leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#12352B] space-y-2.5">
                    {service.details && service.details.map((detail: string, dIdx: number) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F3EA]/90">
                        <Check className="w-4 h-4 text-[#D4AF6A] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#12352B]/80 flex items-center justify-between">
                  <span className="text-xs text-[#F7F3EA]/50 uppercase tracking-widest font-sans">
                    Tailored Packages
                  </span>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 rounded-full bg-[#12352B] group-hover:bg-[#D4AF6A] text-[#D4AF6A] group-hover:text-[#0A211A] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 border border-[#D4AF6A]/30"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Seamless Planning Process */}
      <section className="py-20 sm:py-28 bg-[#081b15] border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How We Work</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
              The Kee Event Journey
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/70 font-sans font-light">
              A transparent four-step process to ensure planning your event in Jos is relaxing and structured.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coordinationSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-[#12352B]/30 border border-[#D4AF6A]/20 flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-light text-[#D4AF6A]/60 block mb-4">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-xl text-[#F7F3EA] uppercase font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#F7F3EA]/70 font-sans font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Booking Call To Action */}
      <section className="py-20 sm:py-28 bg-[#0A211A] border-t border-[#12352B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F7F3EA] uppercase font-medium">
            Have A Specific Requirement?
          </h2>
          <p className="mt-4 text-base text-[#F7F3EA]/80 font-sans font-light max-w-xl mx-auto">
            Our experienced team is always happy to accommodate custom floral themes, special catering
            configurations, or exclusive multi-day bookings.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-md"
            >
              SCHEDULE A CONSULTATION
            </Link>
            <a
              href={siteSettings.phoneHref || VENUE_INFO.phoneHref}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/40 text-[#F7F3EA] text-xs font-medium tracking-[0.16em] uppercase transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF6A]" />
              <span>CALL {siteSettings.phoneDisplay || VENUE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
