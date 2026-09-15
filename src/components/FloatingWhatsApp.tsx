import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { useContent } from '../context/ContentContext';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { content } = useContent();
  const siteSettings = content.siteSettings || VENUE_INFO;
  const whatsAppHref = siteSettings.whatsAppHref || VENUE_INFO.whatsAppHref;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover/desktop */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            className="hidden sm:flex items-center gap-2 bg-[#0A211A] text-[#F7F3EA] border border-emerald-500/40 px-3.5 py-2 rounded-2xl shadow-xl text-xs backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Chat with Kee on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        id="floating-whatsapp-btn"
        href={whatsAppHref}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-colors focus:outline-none cursor-pointer group"
        aria-label="Chat with Kee Event and Garden on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none opacity-60" />
        <MessageCircle className="w-7 h-7 fill-white/10 group-hover:scale-110 transition-transform" />
      </motion.a>
    </div>
  );
};
