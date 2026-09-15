export interface HeroSlide {
  id: string;
  image: string;
  video?: string;
  mediaType?: 'image' | 'video';
  alt: string;
  tagline: string;
  title: string;
}

export interface EventExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  mediaType?: 'image' | 'video';
  highlights: string[];
  capacityHint: string;
}

export interface VenueSpace {
  id: string;
  name: string;
  setting: 'Outdoor Garden' | 'Covered Pavilion' | 'Private Lounge' | 'Full Estate' | string;
  description: string;
  image: string;
  video?: string;
  mediaType?: 'image' | 'video';
  features: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  details?: string[];
  image?: string;
  video?: string;
  mediaType?: 'image' | 'video';
  headline?: string;
  highlights?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'weddings' | 'garden' | 'decor' | 'celebrations' | string;
  categoryLabel?: string;
  image: string;
  video?: string;
  mediaType?: 'image' | 'video';
  caption?: string;
}

export interface WhyChoosePoint {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  estimatedGuests?: string;
  guestCount?: string;
  message?: string;
}

export interface EnquiryRecord {
  id: string;
  fullName: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  estimatedGuests?: string;
  message?: string;
  createdAt: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Closed';
  adminNotes?: string;
}

export interface MediaRecord {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
  usageCount?: number;
}

export type EnquiryItem = {
  id: string;
  fullName: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  guestCount?: string;
  estimatedGuests?: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'booked' | 'archived' | string;
};

export type MediaItem = {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
};

export interface SiteSettings {
  businessName: string;
  tagline: string;
  city: string;
  address: string;
  landmark: string;
  phoneRaw: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsAppHref: string;
  email: string;
  workingHours: string;
  customLogoUrl?: string;
  faviconUrl?: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
}

export interface FooterSettings {
  title: string;
  subtitle: string;
  aboutText: string;
  locationNote: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsAppHref: string;
  copyright: string;
}

export interface SeoItem {
  title: string;
  metaDescription: string;
  socialImage: string;
}

export interface SeoSettings {
  home: SeoItem;
  about: SeoItem;
  venue: SeoItem;
  services: SeoItem;
  gallery: SeoItem;
  contact: SeoItem;
}

export interface HomepageContent {
  heroTagline: string;
  heroHeadline: string;
  heroSupportingText: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  heroSlides: HeroSlide[];
  introHeading: string;
  introSubtitle: string;
  introText: string;
  introImage?: string;
  introVideo?: string;
  introMediaType?: 'image' | 'video';
}

export interface AboutContent {
  heading: string;
  subheading: string;
  introParagraph: string;
  storyParagraph1: string;
  storyParagraph2: string;
  ctaHeading: string;
  ctaText: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  storyImage?: string;
  storyVideo?: string;
  storyMediaType?: 'image' | 'video';
  mediaType?: 'image' | 'video';
}

export interface VenueContent {
  heroImage: string;
  heroVideo?: string;
  heroMediaType?: 'image' | 'video';
  title: string;
  subtitle: string;
  description: string;
  spaces: VenueSpace[];
}

export interface ManagedServiceItem extends ServiceItem {
  enabled?: boolean;
}

export interface ManagedGalleryItem extends GalleryItem {
  order?: number;
}

export interface AllWebsiteContent {
  siteSettings: SiteSettings;
  socialLinks: SocialLinks;
  navigation: NavigationItem[];
  footer: FooterSettings;
  seo: SeoSettings;
  homepage: any;
  about: any;
  venue: any;
  services: any;
  gallery: any;
}
