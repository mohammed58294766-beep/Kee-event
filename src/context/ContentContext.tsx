import React, { createContext, useContext, useState, useEffect } from 'react';
import { AllWebsiteContent, EnquiryItem, MediaItem } from '../types';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_NAVIGATION,
  DEFAULT_FOOTER,
  DEFAULT_SEO,
  DEFAULT_HOMEPAGE,
  DEFAULT_ABOUT,
  DEFAULT_VENUE,
  DEFAULT_SERVICES,
  DEFAULT_GALLERY,
} from '../../server/defaultData.ts';

export const INITIAL_CONTENT: AllWebsiteContent = {
  siteSettings: DEFAULT_SITE_SETTINGS,
  socialLinks: DEFAULT_SOCIAL_LINKS,
  navigation: DEFAULT_NAVIGATION,
  footer: DEFAULT_FOOTER,
  seo: DEFAULT_SEO,
  homepage: DEFAULT_HOMEPAGE,
  about: DEFAULT_ABOUT,
  venue: DEFAULT_VENUE,
  services: DEFAULT_SERVICES,
  gallery: DEFAULT_GALLERY,
};

interface ContentContextValue {
  content: AllWebsiteContent;
  isLoading: boolean;
  isAuthenticated: boolean;
  reloadContent: () => Promise<void>;
  updateSection: <K extends keyof AllWebsiteContent>(
    section: K,
    data: AllWebsiteContent[K]
  ) => void;
  saveAllChanges: () => Promise<boolean>;
  loginAdmin: (user: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  fetchEnquiries: () => Promise<EnquiryItem[]>;
  updateEnquiryStatus: (id: string, status: EnquiryItem['status']) => Promise<boolean>;
  deleteEnquiry: (id: string) => Promise<boolean>;
  fetchMedia: () => Promise<MediaItem[]>;
  uploadMedia: (file: File) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<boolean>;
}

const ContentContext = createContext<ContentContextValue>({
  content: INITIAL_CONTENT,
  isLoading: false,
  isAuthenticated: false,
  reloadContent: async () => {},
  updateSection: () => {},
  saveAllChanges: async () => false,
  loginAdmin: async () => false,
  logoutAdmin: async () => {},
  fetchEnquiries: async () => [],
  updateEnquiryStatus: async () => false,
  deleteEnquiry: async () => false,
  fetchMedia: async () => [],
  uploadMedia: async () => ({ id: '', filename: '', originalName: '', url: '', size: 0, mimeType: '', uploadedAt: '' }),
  deleteMedia: async () => false,
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AllWebsiteContent>(() => {
    // Check localStorage cache for persistence in SPA mode
    try {
      const saved = localStorage.getItem('kees_site_content');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return INITIAL_CONTENT;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('kees_admin_auth') === 'true';
    } catch (_) {
      return false;
    }
  });

  // Local fallback state for enquiries and media if server is offline
  const [localEnquiries, setLocalEnquiries] = useState<EnquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('kees_enquiries');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'sample-1',
        fullName: 'Dr. Samuel Pam',
        phone: '+234 803 123 4567',
        eventType: 'Wedding & Reception',
        preferredDate: '2025-11-20',
        guestCount: '350 guests',
        message: 'Looking for a combination of the Main Wedding Lawn and the Covered Pavilion for reception.',
        status: 'new',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [localMedia, setLocalMedia] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('kees_media');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setContent((prev) => {
          const merged: AllWebsiteContent = {
            ...prev,
            ...data,
            siteSettings: { ...prev.siteSettings, ...(data.siteSettings || {}) },
            socialLinks: { ...prev.socialLinks, ...(data.socialLinks || {}) },
            navigation: data.navigation || prev.navigation,
            footer: { ...prev.footer, ...(data.footer || {}) },
            seo: { ...prev.seo, ...(data.seo || {}) },
            homepage: { ...prev.homepage, ...(data.homepage || {}) },
            about: { ...prev.about, ...(data.about || {}) },
            venue: { ...prev.venue, ...(data.venue || {}) },
            services: data.services || prev.services,
            gallery: data.gallery || prev.gallery,
          };
          try {
            localStorage.setItem('kees_site_content', JSON.stringify(merged));
          } catch (_) {}
          return merged;
        });
      }
    } catch (err) {
      console.warn('Backend API not responding, using stored or default content.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateSection = <K extends keyof AllWebsiteContent>(
    section: K,
    data: AllWebsiteContent[K]
  ) => {
    setContent((prev) => {
      const updated = {
        ...prev,
        [section]: data,
      };
      try {
        localStorage.setItem('kees_site_content', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  };

  const saveAllChanges = async (): Promise<boolean> => {
    try {
      // Try backend API first
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        localStorage.setItem('kees_site_content', JSON.stringify(content));
        return true;
      }
    } catch (err) {
      console.warn('API save failed, persisting locally in browser cache:', err);
    }

    // Persist locally
    try {
      localStorage.setItem('kees_site_content', JSON.stringify(content));
      return true;
    } catch (_) {
      return false;
    }
  };

  const loginAdmin = async (user: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
          localStorage.setItem('kees_admin_auth', 'true');
          return true;
        }
      }
    } catch (_) {}

    // Fallback credential verification
    if (user.trim() === 'admin' && pass.trim() === 'KeesAdmin2025!') {
      setIsAuthenticated(true);
      localStorage.setItem('kees_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (_) {}
    setIsAuthenticated(false);
    localStorage.removeItem('kees_admin_auth');
  };

  const fetchEnquiries = async (): Promise<EnquiryItem[]> => {
    try {
      const res = await fetch('/api/admin/enquiries');
      if (res.ok) {
        const data = await res.json();
        setLocalEnquiries(data);
        localStorage.setItem('kees_enquiries', JSON.stringify(data));
        return data;
      }
    } catch (_) {}
    return localEnquiries;
  };

  const updateEnquiryStatus = async (id: string, status: EnquiryItem['status']): Promise<boolean> => {
    try {
      await fetch(`/api/admin/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (_) {}

    const updated = localEnquiries.map((e) => (e.id === id ? { ...e, status } : e));
    setLocalEnquiries(updated);
    localStorage.setItem('kees_enquiries', JSON.stringify(updated));
    return true;
  };

  const deleteEnquiry = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
    } catch (_) {}

    const updated = localEnquiries.filter((e) => e.id !== id);
    setLocalEnquiries(updated);
    localStorage.setItem('kees_enquiries', JSON.stringify(updated));
    return true;
  };

  const fetchMedia = async (): Promise<MediaItem[]> => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setLocalMedia(data);
        localStorage.setItem('kees_media', JSON.stringify(data));
        return data;
      }
    } catch (_) {}
    return localMedia;
  };

  const uploadMedia = async (file: File): Promise<MediaItem> => {
    try {
      const formData = new FormData();
      formData.append('media', file);
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const newItem = await res.json();
        setLocalMedia((prev) => [newItem, ...prev]);
        return newItem;
      }
    } catch (_) {}

    // Fallback: create object URL
    const objectUrl = URL.createObjectURL(file);
    const mockItem: MediaItem = {
      id: `local-media-${Date.now()}`,
      filename: file.name,
      originalName: file.name,
      url: objectUrl,
      size: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
    };
    const updated = [mockItem, ...localMedia];
    setLocalMedia(updated);
    try {
      localStorage.setItem('kees_media', JSON.stringify(updated));
    } catch (_) {}
    return mockItem;
  };

  const deleteMedia = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
    } catch (_) {}

    const updated = localMedia.filter((m) => m.id !== id);
    setLocalMedia(updated);
    try {
      localStorage.setItem('kees_media', JSON.stringify(updated));
    } catch (_) {}
    return true;
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        isLoading,
        isAuthenticated,
        reloadContent: fetchContent,
        updateSection,
        saveAllChanges,
        loginAdmin,
        logoutAdmin,
        fetchEnquiries,
        updateEnquiryStatus,
        deleteEnquiry,
        fetchMedia,
        uploadMedia,
        deleteMedia,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
