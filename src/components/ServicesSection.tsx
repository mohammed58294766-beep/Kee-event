import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Building2, Wand2, UtensilsCrossed, Armchair, ArrowRight, Check } from 'lucide-react';
import { VENUE_SERVICES } from '../data/venueData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  // Map icons
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Building':
        return <Building2 className="w-6 h-6 text-[#D4AF6A]" />;
      case 'Sparkles':
        return <Wand2 className="w-6 h-6 text-[#D4AF6A]" />;
      case 'Utensils':
        return <UtensilsCrossed className="w-6 h-6 text-[#D4AF6A]" />;
      case 'ShieldCheck':
      default:
        return <Armchair className="w-6 h-6 text-[#D4AF6A]" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#0A211A] relative border-t border-[#12352B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Hospitality</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
            Professional Event Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/70 font-sans font-light">
            Comprehensive solutions tailored to bring your event together with ease, elegance, and
            impeccable coordination.
          </p>
        </div>

        {/* 4 Professional Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VENUE_SERVICES.map((service: ServiceItem, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#12352B]/40 border border-[#D4AF6A]/20 hover:border-[#D4AF6A]/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-[#D4AF6A] transition-all">
                  {getIcon(service.iconName)}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F3EA] uppercase font-medium tracking-wide">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#F7F3EA]/75 font-sans font-light leading-relaxed">
                  {service.description}
                </p>
                {/* Details list */}
                <div className="mt-6 pt-6 border-t border-[#12352B] space-y-2.5">
                  {service.details && service.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F3EA]/85">
                      <Check className="w-4 h-4 text-[#D4AF6A] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#12352B]/80 flex items-center justify-between">
                <span className="text-xs text-[#F7F3EA]/50 uppercase tracking-widest font-sans">
                  Available in Jos
                </span>
                <button
                  id={`service-enquire-${service.id}-btn`}
                  onClick={() => onSelectServiceForBooking(service.title)}
                  className="px-5 py-2.5 rounded-full bg-[#12352B] group-hover:bg-[#D4AF6A] text-[#D4AF6A] group-hover:text-[#0A211A] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 border border-[#D4AF6A]/30 cursor-pointer active:scale-95"
                >
                  <span>Enquire Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
