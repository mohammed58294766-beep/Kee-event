import React, { useState } from 'react';
import {
  Save,
  Sparkles,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Layers,
  Heart,
  Calendar,
  Grid,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useContent } from '../../context/ContentContext';

export const AdminPagesEditorPage: React.FC = () => {
  const { content, updateSection, saveAllChanges } = useContent();
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'venue' | 'services' | 'gallery' | 'footer'>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Local state copies for fast editing
  const [heroSlides, setHeroSlides] = useState(content.heroSlides || []);
  const [about, setAbout] = useState(content.about || {});
  const [homepage, setHomepage] = useState(content.homepage || {});
  const [venue, setVenue] = useState(content.venue || {});
  const [services, setServices] = useState(
    Array.isArray(content.services)
      ? { services: content.services }
      : content.services || { services: [] }
  );
  const [gallery, setGallery] = useState(
    Array.isArray(content.gallery)
      ? { items: content.gallery }
      : content.gallery || { items: [] }
  );
  const [footer, setFooter] = useState(content.footer || {});

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      updateSection('heroSlides', heroSlides);
      updateSection('about', about);
      updateSection('homepage', homepage);
      updateSection('venue', venue);
      updateSection('services', services);
      updateSection('gallery', gallery);
      updateSection('footer', footer);

      const ok = await saveAllChanges();
      if (ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setSaveError('Failed to persist content changes to database.');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Error saving changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout title="Pages & Content Editor">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/25">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'hero'
                  ? 'bg-[#D4AF6A] text-[#0A211A]'
                  : 'bg-[#12352B]/60 text-[#F7F3EA]/70 hover:text-[#F7F3EA]'
              }`}
            >
              Hero Carousel
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'about'
                  ? 'bg-[#D4AF6A] text-[#0A211A]'
                  : 'bg-[#12352B]/60 text-[#F7F3EA]/70 hover:text-[#F7F3EA]'
              }`}
            >
              About & Story
            </button>
            <button
              onClick={() => setActiveTab('venue')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'venue'
                  ? 'bg-[#D4AF6A] text-[#0A211A]'
                  : 'bg-[#12352B]/60 text-[#F7F3EA]/70 hover:text-[#F7F3EA]'
              }`}
            >
              Venue Spaces
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'services'
                  ? 'bg-[#D4AF6A] text-[#0A211A]'
                  : 'bg-[#12352B]/60 text-[#F7F3EA]/70 hover:text-[#F7F3EA]'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#D4AF6A] text-[#0A211A]'
                  : 'bg-[#12352B]/60 text-[#F7F3EA]/70 hover:text-[#F7F3EA]'
              }`}
            >
              Gallery Items
            </button>
            <button
              onClick={() => setActiveTab('footer')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'footer'
                  ? 'bg-[#D4AF6A] text-[#0A211A]'
                  : 'bg-[#12352B]/60 text-[#F7F3EA]/70 hover:text-[#F7F3EA]'
              }`}
            >
              Footer & Meta
            </button>
          </div>

          {/* Save Action */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {saveSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
            {saveError && (
              <span className="text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {saveError}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-wider uppercase hover:brightness-105 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving Changes...' : 'Save All Changes'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: HERO SLIDES */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] uppercase font-medium">
                  Homepage Hero Slides
                </h3>
                <p className="text-xs text-[#F7F3EA]/60 mt-0.5">
                  Full-screen slides showcasing Kee Event and Garden. Edit captions, photography, or add video loops.
                </p>
              </div>
              <button
                onClick={() => {
                  const newSlide = {
                    id: `slide-${Date.now()}`,
                    badge: 'Kee Event and Garden',
                    title: 'A New Celebration Awaits',
                    subtitle: 'Experience Jos Premier Event Grounds',
                    description: 'Lush greenery and distinguished event hospitality.',
                    mediaType: 'image',
                    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85',
                  };
                  setHeroSlides([...heroSlides, newSlide]);
                }}
                className="px-4 py-2 rounded-xl bg-[#12352B] border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:bg-[#153E33]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Slide</span>
              </button>
            </div>

            <div className="space-y-6">
              {heroSlides.map((slide: any, index: number) => (
                <div
                  key={slide.id || index}
                  className="p-6 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/20 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#12352B] pb-3">
                    <span className="text-xs font-semibold text-[#D4AF6A] uppercase tracking-wider">
                      Slide #{index + 1}
                    </span>
                    {heroSlides.length > 1 && (
                      <button
                        onClick={() => {
                          setHeroSlides(heroSlides.filter((_: any, i: number) => i !== index));
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                        Slide Title
                      </label>
                      <input
                        type="text"
                        value={slide.title || ''}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[index].title = e.target.value;
                          setHeroSlides(updated);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                        Subtitle / Accent
                      </label>
                      <input
                        type="text"
                        value={slide.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[index].subtitle = e.target.value;
                          setHeroSlides(updated);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={slide.description || ''}
                      onChange={(e) => {
                        const updated = [...heroSlides];
                        updated[index].description = e.target.value;
                        setHeroSlides(updated);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                        Media Type
                      </label>
                      <select
                        value={slide.mediaType || 'image'}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[index].mediaType = e.target.value;
                          setHeroSlides(updated);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none"
                      >
                        <option value="image">Image (URL or Upload)</option>
                        <option value="video">Video (MP4 Loop)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                        Image or Video URL
                      </label>
                      <input
                        type="text"
                        value={slide.image || slide.video || ''}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          if (slide.mediaType === 'video') {
                            updated[index].video = e.target.value;
                          } else {
                            updated[index].image = e.target.value;
                          }
                          setHeroSlides(updated);
                        }}
                        placeholder="https://... or /uploads/..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT STORY */}
        {activeTab === 'about' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/20 space-y-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] uppercase font-medium">
                About Story & Editorial Copy
              </h3>
              <p className="text-xs text-[#F7F3EA]/60 mt-0.5">
                Configure the brand narrative, heritage in Jos, and editorial photography.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                  About Hero Title
                </label>
                <input
                  type="text"
                  value={about.heroTitle || about.heading || ''}
                  onChange={(e) => setAbout({ ...about, heroTitle: e.target.value, heading: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={about.heroSubtitle || about.subheading || ''}
                  onChange={(e) => setAbout({ ...about, heroSubtitle: e.target.value, subheading: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                Story Heading
              </label>
              <input
                type="text"
                value={about.storyHeading || ''}
                onChange={(e) => setAbout({ ...about, storyHeading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                Story Paragraph 1
              </label>
              <textarea
                rows={3}
                value={about.storyParagraph1 || about.introParagraph || ''}
                onChange={(e) => setAbout({ ...about, storyParagraph1: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A] resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                Story Paragraph 2
              </label>
              <textarea
                rows={3}
                value={about.storyParagraph2 || ''}
                onChange={(e) => setAbout({ ...about, storyParagraph2: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                  Story Feature Image URL
                </label>
                <input
                  type="text"
                  value={about.storyImage || ''}
                  onChange={(e) => setAbout({ ...about, storyImage: e.target.value })}
                  placeholder="https://... or /uploads/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                  Optional Story Video URL
                </label>
                <input
                  type="text"
                  value={about.storyVideo || ''}
                  onChange={(e) => setAbout({ ...about, storyVideo: e.target.value })}
                  placeholder="https://... or /uploads/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VENUE SPACES */}
        {activeTab === 'venue' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] uppercase font-medium">
                Venue Spaces & Grounds
              </h3>
              <p className="text-xs text-[#F7F3EA]/60 mt-0.5">
                Update details, settings, and media for the lawn, pavilion, and terrace spaces.
              </p>
            </div>

            <div className="space-y-6">
              {(venue.spaces || []).map((space: any, index: number) => (
                <div
                  key={space.id || index}
                  className="p-6 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/20 space-y-4"
                >
                  <span className="text-xs font-semibold text-[#D4AF6A] uppercase tracking-wider block">
                    Space: {space.name}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                        Space Name
                      </label>
                      <input
                        type="text"
                        value={space.name || ''}
                        onChange={(e) => {
                          const updated = [...(venue.spaces || [])];
                          updated[index].name = e.target.value;
                          setVenue({ ...venue, spaces: updated });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                        Setting / Tag
                      </label>
                      <input
                        type="text"
                        value={space.setting || ''}
                        onChange={(e) => {
                          const updated = [...(venue.spaces || [])];
                          updated[index].setting = e.target.value;
                          setVenue({ ...venue, spaces: updated });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={space.description || ''}
                      onChange={(e) => {
                        const updated = [...(venue.spaces || [])];
                        updated[index].description = e.target.value;
                        setVenue({ ...venue, spaces: updated });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                      Media URL (Image or MP4)
                    </label>
                    <input
                      type="text"
                      value={space.image || ''}
                      onChange={(e) => {
                        const updated = [...(venue.spaces || [])];
                        updated[index].image = e.target.value;
                        setVenue({ ...venue, spaces: updated });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] uppercase font-medium">
                Event Services & Hospitality
              </h3>
              <p className="text-xs text-[#F7F3EA]/60 mt-0.5">
                Edit service titles, descriptions, and feature bullet points.
              </p>
            </div>

            <div className="space-y-6">
              {(services.services || []).map((serv: any, index: number) => (
                <div
                  key={serv.id || index}
                  className="p-6 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/20 space-y-4"
                >
                  <span className="text-xs font-semibold text-[#D4AF6A] uppercase tracking-wider block">
                    Service: {serv.title}
                  </span>

                  <div>
                    <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={serv.title || ''}
                      onChange={(e) => {
                        const updated = [...(services.services || [])];
                        updated[index].title = e.target.value;
                        setServices({ ...services, services: updated });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={serv.description || ''}
                      onChange={(e) => {
                        const updated = [...(services.services || [])];
                        updated[index].description = e.target.value;
                        setServices({ ...services, services: updated });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY ITEMS */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] uppercase font-medium">
                  Gallery Visual Moments
                </h3>
                <p className="text-xs text-[#F7F3EA]/60 mt-0.5">
                  Curate real event photography and videos displayed across the website.
                </p>
              </div>
              <button
                onClick={() => {
                  const newItem = {
                    id: `gallery-${Date.now()}`,
                    title: 'New Celebration Highlight',
                    category: 'weddings',
                    categoryLabel: 'Weddings',
                    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
                    caption: 'Beautiful moments created at Kee Event and Garden in Jos.',
                  };
                  const currentList = gallery.items || [];
                  setGallery({ ...gallery, items: [newItem, ...currentList] });
                }}
                className="px-4 py-2 rounded-xl bg-[#12352B] border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:bg-[#153E33]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(gallery.items || []).map((item: any, index: number) => (
                <div
                  key={item.id || index}
                  className="p-5 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/20 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#D4AF6A] uppercase tracking-wider">
                        #{index + 1} • {item.categoryLabel || item.category}
                      </span>
                      <button
                        onClick={() => {
                          const updated = (gallery.items || []).filter((_: any, i: number) => i !== index);
                          setGallery({ ...gallery, items: updated });
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#12352B] relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => {
                          const updated = [...(gallery.items || [])];
                          updated[index].title = e.target.value;
                          setGallery({ ...gallery, items: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-xs text-[#F7F3EA] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                        Category
                      </label>
                      <select
                        value={item.category || 'weddings'}
                        onChange={(e) => {
                          const updated = [...(gallery.items || [])];
                          updated[index].category = e.target.value;
                          const labels: Record<string, string> = {
                            weddings: 'Weddings',
                            garden: 'Garden & Lawns',
                            decor: 'Decoration',
                            celebrations: 'Celebrations',
                          };
                          updated[index].categoryLabel = labels[e.target.value] || 'Celebrations';
                          setGallery({ ...gallery, items: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-xs text-[#F7F3EA] focus:outline-none"
                      >
                        <option value="weddings">Weddings</option>
                        <option value="garden">Garden & Lawns</option>
                        <option value="decor">Decoration</option>
                        <option value="celebrations">Celebrations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                        Image / Media URL
                      </label>
                      <input
                        type="text"
                        value={item.image || ''}
                        onChange={(e) => {
                          const updated = [...(gallery.items || [])];
                          updated[index].image = e.target.value;
                          setGallery({ ...gallery, items: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-xs text-[#F7F3EA] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FOOTER & META */}
        {activeTab === 'footer' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/20 space-y-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] uppercase font-medium">
                Footer & Metadata Details
              </h3>
              <p className="text-xs text-[#F7F3EA]/60 mt-0.5">
                Customize the global footer text and copyright note.
              </p>
            </div>

            <div>
              <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                Footer Brand Title
              </label>
              <input
                type="text"
                value={footer.title || 'KEE EVENT & GARDEN'}
                onChange={(e) => setFooter({ ...footer, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                About / Tagline Text
              </label>
              <textarea
                rows={3}
                value={footer.aboutText || ''}
                onChange={(e) => setFooter({ ...footer, aboutText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase text-[#D4AF6A] font-semibold mb-1">
                Copyright Note
              </label>
              <input
                type="text"
                value={footer.copyright || ''}
                onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/50 border border-[#D4AF6A]/25 text-sm text-[#F7F3EA] focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
