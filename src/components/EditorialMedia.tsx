import React, { useRef, useEffect, useState } from 'react';

export function isVideoSource(url?: string, explicitType?: 'image' | 'video'): boolean {
  if (explicitType === 'video') return true;
  if (explicitType === 'image') return false;
  if (!url) return false;
  return /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i.test(url);
}

export interface EditorialMediaProps {
  mediaType?: 'image' | 'video';
  src?: string;
  imageSrc?: string;
  videoSrc?: string;
  image?: string;
  video?: string;
  alt?: string;
  className?: string;
  fallbackImage?: string;
  isBackground?: boolean;
  controls?: boolean;
  poster?: string;
  priority?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const EditorialMedia: React.FC<EditorialMediaProps> = ({
  mediaType,
  src,
  imageSrc,
  videoSrc,
  image,
  video,
  alt = 'Kee Event and Garden Jos',
  className = '',
  fallbackImage = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85',
  isBackground = true,
  controls = false,
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  loading = 'lazy',
  onClick,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);

  // Determine active media URL and type
  const rawVideo = video || videoSrc;
  const rawImage = image || imageSrc;
  const isVideo =
    mediaType === 'video' ||
    (!mediaType && (Boolean(rawVideo) || isVideoSource(src || rawVideo)));
  const activeSrc = isVideo
    ? (rawVideo || src)
    : (rawImage || src);

  const effectivePoster = poster || rawImage || fallbackImage;

  // Reset video error state if the source or type changes
  useEffect(() => {
    setHasVideoError(false);
  }, [activeSrc, isVideo]);

  // Autoplay initialization & performance management
  useEffect(() => {
    if (!isVideo || !videoRef.current || hasVideoError) return;
    const el = videoRef.current;

    // Mobile autoplay requirement: strictly muted before starting playback
    el.defaultMuted = true;
    el.muted = true;

    if (!autoPlay) return;

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const playPromise = el.play();
              if (playPromise !== undefined) {
                playPromise.catch((_err) => {
                  // Muted autoplay was prevented by browser; poster/first frame stays visible safely
                });
              }
            } else {
              el.pause();
            }
          });
        },
        { threshold: 0.05, rootMargin: '150px' }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch((_err) => {
          // Autoplay prevented; fallback stays stable
        });
      }
    }
  }, [isVideo, activeSrc, autoPlay, hasVideoError]);

  if (isVideo && activeSrc && !hasVideoError) {
    return (
      <video
        ref={videoRef}
        src={activeSrc}
        poster={effectivePoster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        preload="metadata"
        className={`w-full h-full object-cover object-center ${className}`}
        style={style}
        onClick={onClick}
        onError={() => setHasVideoError(true)}
      />
    );
  }

  return (
    <img
      src={activeSrc || effectivePoster || fallbackImage}
      alt={alt}
      className={`w-full h-full object-cover object-center ${className}`}
      loading={loading}
      style={style}
      onClick={onClick}
      onError={(e) => {
        (e.target as HTMLImageElement).src = fallbackImage;
      }}
    />
  );
};
