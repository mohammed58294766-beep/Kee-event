import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { BookingFormData } from '../types';

export interface ContactBookingSectionRef {
  prefillEventType: (type: string) => void;
}

export const ContactBookingSection = forwardRef<ContactBookingSectionRef, {}>((_, ref) => {
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
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  useImperativeHandle(ref, () => ({
    prefillEventType: (type: string) => {
      setFormData((prev) => ({ ...prev, eventType: type }));
    },
  }));

  const validate = () => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter a valid phone number.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Phone number must be at least 8 digits.';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select your preferred date.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  const getWhatsAppMessageUrl = () => {
    if (!submittedData) return VENUE_INFO.whatsAppHref;
    const text = encodeURIComponent(
      `Hello Kee Event & Garden,\n\nI would like to enquire about booking your venue in Jos:\n` +
        `  Name: ${submittedData.fullName}\n` +
        `  Phone: ${submittedData.phone}\n` +
        `  Event Type: ${submittedData.eventType}\n` +
        `  Preferred Date: ${submittedData.preferredDate}\n` +
        (submittedData.guestCount ? `  Estimated Guests: ${submittedData.guestCount}\n` : '') +
        (submittedData.message ? `  Notes: ${submittedData.message}\n` : '') +
        `\nPlease let me know your availability.`
    );
    return `https://wa.me/2348037006260?text=${text}`;
  };

  return (
    <section id="booking" className="py-24 sm:py-32 bg-[#0A211A] relative border-t border-[#12352B]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#12352B]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
            Let s Make Your Next Event Memorable.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/75 font-sans font-light">
            Tell us about your occasion and get in touch with the Kee Event and Garden team.
          </p>

          {/* TWO DIRECT ACTION BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="booking-call-kee-btn"
              href={VENUE_INFO.phoneHref}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-[0_8px_20px_rgba(212,175,106,0.25)] flex items-center justify-center gap-3"
            >
              <Phone className="w-4 h-4" />
              <span>CALL KEE ({VENUE_INFO.phoneDisplay})</span>
            </a>
            <a
              id="booking-chat-whatsapp-btn"
              href={VENUE_INFO.whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase active:scale-95 transition-all shadow-[0_8px_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>

        {/* 2-Column Layout: Details on Left, Enquiry Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Left Column: Venue Contact & Location Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#12352B]/40 border border-[#D4AF6A]/30 backdrop-blur-sm space-y-6">
              <h3 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium">
                Venue Information
              </h3>

              {/* Phone info */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center text-[#D4AF6A] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
                    Direct Phone Line
                  </p>
                  <a
                    id="info-phone-link"
                    href={VENUE_INFO.phoneHref}
                    className="text-base font-medium text-[#F7F3EA] hover:text-[#D4AF6A] transition-colors"
                  >
                    {VENUE_INFO.phoneDisplay}
                  </a>
                  <p className="text-xs text-[#F7F3EA]/50 mt-0.5">Calls & enquiries</p>
                </div>
              </div>

              {/* WhatsApp info */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0A211A] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                    WhatsApp Chat
                  </p>
                  <a
                    id="info-whatsapp-link"
                    href={VENUE_INFO.whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-[#F7F3EA] hover:text-emerald-400 transition-colors"
                  >
                    {VENUE_INFO.phoneDisplay}
                  </a>
                  <p className="text-xs text-[#F7F3EA]/50 mt-0.5">Quick booking enquiries</p>
                </div>
              </div>

              {/* Location info */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center text-[#D4AF6A] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
                    Venue Address
                  </p>
                  <p className="text-sm text-[#F7F3EA]/90 leading-relaxed mt-0.5 font-light">
                    Justice Akanbi Close, behind St. Piran Church, close to Tuscany, Jos, Plateau
                    State, Nigeria
                  </p>
                </div>
              </div>

              {/* Hours info */}
              <div className="flex items-start gap-4 pt-2 border-t border-[#12352B]">
                <div className="w-10 h-10 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center text-[#D4AF6A] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
                    Venue Visits
                  </p>
                  <p className="text-xs text-[#F7F3EA]/70 mt-0.5">
                    {VENUE_INFO.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Map Guide */}
            <div className="p-6 rounded-3xl bg-[#12352B]/30 border border-[#D4AF6A]/20 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#D4AF6A] uppercase tracking-widest">
                  Location Guide
                </span>
                <span className="text-[11px] text-[#F7F3EA]/60">Jos Central Area</span>
              </div>
              <p className="text-xs text-[#F7F3EA]/70 font-light leading-relaxed">
                Easily accessible in Jos, located behind the notable St. Piran Church landmark and
                close to Tuscany restaurant. Ample parking available on-site for guest convoys.
              </p>
              <a
                id="open-google-maps-btn"
                href="https://www.google.com/maps/search/?api=1&query=Justice+Akanbi+Close+St+Piran+Church+Jos+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs text-[#D4AF6A] hover:text-[#E5C98A] uppercase tracking-wider font-medium"
              >
                <span>View Area On Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Booking / Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#12352B]/50 border border-[#D4AF6A]/30 backdrop-blur-md shadow-2xl">
              <div className="mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F3EA] uppercase font-medium">
                  Event Enquiry Form
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F3EA]/70 mt-1 font-sans font-light">
                  Fill in your event details below to initiate your booking discussion with our team.
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
                        Enquiry Summary Prepared
                      </h4>
                      <p className="text-sm text-[#F7F3EA]/80 mt-2 max-w-md mx-auto">
                        Thank you, <strong className="text-[#D4AF6A]">{submittedData?.fullName}</strong>! Your
                        event enquiry details for <span className="text-[#D4AF6A]">{submittedData?.eventType}</span> on{' '}
                        <span className="text-[#D4AF6A]">{submittedData?.preferredDate}</span> have been generated.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#12352B]/60 text-xs text-[#F7F3EA]/80 text-left border border-[#D4AF6A]/20 space-y-1">
                      <p><strong>Contact:</strong> {submittedData?.phone}</p>
                      {submittedData?.guestCount && <p><strong>Estimated Guests:</strong> {submittedData?.guestCount}</p>}
                      {submittedData?.message && <p><strong>Notes:</strong> {submittedData?.message}</p>}
                    </div>
                    <p className="text-xs text-[#F7F3EA]/60 italic">
                      For immediate response and date holding, forward your booking request directly to our WhatsApp or call us.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        id="form-success-whatsapp-btn"
                        href={getWhatsAppMessageUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send Details Via WhatsApp</span>
                      </a>
                      <button
                        id="form-reset-btn"
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
                    id="event-enquiry-form"
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
                      <input
                        type="text"
                        id="guestCount"
                        value={formData.guestCount}
                        onChange={(e) =>
                          setFormData({ ...formData, guestCount: e.target.value })
                        }
                        placeholder="e.g. 150 guests"
                        className="w-full px-4 py-3 rounded-xl bg-[#0A211A] border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] placeholder-[#F7F3EA]/30 focus:outline-none focus:border-[#D4AF6A] transition-colors"
                      />
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
                        placeholder="Tell us about your event vision, catering needs, or timing..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0A211A] border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] placeholder-[#F7F3EA]/30 focus:outline-none focus:border-[#D4AF6A] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="submit-enquiry-btn"
                      className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>SEND ENQUIRY</span>
                    </button>
                    <p className="text-[11px] text-center text-[#F7F3EA]/45 font-sans mt-2">
                      Prompt personal response from the Kee Event and Garden team in Jos.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
