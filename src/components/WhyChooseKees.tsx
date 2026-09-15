import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trees, Layers, Users, Utensils, HeartHandshake } from 'lucide-react';
import { WHY_KEES_POINTS } from '../data/venueData';

export const WhyChooseKees: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Trees className="w-6 h-6 text-[#D4AF6A]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#D4AF6A]" />;
      case 'ShieldCheck':
        return <Users className="w-6 h-6 text-[#D4AF6A]" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-[#D4AF6A]" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-6 h-6 text-[#D4AF6A]" />;
    }
  };

  return (
    <section id="why-kees" className="py-24 sm:py-32 bg-[#0A211A] relative border-t border-[#12352B]">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#12352B]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Distinction & Care</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
            Why Choose Kee Event & Garden
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/70 font-sans font-light">
            Thoughtful spaces and professional hospitality crafted to ensure your special day is
            seamless, picturesque, and cherished.
          </p>
        </div>

        {/* 5 Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_KEES_POINTS.map((point, idx) => {
            const isLast = idx === WHY_KEES_POINTS.length - 1;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl bg-[#12352B]/30 border border-[#D4AF6A]/20 hover:border-[#D4AF6A]/40 transition-all duration-300 relative group flex flex-col justify-between ${
                  isLast ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(point.iconName)}
                    </div>
                    <span className="font-serif text-2xl font-light text-[#D4AF6A]/40">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] uppercase font-medium tracking-wide">
                    {point.title}
                  </h3>
                  <p className="text-xs text-[#D4AF6A] font-serif italic mt-0.5">
                    {point.subtitle}
                  </p>
                  <p className="mt-4 text-sm text-[#F7F3EA]/75 font-sans font-light leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#12352B]/80 flex items-center gap-2 text-xs text-[#F7F3EA]/40 uppercase tracking-widest font-sans">
                  <span>Kee Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
