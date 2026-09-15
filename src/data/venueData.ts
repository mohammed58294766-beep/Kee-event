import {
  HeroSlide,
  EventExperience,
  VenueSpace,
  ServiceItem,
  GalleryItem,
  WhyChoosePoint,
} from '../types';

export const VENUE_INFO = {
  name: 'KEE EVENT AND GARDEN',
  tagline: 'Where Moments Become Memories',
  city: 'Jos, Plateau State, Nigeria',
  address: 'Justice Akanbi Close, behind St. Piran Church, close to Tuscany, Jos, Plateau State, Nigeria',
  phoneRaw: '+2348037006260',
  phoneDisplay: '+234 803 700 6260',
  phoneHref: 'tel:+2348037006260',
  whatsAppHref: 'https://wa.me/2348037006260?text=Hello%20Kee%20Event%20and%20Garden,%20I%20would%20like%20to%20enquire%20about%20booking%20your%20venue.',
  email: 'info@keeeventandgarden.com',
  workingHours: 'Monday – Sunday: 8:00 AM – 9:00 PM (Tours by Appointment)',
};

// 3 High-End Hero Slides
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85',
    alt: 'Lush Garden Wedding Reception with warm illumination at Kee Event and Garden Jos',
    tagline: 'Jos, Plateau State',
    title: 'Exquisite Garden Weddings & Receptions',
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=85',
    alt: 'Grand banquet tables and luxury canopy setting under the evening Jos sky',
    tagline: 'Indoor & Outdoor Elegance',
    title: 'Unforgettable Private Celebrations & Banquets',
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=85',
    alt: 'Manicured green lawns and tranquil garden atmosphere in Jos',
    tagline: 'Serene Nature & Distinction',
    title: 'Corporate Galas, Retreats & Garden Occasions',
  },
];

// Experience categories
export const EVENT_EXPERIENCES: EventExperience[] = [
  {
    id: 'weddings',
    title: 'WEDDINGS',
    subtitle: 'Ceremonies, Receptions & After-Parties',
    description:
      'Turn your dream wedding into a timeless memory. With breathtaking manicured lawns, serene natural canopies, and customizable indoor & outdoor spaces, Kee offers the perfect romantic setting in Jos.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Lush garden bridal walk', 'Grand photo backdrops', 'Evening ambient lighting', 'Flexible banquet setups'],
    capacityHint: 'Suitable for intimate gatherings and grand celebrations',
  },
  {
    id: 'private-celebrations',
    title: 'PRIVATE CELEBRATIONS',
    subtitle: 'Birthdays, Anniversaries & Milestones',
    description:
      'Host memorable milestone birthdays, golden anniversaries, and family reunions surrounded by peaceful greenery and refined hospitality tailored to your guests.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Outdoor lounge zones', 'Cocktail & dinner configurations', 'Dedicated sound & DJ staging', 'Private parking'],
    capacityHint: 'Customized zones for 50 to 500+ guests',
  },
  {
    id: 'corporate-events',
    title: 'CORPORATE EVENTS',
    subtitle: 'Galas, Executive Retreats & Seminars',
    description:
      'Distinguish your organization with an inspiring venue. From high-level leadership retreats to annual dinners, awards galas, and corporate product launches.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Acoustic-friendly spaces', 'Power backup readiness', 'Spacious presentation layouts', 'Executive VIP hospitality'],
    capacityHint: 'Executive boardrooms to full-field setups',
  },
  {
    id: 'social-gatherings',
    title: 'SOCIAL GATHERINGS',
    subtitle: 'Alumni Reunions, Dinners & Festive Parties',
    description:
      'Gather friends, community associations, and cultural groups in a warm, welcoming environment with ample space for dining, dancing, and heartfelt conversations.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Scenic gathering pavilions', 'Open-air dance floors', 'Buffet & drinks station points', 'Secure gated perimeter'],
    capacityHint: 'Adaptable seating and cocktail arrangements',
  },
  {
    id: 'garden-events',
    title: 'GARDEN EVENTS',
    subtitle: 'Open-Air Picnics, High Tea & Sunset Soirees',
    description:
      'Embrace the famously cool, refreshing breeze of Jos. Our open garden oasis is ideal for Sunday brunches, acoustic evenings, high tea parties, and golden-hour gatherings.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Lush tropical flora & palms', 'Golden hour photo vistas', 'Shaded pergola corners', 'Crisp mountain air'],
    capacityHint: 'Relaxed bohemian or luxury garden styling',
  },
];

// Venue & Garden highlights
export const VENUE_SPACES: VenueSpace[] = [
  {
    id: 'grand-lawn',
    name: 'The Royal Garden Lawn',
    setting: 'Outdoor Garden',
    description: 'Expansive, velvet-green lawn bordered by mature trees and scenic floral landscaping, ideal for open-sky wedding vows and large marquee setups.',
    image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=1000&q=80',
    features: ['Level natural turf', 'Chandelier-ready tree canopies', 'Wide panoramic photo angles', 'Generous guest spacing'],
  },
  {
    id: 'covered-pavilion',
    name: 'The Emerald Pavilion & Hall',
    setting: 'Covered Pavilion',
    description: 'A stylish covered space designed for seamless all-weather comfort. Keeps your guests protected while maintaining a refreshing open-air garden connection.',
    image: 'https://images.unsplash.com/photo-1545232979-fbf673238692?auto=format&fit=crop&w=1000&q=80',
    features: ['High ventilation ceiling', 'Integrated lighting rigging', 'Polished staging area', 'Weather-protected dining'],
  },
  {
    id: 'twilight-terrace',
    name: 'The Sunset Terrace & Lounge',
    setting: 'Private Lounge',
    description: 'An intimate paved terrace framed by warm ambient fairy lights and garden planters, tailored for cocktail hours, VIP seating, or after-parties.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80',
    features: ['Festive bistro lighting', 'Cocktail bar station', 'Comfortable lounge groupings', 'Photogenic focal wall'],
  },
];

// Services
export const VENUE_SERVICES: ServiceItem[] = [
  {
    id: 'venue-hire',
    title: 'VENUE HIRE',
    description: 'Beautiful indoor and outdoor spaces for different types of occasions, customizable for day or evening events.',
    iconName: 'Building',
    details: [
      'Flexible full-day or half-day booking options',
      'Exclusive estate privacy during your reservation',
      'Ample secure vehicle parking and guest reception',
      'Dedicated on-site venue coordinator',
    ],
  },
  {
    id: 'event-decoration',
    title: 'EVENT DECORATION',
    description: 'Elegant event styling and decoration for memorable celebrations, from romantic floral arches to luxury banquet tables.',
    iconName: 'Sparkles',
    details: [
      'Bespoke floral design and stage backdrops',
      'Atmospheric lighting and drape treatments',
      'Luxury tableware, chargers, and centerpieces',
      'Custom theme creation tailored to your vision',
    ],
  },
  {
    id: 'catering',
    title: 'CATERING & REFRESHMENTS',
    description: 'Food, drinks, cakes and small chops for events, crafted with freshness and authentic flavours to delight your guests.',
    iconName: 'Utensils',
    details: [
      'Gourmet multi-course plated and buffet meals',
      'Traditional Nigerian delicacies and continental fare',
      'Crispy small chops, hors d oeuvres, and finger foods',
      'Custom celebration cakes and beverage service',
    ],
  },
  {
    id: 'event-rentals',
    title: 'EVENT RENTALS',
    description: 'Relevant event equipment and rental support to ensure flawless logistics and guest comfort from start to finish.',
    iconName: 'ShieldCheck',
    details: [
      'Luxury Chiavari, Phoenix, and banquet chairs',
      'High-grade round and banquet dining tables',
      'Heavy-duty cooling fans and outdoor climate gear',
      'Staging platforms, podiums, and velvet stanchions',
    ],
  },
];

// Gallery items
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Grand Garden Wedding Ceremony',
    category: 'weddings',
    categoryLabel: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sunlit outdoor bridal vows surrounded by manicured landscaping at Kee Event and Garden.',
  },
  {
    id: 'gal-2',
    title: 'Golden Hour Banquet Setting',
    category: 'garden',
    categoryLabel: 'Garden & Lawns',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    caption: 'Impeccable table arrangements glowing under the golden Jos sunset.',
  },
  {
    id: 'gal-3',
    title: 'Bespoke Floral Arch & Stage',
    category: 'decor',
    categoryLabel: 'Decoration',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    caption: 'Artisan floral arches hand-crafted for couple photo moments and stage elegance.',
  },
  {
    id: 'gal-4',
    title: 'Evening Chandelier Pavilion',
    category: 'decor',
    categoryLabel: 'Decoration',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Crystal chandeliers and soft warm glows transform the evening into pure magic.',
  },
  {
    id: 'gal-5',
    title: 'Celebration Toast & Milestone Dinner',
    category: 'celebrations',
    categoryLabel: 'Celebrations',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Laughter, fine dining, and joyous celebrations with family and friends.',
  },
  {
    id: 'gal-6',
    title: 'Serene Green Garden Pathway',
    category: 'garden',
    categoryLabel: 'Garden & Lawns',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    caption: 'Tranquil paved garden walkway framed by tropical greenery and blooming flora.',
  },
  {
    id: 'gal-7',
    title: 'Luxury Tableware & Place Settings',
    category: 'decor',
    categoryLabel: 'Decoration',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    caption: 'Gold cutlery, crystal glassware, and customized menu cards for distinguished guests.',
  },
  {
    id: 'gal-8',
    title: 'Festive Cocktail & Small Chops Bar',
    category: 'celebrations',
    categoryLabel: 'Celebrations',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    caption: 'Fresh refreshments, artisan drinks, and delightful finger foods under warm bistro lights.',
  },
  {
    id: 'gal-9',
    title: 'Joyful Wedding Reception Moment',
    category: 'weddings',
    categoryLabel: 'Weddings',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cherished memories created on the dance floor in Jos.',
  },
  {
    id: 'gal-10',
    title: 'Corporate Gala & Awards Evening',
    category: 'celebrations',
    categoryLabel: 'Celebrations',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption: 'Distinguished dinner and keynote seating configuration for business leaders and organizations.',
  },
  {
    id: 'gal-11',
    title: 'Twilight Garden Canopy & Fairy Lights',
    category: 'garden',
    categoryLabel: 'Garden & Lawns',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    caption: 'Atmospheric evening lighting illuminating the natural tree line and lawn pathways.',
  },
  {
    id: 'gal-12',
    title: 'Bespoke Floral Vow Arch',
    category: 'weddings',
    categoryLabel: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    caption: 'Handcrafted floral arches with roses, eucalyptus, and gold framework under Jos mountain sky.',
  },
  {
    id: 'gal-13',
    title: 'Grand Drapery & Chandelier Styling',
    category: 'decor',
    categoryLabel: 'Decoration',
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cascading ivory drapes, ambient warm glow, and statement chandeliers for indoor elegance.',
  },
  {
    id: 'gal-14',
    title: 'Afternoon Garden High Tea & Social',
    category: 'garden',
    categoryLabel: 'Garden & Lawns',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Refreshing outdoor daytime layout surrounded by manicured lawns and gentle mountain breeze.',
  },
  {
    id: 'gal-15',
    title: 'Evening Celebration Cheers & Toast',
    category: 'celebrations',
    categoryLabel: 'Celebrations',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Unforgettable milestone celebration with family, loved ones, and esteemed guests.',
  },
];

// Why Kee points
export const WHY_KEES_POINTS: WhyChoosePoint[] = [
  {
    title: 'BEAUTIFUL SETTING',
    subtitle: 'A Serene Oasis in Jos',
    description:
      'Tucked peacefully along Justice Akanbi Close behind St. Piran Church, Kee offers lush greenery, privacy, and the crisp, refreshing climate of Plateau State.',
    iconName: 'Sparkles',
  },
  {
    title: 'INDOOR & OUTDOOR OPTIONS',
    subtitle: 'Weather-Ready Versatility',
    description:
      'Seamlessly transition between manicured open-sky lawns and protected covered spaces, ensuring your celebration continues flawlessly regardless of weather.',
    iconName: 'Layers',
  },
  {
    title: 'EVENT SUPPORT',
    subtitle: 'Attentive, Professional Team',
    description:
      'Our on-site venue team coordinates setup logistics, electricity management, parking assistance, and security so you can celebrate without stress.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'CATERING & DECORATION',
    subtitle: 'Complete Event Harmonization',
    description:
      'From exquisite culinary delights, cakes, and small chops to tailored thematic decor and styling, we help bring your dream aesthetic to life under one roof.',
    iconName: 'Utensils',
  },
  {
    title: 'A MEMORABLE EXPERIENCE',
    subtitle: 'Where Moments Become Memories',
    description:
      'Every corner of Kee is crafted to leave lasting impressions on your family, friends, and esteemed guests, creating photographs and memories to cherish forever.',
    iconName: 'HeartHandshake',
  },
];
