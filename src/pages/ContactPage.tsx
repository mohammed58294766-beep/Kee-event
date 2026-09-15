import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Users,
} from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { useContent } from '../context/ContentContext';
import { BookingFormData } from '../types';

export const ContactPage: React.FC = () => {
  const { content } = useContent();
  const contact = content.contact || {};
  const siteSettings = content.siteSettings || VENUE_INFO;

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    eventType: 'Wedding & Reception',
    preferredDate: '',
    guestCount: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  const heroTitle = contact.heroTitle || 'Let s Make Your Next Event Memorable.';
  const heroSubtitle = contact.heroSubtitle || 'Reach out to the Kee Event and Garden team in Jos. We look forward to discussing dates, space requirements, and arranging a personalized tour of our grounds.';

  const validate = () => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Phone number must be at least 8 digits.';
    }
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select your preferred date.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      // POST enquiry to backend API
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn('Enquiry submission handled locally:', err);
    } finally {
      setSubmitting(false);
      setSubmittedData({ ...formData });
      setIsSubmitted(true);
    }
  };

  const getWhatsAppMessageUrl = () => {
    const data = submittedData || formData;
    const phoneClean = (siteSettings.phone || '2348037006260').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Kee Event & Garden,\n\nI would like to enquire about booking your venue in Jos:\n` +
        `  Name: ${data.fullName || 'Guest'}\n` +
        `  Phone: ${data.phone}\n` +
        `  Event Type: ${data.eventType}\n` +
        `  Preferred Date: ${data.preferredDate || 'TBD'}\n` +
        (data.guestCount ? `  Estimated Guests: ${data.guestCount}\n` : '') +
        (data.message ? `  Notes: ${data.message}\n` : '') +
        `\nPlease let me know your availability.`
    );
    return `https://wa.me/${phoneClean}?text=${text}`;
  };

  return (
    <div className="w-full bg-[#0A211A] text-[#F7F3EA] pt-24 sm:pt-28">
      {/* 1. Page Hero Banner */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-[#12352B]">
        <div className="absolute inset-0 z-0 select-none overflow-hidden opacity-25">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80"
            alt="Kee Event and Garden Jos"
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
            <span>Connect & Reserve</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.1]"
          >
            {heroTitle.includes('Memorable') ? (
              <>
                {heroTitle.replace(/Memorable\.?/i, '')} <br />
                <span className="text-[#D4AF6A] italic">Memorable.</span>
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

          {/* TWO PRIMARY CALLOUT BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              id="contact-hero-call-btn"
              href={siteSettings.phoneHref || VENUE_INFO.phoneHref}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-[0_8px_20px_rgba(212,175,106,0.25)] flex items-center justify-center gap-3"
            >
              <Phone className="w-4 h-4" />
              <span>CALL KEE ({siteSettings.phoneDisplay || VENUE_INFO.phoneDisplay})</span>
            </a>
            <a
              id="contact-hero-whatsapp-btn"
              href={siteSettings.whatsAppHref || VENUE_INFO.whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase active:scale-95 transition-all shadow-[0_8px_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Form & Details Grid */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Venue Contacts & Location Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-[#12352B]/40 border border-[#D4AF6A]/30 backdrop-blur-sm space-y-6">
                <h3 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium">
                  Venue Information
                </h3>

                {/* Direct Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center text-[#D4AF6A] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
                      Direct Phone Line
                    </p>
                    <a
                      href={siteSettings.phoneHref || VENUE_INFO.phoneHref}
                      className="text-base font-medium text-[#F7F3EA] hover:text-[#D4AF6A] transition-colors"
                    >
                      {siteSettings.phoneDisplay || VENUE_INFO.phoneDisplay}
                    </a>
                    <p className="text-xs text-[#F7F3EA]/50 mt-0.5">Calls & enquiries</p>
                  </div>
                </div>

                {/* WhatsApp Chat */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A211A] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                      WhatsApp Chat
                    </p>
                    <a
                      href={siteSettings.whatsAppHref || VENUE_INFO.whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-[#F7F3EA] hover:text-emerald-400 transition-colors"
                    >
                      {siteSettings.phoneDisplay || VENUE_INFO.phoneDisplay}
                    </a>
                    <p className="text-xs text-[#F7F3EA]/50 mt-0.5">Quick booking enquiries</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center text-[#D4AF6A] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
                      Venue Address
                    </p>
                    <p className="text-sm text-[#F7F3EA]/90 leading-relaxed mt-0.5 font-light">
                      {siteSettings.address || 'Justice Akanbi Close, behind St. Piran Church, close to Tuscany, Jos, Plateau State, Nigeria'}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 pt-2 border-t border-[#12352B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center text-[#D4AF6A] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
                      Venue Visits & Walkthroughs
                    </p>
                    <p className="text-xs text-[#F7F3EA]/70 mt-0.5">
                      {siteSettings.workingHours || VENUE_INFO.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map & Landmark Guide */}
              <div className="p-6 rounded-3xl bg-[#12352B]/30 border border-[#D4AF6A]/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#D4AF6A] uppercase tracking-widest">
                    Location Guide
                  </span>
                  <span className="text-[11px] text-[#F7F3EA]/60">Jos Plateau</span>
                </div>
                <p className="text-xs text-[#F7F3EA]/70 font-light leading-relaxed">
                  Located in a prime neighborhood of Jos, directly behind the historic St. Piran
                  Church and nearby the popular Tuscany restaurant. Clear road access and ample on-site
                  gated parking.
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Justice+Akanbi+Close+St+Piran+Church+Jos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs text-[#D4AF6A] hover:text-[#E5C98A] uppercase tracking-wider font-medium"
                >
                  <span>Open In Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Booking Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#12352B]/50 border border-[#D4AF6A]/30 backdrop-blur-md shadow-2xl">
                <div className="mb-6">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F3EA] uppercase font-medium">
                    Event Enquiry Form
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F3EA]/70 mt-1 font-sans font-light">
                    Share your preferred date and event requirements with us.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6 sm:p-8 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/40 text-center space-y-5"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#12352B] border border-[#D4AF6A] flex items-center justify-center text-[#D4AF6A] mx-auto">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium">
                          Enquiry Received
                        </h4>
                        <p className="text-sm text-[#F7F3EA]/80 mt-2 max-w-md mx-auto">
                          Thank you, <strong className="text-[#D4AF6A]">{submittedData?.fullName}</strong>! We have
                          recorded your interest for <span className="text-[#D4AF6A]">{submittedData?.eventType}</span> on{' '}
                          <span className="text-[#D4AF6A]">{submittedData?.preferredDate}</span>.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#12352B]/60 text-xs text-[#F7F3EA]/80 text-left border border-[#D4AF6A]/20 space-y-1">
                        <p><strong>Phone:</strong> {submittedData?.phone}</p>
                        {submittedData?.guestCount && <p><strong>Estimated Guests:</strong> {submittedData?.guestCount}</p>}
                        {submittedData?.message && <p><strong>Notes:</strong> {submittedData?.message}</p>}
                      </div>
                      <p className="text-xs text-[#F7F3EA]/60 italic">
                        Want an instant response? You can also forward these details directly to our WhatsApp.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <a
                          id="contact-success-whatsapp-btn"
                          href={getWhatsAppMessageUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Send Via WhatsApp</span>
                        </a>
                        <button
                          id="contact-new-enquiry-btn"
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormData({
                              fullName: '',
                              phone: '',
                              eventType: 'Wedding & Reception',
                              preferredDate: '',
                              guestCount: '',
                              message: '',
                            });
                          }}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/30 text-[#F7F3EA] text-xs font-medium tracking-wider uppercase"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      id="page-enquiry-form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                          }}
                          placeholder="e.g. Samuel Pam / Chinedu Eze / Aisha Bello"
                          className={`w-full px-4 py-3 rounded-xl bg-[#0A211A] border text-sm text-[#F7F3EA] placeholder-[#F7F3EA]/30 focus:outline-none focus:border-[#D4AF6A] transition-colors ${
                            errors.fullName ? 'border-rose-500' : 'border-[#D4AF6A]/30'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5"
                        >
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          placeholder="e.g. +234 803 123 4567"
                          className={`w-full px-4 py-3 rounded-xl bg-[#0A211A] border text-sm text-[#F7F3EA] placeholder-[#F7F3EA]/30 focus:outline-none focus:border-[#D4AF6A] transition-colors ${
                            errors.phone ? 'border-rose-500' : 'border-[#D4AF6A]/30'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* Event Type & Preferred Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="eventType"
                            className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5"
                          >
                            Event Type *
                          </label>
                          <select
                            id="eventType"
                            value={formData.eventType}
                            onChange={(e) =>
                              setFormData({ ...formData, eventType: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-[#0A211A] border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A] transition-colors"
                          >
                            <option value="Wedding & Reception">Wedding & Reception</option>
                            <option value="Private Celebration">Private Celebration (Birthday/Anniversary)</option>
                            <option value="Corporate Event">Corporate Event / Gala</option>
                            <option value="Social Gathering">Social Gathering / Reunion</option>
                            <option value="Garden Occasion">Garden Occasion / Picnic</option>
                            <option value="Venue Hire Only">Venue Hire Only</option>
                            <option value="Decoration & Catering Consultation">Decoration & Catering Consultation</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="preferredDate"
                            className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5"
                          >
                            Preferred Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              id="preferredDate"
                              value={formData.preferredDate}
                              onChange={(e) => {
                                setFormData({ ...formData, preferredDate: e.target.value });
                                if (errors.preferredDate)
                                  setErrors({ ...errors, preferredDate: undefined });
                              }}
                              className={`w-full px-4 py-3 rounded-xl bg-[#0A211A] border text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A] transition-colors ${
                                errors.preferredDate ? 'border-rose-500' : 'border-[#D4AF6A]/30'
                              }`}
                            />
                          </div>
                          {errors.preferredDate && (
                            <p className="text-[11px] text-rose-400 mt-1">
                              {errors.preferredDate}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Guest Count */}
                      <div>
                        <label
                          htmlFor="guestCount"
                          className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5"
                        >
                          Estimated Guests (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="guestCount"
                            value={formData.guestCount}
                            onChange={(e) =>
                              setFormData({ ...formData, guestCount: e.target.value })
                            }
                            placeholder="e.g. 200 guests"
                            className="w-full px-4 py-3 rounded-xl bg-[#0A211A] border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] placeholder-[#F7F3EA]/30 focus:outline-none focus:border-[#D4AF6A] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5"
                        >
                          Message / Special Requests
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Tell us about your event theme, schedule, catering preferences..."
                          className="w-full px-4 py-3 rounded-xl bg-[#0A211A] border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] placeholder-[#F7F3EA]/30 focus:outline-none focus:border-[#D4AF6A] transition-colors resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        id="contact-page-submit-btn"
                        disabled={submitting}
                        className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        <Send className="w-4 h-4" />
                        <span>{submitting ? 'SENDING...' : 'SEND ENQUIRY'}</span>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
