import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Video as VideoIcon,
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/venueData';
import { GalleryItem } from '../types';
import { useContent } from '../context/ContentContext';
import { EditorialMedia } from './EditorialMedia';

interface GallerySectionProps {
  onPlanEvent: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onPlanEvent }) => {
  const { content } = useContent();
  const galleryData = content.gallery || {};
  const allItems: GalleryItem[] = Array.isArray(galleryData) && galleryData.length > 0
    ? galleryData
    : (galleryData?.items && galleryData.items.length > 0 ? galleryData.items : GALLERY_ITEMS);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'garden', label: 'Garden & Lawns' },
    { id: 'decor', label: 'Decoration' },
    { id: 'celebrations', label: 'Celebrations' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (item: GalleryItem) => {
    const globalIdx = allItems.findIndex((g) => g.id === item.id);
    setSelectedImageIndex(globalIdx !== -1 ? globalIdx : 0);
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % allItems.length);
    }
  }, [selectedImageIndex, allItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + allItems.length) % allItems.length
      );
    }
  }, [selectedImageIndex, allItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleCloseLightbox, handleNext, handlePrev]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImageIndex]);

  const currentItem = selectedImageIndex !== null ? allItems[selectedImageIndex] : null;

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#0A211A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#F7F3EA] uppercase">
              Captured Moments At Kee
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#F7F3EA]/70 font-sans font-light max-w-xl">
              Immerse yourself in real atmospheres, lush garden walks, romantic twilight decor, and
              joyous memories created in Jos.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`gallery-filter-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#D4AF6A] text-[#0A211A] font-semibold'
                      : 'bg-[#12352B]/80 text-[#F7F3EA]/70 hover:text-[#F7F3EA] border border-[#D4AF6A]/20'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry-Like Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const isTall = idx % 3 === 0;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-3xl overflow-hidden border border-[#D4AF6A]/25 bg-[#12352B] group cursor-pointer shadow-lg hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ${
                  isTall ? 'sm:row-span-1 lg:h-[420px]' : 'lg:h-[340px]'
                } h-[300px]`}
                onClick={() => handleOpenLightbox(item)}
              >
                <EditorialMedia
                  mediaType={item.mediaType || (item.video ? 'video' : 'image')}
                  image={item.image}
                  video={item.video}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {/* Refined gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A211A]/90 via-[#0A211A]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-[#0A211A]/80 backdrop-blur-md border border-[#D4AF6A]/30 text-[#D4AF6A] text-[10px] uppercase font-semibold tracking-wider">
                    {item.categoryLabel}
                  </span>
                  {(item.mediaType === 'video' || item.video) && (
                    <span className="p-1 rounded-full bg-[#0A211A]/80 backdrop-blur-md border border-[#D4AF6A]/30 text-[#D4AF6A]">
                      <VideoIcon className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Hover Expand Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0A211A]/80 border border-[#D4AF6A]/40 flex items-center justify-center text-[#D4AF6A] opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Caption & Title Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-serif text-lg sm:text-xl text-[#F7F3EA] font-medium leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F7F3EA]/70 mt-1 line-clamp-2 font-sans font-light">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gallery Footer Note & CTA */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#F7F3EA]/60 uppercase tracking-widest font-sans mb-4">
            Want to see the venue in person? We welcome guided walkthroughs.
          </p>
          <button
            id="gallery-schedule-visit-btn"
            onClick={onPlanEvent}
            className="px-8 py-3.5 rounded-full bg-[#12352B] hover:bg-[#D4AF6A] text-[#D4AF6A] hover:text-[#0A211A] border border-[#D4AF6A]/40 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
          >
            Plan An Event / Schedule A Visit
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
            onClick={handleCloseLightbox}
          >
            {/* Top Toolbar */}
            <div
              className="relative z-10 flex items-center justify-between max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#D4AF6A] tracking-widest uppercase">
                  {currentItem.categoryLabel}
                </span>
                <span className="text-xs text-[#F7F3EA]/40">|</span>
                <span className="text-xs text-[#F7F3EA]/70 tracking-widest">
                  {selectedImageIndex + 1} / {allItems.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                id="lightbox-close-btn"
                onClick={handleCloseLightbox}
                className="w-11 h-11 rounded-full bg-[#12352B] border border-[#D4AF6A]/40 text-[#F7F3EA] hover:text-[#D4AF6A] hover:border-[#D4AF6A] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Center Image Container with Prev & Next */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                id="lightbox-prev-btn"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-[#0A211A]/80 border border-[#D4AF6A]/40 text-[#D4AF6A] hover:bg-[#D4AF6A] hover:text-[#0A211A] flex items-center justify-center transition-all cursor-pointer shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Media Frame */}
              <div className="relative max-h-[75vh] max-w-full rounded-2xl overflow-hidden border border-[#D4AF6A]/30 shadow-2xl flex items-center justify-center">
                {(currentItem.mediaType === 'video' || currentItem.video) ? (
                  <video
                    src={currentItem.video || currentItem.image}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[75vh] w-auto max-w-full object-contain select-none rounded-2xl"
                  />
                ) : (
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="max-h-[75vh] w-auto object-contain select-none"
                  />
                )}
              </div>

              {/* Next Button */}
              <button
                id="lightbox-next-btn"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-[#0A211A]/80 border border-[#D4AF6A]/40 text-[#D4AF6A] hover:bg-[#D4AF6A] hover:text-[#0A211A] flex items-center justify-center transition-all cursor-pointer shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div
              className="relative z-10 max-w-2xl w-full mx-auto text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] font-medium">
                {currentItem.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#F7F3EA]/70 mt-1 font-sans font-light">
                {currentItem.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
