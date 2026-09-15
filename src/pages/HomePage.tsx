import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Building2,
  Wand2,
  UtensilsCrossed,
  Armchair,
  MessageCircle,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { VENUE_INFO, VENUE_SPACES, VENUE_SERVICES, GALLERY_ITEMS, EVENT_EXPERIENCES } from '../data/venueData';
import { useContent } from '../context/ContentContext';
import { EditorialMedia } from '../components/EditorialMedia';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { content } = useContent();
  const homepage = content.homepage || {};
  const siteSettings = content.siteSettings || VENUE_INFO;
  const spaces = (content.venue?.spaces && content.venue.spaces.length > 0) ? content.venue.spaces : VENUE_SPACES;
  const services = Array.isArray(content.services) && content.services.length > 0
    ? content.services
    : (content.services?.services && content.services.services.length > 0 ? content.services.services : VENUE_SERVICES);
  const galleryItems = Array.isArray(content.gallery) && content.gallery.length > 0
    ? content.gallery
    : (content.gallery?.items && content.gallery.items.length > 0 ? content.gallery.items : GALLERY_ITEMS);
  const experiences = (homepage.experiences && homepage.experiences.length > 0) ? homepage.experiences : EVENT_EXPERIENCES;

  return (
    <div className="w-full bg-[#0A211A] text-[#F7F3EA] overflow-hidden">
      {/* 1. Full-Screen Cinematic Hero */}
      <Hero
        onPlanEvent={() => navigate('/contact')}
        onExploreVenue={() => navigate('/venue')}
      />

      {/* 2. Introduction & About Kee Preview */}
      <section id="home-intro" className="py-24 sm:py-32 bg-[#0A211A] relative border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image Composition */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#D4AF6A]/25 shadow-2xl bg-[#12352B] aspect-[4/5] sm:aspect-[5/6] group">
                <EditorialMedia
                  mediaType={homepage.introMediaType || (homepage.introVideo ? 'video' : 'image')}
                  image={homepage.introImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"}
                  video={homepage.introVideo}
                  alt="Kee Event and Garden wedding grounds Jos"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/85 via-transparent to-transparent pointer-events-none" />

                {/* Location Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0A211A]/90 backdrop-blur-md border border-[#D4AF6A]/30 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#12352B] text-[#D4AF6A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#D4AF6A] uppercase tracking-wider">
                      Scenic Jos Setting
                    </p>
                    <p className="text-xs text-[#F7F3EA]/80 mt-0.5 leading-snug">
                      Justice Akanbi Close, behind St. Piran Church, close to Tuscany, Jos
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-40 h-40 rounded-3xl border border-[#D4AF6A]/30 -z-10 pointer-events-none" />
            </motion.div>

            {/* Right Column: Editorial Intro */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Kee</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.15]">
                {homepage.introHeading ? (
                  homepage.introHeading.includes('The Right Setting') ? (
                    <>
                      {homepage.introHeading.replace(/The Right Setting\.?/i, '')} <br />
                      <span className="text-[#D4AF6A] italic">The Right Setting.</span>
                    </>
                  ) : (
                    homepage.introHeading
                  )
                ) : (
                  <>
                    Your Moment Deserves <br />
                    <span className="text-[#D4AF6A] italic">The Right Setting.</span>
                  </>
                )}
              </h2>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-[#F7F3EA]/80 font-sans font-light leading-relaxed">
                {homepage.introText ? (
                  <p>{homepage.introText}</p>
                ) : (
                  <>
                    <p>
                      Kee Event and Garden is a premier event destination nestled in the tranquil, cool
                      hills of Jos, Plateau State. Thoughtfully crafted to host meaningful gatherings, our
                      grounds offer a seamless blend of natural beauty and polished hospitality.
                    </p>
                    <p>
                      From joyous wedding receptions and milestone celebrations to executive corporate galas
                      and open-air garden occasions, we provide an expansive setting designed to make every
                      celebration feel effortless and memorable.
                    </p>
                  </>
                )}
              </div>

              {/* Offerings pills */}
              <div className="mt-6 grid grid-cols-2 gap-2 text-xs sm:text-sm text-[#F7F3EA]/90 pt-4 border-t border-[#12352B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF6A]" />
                  <span>Weddings & Ceremonies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF6A]" />
                  <span>Private Celebrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF6A]" />
                  <span>Corporate Gatherings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF6A]" />
                  <span>Garden & Lawn Occasions</span>
                </div>
              </div>

              {/* Action Preview Button */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  id="home-about-cta-btn"
                  to="/about"
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center gap-2"
                >
                  <span>DISCOVER OUR STORY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  id="home-about-explore-venue-btn"
                  to="/venue"
                  className="px-6 py-3.5 rounded-full bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/30 text-[#F7F3EA] text-xs font-medium tracking-[0.14em] uppercase transition-all"
                >
                  <span>EXPLORE VENUE</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Venue & Garden Preview */}
      <section className="py-24 sm:py-32 bg-[#081b15] relative border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Venue & Garden</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.1]">
                Versatile Indoor & <br />
                <span className="text-[#D4AF6A] italic">Outdoor Spaces</span>
              </h2>
              <p className="mt-4 text-base text-[#F7F3EA]/75 font-sans font-light">
                Discover manicured garden lawns, sheltered pavilions, and picturesque terraces designed
                to cater to both intimate gatherings and grand events in Jos.
              </p>
            </div>
            <Link
              id="home-discover-venue-btn"
              to="/venue"
              className="px-7 py-3.5 rounded-full bg-[#12352B] hover:bg-[#D4AF6A] text-[#D4AF6A] hover:text-[#0A211A] border border-[#D4AF6A]/30 text-xs font-semibold tracking-[0.16em] uppercase transition-all inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>DISCOVER OUR VENUE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Spaces Highlight Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {spaces.slice(0, 3).map((space: any, idx: number) => (
              <motion.div
                key={space.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group rounded-3xl overflow-hidden border border-[#D4AF6A]/20 bg-[#12352B]/40 flex flex-col justify-between hover:border-[#D4AF6A]/50 transition-all duration-500 shadow-xl"
              >
                <div>
                  <div className="aspect-[16/11] overflow-hidden relative">
                    <EditorialMedia
                      mediaType={space.mediaType || (space.video ? 'video' : 'image')}
                      image={space.image}
                      video={space.video}
                      alt={space.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A] via-transparent to-transparent opacity-80 pointer-events-none" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0A211A]/80 backdrop-blur-sm border border-[#D4AF6A]/30 text-[#D4AF6A] text-[11px] uppercase font-medium">
                      {space.setting}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium group-hover:text-[#D4AF6A] transition-colors">
                      {space.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#F7F3EA]/70 font-sans font-light line-clamp-3">
                      {space.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#12352B]/80 mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
                    Flexible Layouts
                  </span>
                  <Link
                    to="/venue"
                    className="text-xs text-[#F7F3EA]/60 group-hover:text-[#D4AF6A] transition-colors flex items-center gap-1 font-medium uppercase"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Events & Occasions Showcase */}
      <section className="py-24 sm:py-32 bg-[#0A211A] relative border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Event Celebrations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
              Occasions Made Extraordinary
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/70 font-sans font-light">
              Tailored event spaces ready to host life s most meaningful moments with sophistication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.slice(0, 3).map((exp: any, idx: number) => (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl p-6 bg-[#12352B]/40 border border-[#D4AF6A]/20 flex flex-col justify-between group hover:border-[#D4AF6A]/50 transition-all"
              >
                <div>
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5 relative">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-serif text-[#D4AF6A] italic">
                      {exp.subtitle}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium">
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#F7F3EA]/75 font-sans font-light leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#12352B] flex items-center justify-between">
                  <span className="text-[11px] text-[#F7F3EA]/50 uppercase tracking-wider">
                    {exp.capacityHint}
                  </span>
                  <Link
                    to="/contact"
                    className="text-xs text-[#D4AF6A] hover:text-[#E5C98A] font-semibold uppercase tracking-wider flex items-center gap-1"
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

      {/* 5. Services Preview */}
      <section className="py-24 sm:py-32 bg-[#081b15] relative border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Services</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.1]">
                Everything You Need <br />
                <span className="text-[#D4AF6A] italic">For A Flawless Event</span>
              </h2>
              <p className="mt-4 text-base text-[#F7F3EA]/75 font-sans font-light">
                From venue hire to decoration, catering, and event rentals, our in-house services bring your vision to life.
              </p>
            </div>
            <Link
              id="home-our-services-btn"
              to="/services"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-md inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>OUR SERVICES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service: any, idx: number) => (
              <motion.div
                key={service.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-[#12352B]/40 border border-[#D4AF6A]/20 flex flex-col justify-between hover:border-[#D4AF6A]/50 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/30 flex items-center justify-center text-[#D4AF6A] mb-5 group-hover:scale-105 transition-transform">
                    {idx === 0 && <Building2 className="w-5 h-5" />}
                    {idx === 1 && <Wand2 className="w-5 h-5" />}
                    {idx === 2 && <UtensilsCrossed className="w-5 h-5" />}
                    {idx === 3 && <Armchair className="w-5 h-5" />}
                  </div>
                  <h3 className="font-serif text-xl text-[#F7F3EA] uppercase font-medium">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#F7F3EA]/70 font-sans font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#12352B]/80 flex items-center justify-between">
                  <Link
                    to="/services"
                    className="text-xs text-[#D4AF6A] hover:text-[#E5C98A] font-medium tracking-wider uppercase flex items-center gap-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery Highlights Preview */}
      <section className="py-24 sm:py-32 bg-[#0A211A] relative border-t border-[#12352B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Captured Moments</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
                Glimpses Of Kee
              </h2>
              <p className="mt-3 text-base text-[#F7F3EA]/70 font-sans font-light max-w-xl">
                Experience the beauty of golden sunsets, romantic celebrations, and elegant setups in Jos.
              </p>
            </div>
            <Link
              id="home-view-gallery-btn"
              to="/gallery"
              className="px-7 py-3.5 rounded-full bg-[#12352B] hover:bg-[#D4AF6A] text-[#D4AF6A] hover:text-[#0A211A] border border-[#D4AF6A]/30 text-xs font-semibold tracking-[0.16em] uppercase transition-all inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>VIEW GALLERY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Curated Photo Highlights Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {galleryItems.slice(0, 4).map((item: any, idx: number) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#D4AF6A]/20 bg-[#12352B] group cursor-pointer shadow-lg"
                onClick={() => navigate('/gallery')}
              >
                <EditorialMedia
                  mediaType={item.mediaType || (item.video ? 'video' : 'image')}
                  image={item.image}
                  video={item.video}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/90 via-[#0A211A]/20 to-transparent opacity-75 group-hover:opacity-95 transition-opacity pointer-events-none" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0A211A]/80 border border-[#D4AF6A]/30 text-[#D4AF6A] text-[9px] uppercase font-semibold tracking-wider">
                    {item.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="font-serif text-lg text-[#F7F3EA] font-medium leading-snug">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Booking Call to Action */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#081b15] to-[#0A211A] relative border-t border-[#12352B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-16 rounded-3xl bg-[#12352B]/50 border border-[#D4AF6A]/30 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Begin Your Journey</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase leading-[1.15]">
              Let s Make Your Next Event Memorable.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F7F3EA]/80 font-sans font-light max-w-2xl mx-auto leading-relaxed">
              We invite you to reach out to the Kee Event and Garden team in Jos. Let us help you host
              an unforgettable wedding, celebration, or corporate gathering.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                id="home-final-plan-btn"
                to="/contact"
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <span>PLAN YOUR EVENT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                id="home-final-whatsapp-btn"
                href={siteSettings.whatsAppHref || VENUE_INFO.whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
            <p className="mt-6 text-xs text-[#F7F3EA]/50 font-sans">
              {siteSettings.address || 'Justice Akanbi Close, behind St. Piran Church, close to Tuscany, Jos'} • {siteSettings.phoneDisplay || '+234 803 700 6260'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
