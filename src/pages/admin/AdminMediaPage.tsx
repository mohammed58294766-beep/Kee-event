import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  Film,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useContent } from '../../context/ContentContext';
import { MediaItem } from '../../types';

export const AdminMediaPage: React.FC = () => {
  const { fetchMedia, uploadMedia, deleteMedia } = useContent();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    try {
      const items = await fetchMedia();
      setMediaList(items);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load media.');
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setErrorMessage(null);

    try {
      for (let i = 0; i < files.length; i++) {
        await uploadMedia(files[i]);
      }
      await loadMedia();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to upload media file.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this media file?')) return;
    try {
      await deleteMedia(id);
      await loadMedia();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to delete media file.');
    }
  };

  return (
    <AdminLayout title="Media Library & Uploads">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Upload Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files);
          }}
          className="p-8 sm:p-10 rounded-3xl bg-[#0A211A] border-2 border-dashed border-[#D4AF6A]/40 hover:border-[#D4AF6A] transition-all text-center flex flex-col items-center justify-center space-y-4 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <div className="w-16 h-16 rounded-full bg-[#12352B] border border-[#D4AF6A]/40 flex items-center justify-center text-[#D4AF6A]">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium">
              Upload Photography & Video
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F3EA]/70 mt-1 max-w-md mx-auto">
              Drag and drop high-resolution venue photos or short MP4 video loops, or click to browse files.
            </p>
          </div>
          <button
            type="button"
            disabled={isUploading}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-wider uppercase shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <span>{isUploading ? 'Uploading File...' : 'Select Files to Upload'}</span>
          </button>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Media Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl text-[#F7F3EA] uppercase font-medium">
              All Media Assets ({mediaList.length})
            </h3>
            <span className="text-xs text-[#F7F3EA]/50">
              Click &quot;Copy URL&quot; to paste into any page slide or gallery
            </span>
          </div>

          {mediaList.length === 0 ? (
            <div className="p-12 text-center border border-[#12352B] rounded-3xl bg-[#0A211A]">
              <ImageIcon className="w-10 h-10 text-[#D4AF6A]/30 mx-auto mb-2" />
              <p className="text-sm text-[#F7F3EA]/60">No custom uploads yet.</p>
              <p className="text-xs text-[#F7F3EA]/40 mt-1">
                Upload photography of Kee Event & Garden to start customizing your site.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mediaList.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl overflow-hidden bg-[#0A211A] border border-[#D4AF6A]/20 flex flex-col justify-between group shadow-lg"
                >
                  <div className="aspect-square bg-[#12352B] overflow-hidden relative">
                    {item.mimeType?.startsWith('video') ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                    <span className="absolute top-2 left-2 p-1 rounded-md bg-[#0A211A]/80 border border-[#D4AF6A]/30 text-[#D4AF6A]">
                      {item.mimeType?.startsWith('video') ? (
                        <Film className="w-3.5 h-3.5" />
                      ) : (
                        <ImageIcon className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-[#F7F3EA] font-medium truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#F7F3EA]/50">
                      <span>{(item.size / 1024).toFixed(1)} KB</span>
                      <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="pt-2 border-t border-[#12352B] flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleCopy(item.url)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-[#12352B] hover:bg-[#D4AF6A] text-[#D4AF6A] hover:text-[#0A211A] text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedUrl === item.url ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors cursor-pointer"
                        title="Delete asset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
