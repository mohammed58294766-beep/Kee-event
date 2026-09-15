import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { useContent } from '../context/ContentContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { content } = useContent();
  const siteSettings = content.siteSettings || VENUE_INFO;
  const navItems = content.navigation && content.navigation.length > 0
    ? content.navigation
    : [
        { id: 'home', label: 'HOME', path: '/' },
        { id: 'about', label: 'ABOUT', path: '/about' },
        { id: 'venue', label: 'VENUE', path: '/venue' },
        { id: 'services', label: 'SERVICES', path: '/services' },
        { id: 'gallery', label: 'GALLERY', path: '/gallery' },
        { id: 'contact', label: 'CONTACT', path: '/contact' },
      ];

  const phoneHref = siteSettings.phoneHref || VENUE_INFO.phoneHref;
  const whatsAppHref = siteSettings.whatsAppHref || VENUE_INFO.whatsAppHref;
  const customLogoUrl = siteSettings.customLogoUrl;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop or route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A211A]/95 backdrop-blur-md py-3 shadow-xl border-b border-[#D4AF6A]/20'
            : 'bg-gradient-to-b from-[#0A211A]/95 via-[#0A211A]/70 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            id="nav-logo-btn"
            to="/"
            className="group text-left flex items-center gap-3 cursor-pointer focus:outline-none"
            aria-label="Kee Event and Garden Home"
          >
            {customLogoUrl ? (
              <img
                src={customLogoUrl}
                alt={siteSettings.businessName || 'Kee Event and Garden'}
                className="h-10 max-w-[180px] object-contain"
              />
            ) : (
              <>
                <div className="w-10 h-10 rounded-full border border-[#D4AF6A]/50 bg-[#12352B] flex items-center justify-center text-[#D4AF6A] font-serif text-xl font-bold group-hover:border-[#D4AF6A] group-hover:scale-105 transition-all">
                  K
                </div>
                <div>
                  <span className="font-serif text-lg sm:text-xl font-semibold tracking-[0.18em] text-[#F7F3EA] group-hover:text-[#D4AF6A] transition-colors block uppercase">
                    {siteSettings.businessName ? siteSettings.businessName.split(' ')[0] : 'KEE'}
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.24em] text-[#D4AF6A] uppercase font-sans font-medium block">
                    {siteSettings.tagline || 'EVENT & GARDEN • JOS'}
                  </span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navItems.map((link: any) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  to={link.path}
                  className={`text-[13px] tracking-[0.18em] font-medium transition-all relative py-1 focus:outline-none cursor-pointer ${
                    active
                      ? 'text-[#D4AF6A]'
                      : 'text-[#F7F3EA]/85 hover:text-[#D4AF6A]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF6A] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              id="nav-quick-call-btn"
              href={phoneHref}
              className="p-2.5 rounded-full bg-[#12352B]/80 hover:bg-[#12352B] border border-[#D4AF6A]/30 text-[#D4AF6A] hover:border-[#D4AF6A] transition-all"
              title={`Call Kee: ${siteSettings.phoneDisplay || '+234 803 700 6260'}`}
              aria-label="Call Kee Event and Garden"
            >
              <Phone className="w-4 h-4" />
            </a>
            <Link
              id="nav-book-event-btn"
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.14em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_16px_rgba(212,175,106,0.25)] flex items-center gap-2 cursor-pointer"
            >
              <span>BOOK AN EVENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              id="mobile-nav-quick-call-btn"
              href={phoneHref}
              className="p-2 rounded-full bg-[#12352B] border border-[#D4AF6A]/30 text-[#D4AF6A]"
              aria-label="Call Kee Event and Garden"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-lg bg-[#12352B] border border-[#D4AF6A]/40 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`w-5 h-0.5 bg-[#D4AF6A] rounded-full transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#D4AF6A] rounded-full transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#D4AF6A] rounded-full transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Slide Down Panel */}
            <motion.div
              id="mobile-menu-panel"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-50 bg-[#0A211A] border-b border-[#D4AF6A]/30 shadow-2xl px-6 pt-20 pb-8 lg:hidden flex flex-col justify-between max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button top-right */}
              <div className="absolute top-5 right-5">
                <button
                  id="close-mobile-menu-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-[#D4AF6A]/40 bg-[#12352B] flex items-center justify-center text-[#D4AF6A] cursor-pointer"
                  aria-label="Close menu"
                >
                  <span className="text-xl font-light">✕</span>
                </button>
              </div>

              {/* Mobile Links */}
              <div className="space-y-4 my-2">
                <p className="text-[10px] tracking-[0.25em] text-[#D4AF6A] uppercase font-medium">
                  Navigation
                </p>
                <div className="flex flex-col divide-y divide-[#12352B]">
                  {navItems.map((link: any, idx: number) => {
                    const active = isLinkActive(link.path);
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * idx, duration: 0.25 }}
                      >
                        <Link
                          id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`py-3.5 font-serif text-2xl font-medium tracking-wider flex items-center justify-between cursor-pointer ${
                            active ? 'text-[#D4AF6A]' : 'text-[#F7F3EA] hover:text-[#D4AF6A]'
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowRight
                            className={`w-4 h-4 ${
                              active ? 'text-[#D4AF6A]' : 'text-[#D4AF6A]/40'
                            }`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="mt-6 pt-6 border-t border-[#12352B] space-y-3">
                <Link
                  id="mobile-drawer-book-btn"
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] font-semibold text-sm tracking-wider uppercase text-center shadow-md cursor-pointer block"
                >
                  BOOK AN EVENT
                </Link>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    id="mobile-drawer-call-btn"
                    href={phoneHref}
                    className="py-2.5 px-3 rounded-xl bg-[#12352B] border border-[#D4AF6A]/30 text-[#F7F3EA] text-xs font-medium flex items-center justify-center gap-2 hover:border-[#D4AF6A]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF6A]" />
                    <span>Call Venue</span>
                  </a>
                  <a
                    id="mobile-drawer-whatsapp-btn"
                    href={whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#12352B] border border-emerald-500/40 text-[#F7F3EA] text-xs font-medium flex items-center justify-center gap-2 hover:border-emerald-400"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
                <p className="text-[11px] text-center text-[#F7F3EA]/50 font-sans pt-2">
                  {siteSettings.address || 'Justice Akanbi Close, behind St. Piran Church, Jos'}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
