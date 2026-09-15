import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Sparkles, ArrowUp, Instagram, Facebook, Video, Youtube } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { useContent } from '../context/ContentContext';

export const Footer: React.FC = () => {
  const { content } = useContent();
  const footer = content.footer || {
    title: 'KEE EVENT & GARDEN',
    subtitle: 'Jos, Plateau State, Nigeria',
    aboutText: 'Where moments become memories. A premier indoor and outdoor event destination in Jos dedicated to celebrations, weddings, and distinguished gatherings.',
    copyright: '© 2025 Kee Event and Garden. All rights reserved.',
    locationNote: 'Justice Akanbi Close, behind St. Piran Church, close to Tuscany, Jos',
  };
  const siteSettings = content.siteSettings || VENUE_INFO;
  const social = content.socialLinks || { instagram: '', facebook: '', tiktok: '', youtube: '' };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = content.navigation && content.navigation.length > 0
    ? content.navigation
    : [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'about', label: 'About Kee', path: '/about' },
        { id: 'venue', label: 'Venue & Garden', path: '/venue' },
        { id: 'services', label: 'Services', path: '/services' },
        { id: 'gallery', label: 'Gallery', path: '/gallery' },
        { id: 'contact', label: 'Contact & Booking', path: '/contact' },
      ];

  const hasAnySocial = Boolean(social.instagram || social.facebook || social.tiktok || social.youtube);

  return (
    <footer id="footer" className="bg-[#071712] text-[#F7F3EA] border-t border-[#12352B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#12352B]">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              {siteSettings.customLogoUrl ? (
                <img
                  src={siteSettings.customLogoUrl}
                  alt={footer.title}
                  className="h-10 max-w-[180px] object-contain"
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full border border-[#D4AF6A]/50 bg-[#12352B] flex items-center justify-center text-[#D4AF6A] font-serif text-xl font-bold group-hover:scale-105 transition-transform">
                    K
                  </div>
                  <div>
                    <span className="font-serif text-xl font-semibold tracking-[0.16em] text-[#F7F3EA] group-hover:text-[#D4AF6A] transition-colors uppercase block">
                      {footer.title}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] text-[#D4AF6A] uppercase font-sans font-medium block">
                      {footer.subtitle}
                    </span>
                  </div>
                </>
              )}
            </Link>
            <p className="text-sm text-[#F7F3EA]/70 font-sans font-light max-w-sm leading-relaxed">
              {footer.aboutText}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#D4AF6A]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="italic font-serif">{footer.locationNote}</span>
            </div>

            {/* Social Links */}
            {hasAnySocial && (
              <div className="pt-2 flex items-center gap-3">
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/20 text-[#D4AF6A] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/20 text-[#D4AF6A] transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {social.tiktok && (
                  <a
                    href={social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/20 text-[#D4AF6A] transition-colors"
                    aria-label="TikTok"
                  >
                    <Video className="w-4 h-4" />
                  </a>
                )}
                {social.youtube && (
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/20 text-[#D4AF6A] transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF6A] uppercase">
              Quick Links
            </p>
            <ul className="space-y-2 text-sm text-[#F7F3EA]/75">
              {navLinks.map((link: any) => (
                <li key={link.path}>
                  <Link
                    id={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    to={link.path}
                    className="hover:text-[#D4AF6A] transition-colors cursor-pointer text-left block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF6A] uppercase">
              Direct Contact
            </p>
            <p className="text-sm text-[#F7F3EA]/80 font-light">
              We look forward to welcoming you for personal venue walk-throughs and reservations in Jos.
            </p>
            <div className="space-y-2.5">
              <a
                id="footer-call-btn"
                href={siteSettings.phoneHref || VENUE_INFO.phoneHref}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#12352B]/60 hover:bg-[#12352B] border border-[#D4AF6A]/20 hover:border-[#D4AF6A]/50 transition-all text-sm group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0A211A] flex items-center justify-center text-[#D4AF6A] group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#D4AF6A] uppercase block font-medium">Call Us</span>
                  <span className="text-[#F7F3EA] font-semibold">{siteSettings.phoneDisplay || VENUE_INFO.phoneDisplay}</span>
                </div>
              </a>
              <a
                id="footer-whatsapp-btn"
                href={siteSettings.whatsAppHref || VENUE_INFO.whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#12352B]/60 hover:bg-[#12352B] border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0A211A] flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-emerald-400 uppercase block font-medium">WhatsApp Message</span>
                  <span className="text-[#F7F3EA] font-semibold">{siteSettings.phoneDisplay || VENUE_INFO.phoneDisplay}</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F3EA]/50 font-sans">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-6">
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#D4AF6A] hover:text-[#E5C98A] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
