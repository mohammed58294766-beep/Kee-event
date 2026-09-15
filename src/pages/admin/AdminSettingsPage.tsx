import React, { useState } from 'react';
import {
  Settings,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Lock,
  Save,
  Check,
  AlertCircle,
  Share2,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useContent } from '../../context/ContentContext';
import { VENUE_INFO } from '../../data/venueData';

export const AdminSettingsPage: React.FC = () => {
  const { content, updateSection, saveAllChanges } = useContent();

  const [siteSettings, setSiteSettings] = useState(content.siteSettings || VENUE_INFO);
  const [socialLinks, setSocialLinks] = useState(
    content.socialLinks || { instagram: '', facebook: '', tiktok: '', youtube: '' }
  );

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      updateSection('siteSettings', siteSettings);
      updateSection('socialLinks', socialLinks);

      const ok = await saveAllChanges();
      if (ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setSaveError('Failed to save settings.');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordMessage({ type: 'success', text: 'Password successfully updated!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMessage({ type: 'error', text: data.error || 'Failed to update password.' });
      }
    } catch (err: any) {
      setPasswordMessage({ type: 'error', text: err.message || 'Server error.' });
    }
  };

  return (
    <AdminLayout title="Site Settings & Security">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Contact & Location Configuration Form */}
        <form
          onSubmit={handleSaveSettings}
          className="p-8 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/25 space-y-6 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-[#12352B] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
                <Settings className="w-3.5 h-3.5" />
                <span>Contact & Venue Details</span>
              </div>
              <h3 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium mt-1">
                Venue Contact Information
              </h3>
            </div>

            {saveSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>

          {saveError && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{saveError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
                Display Phone Number
              </label>
              <input
                type="text"
                value={siteSettings.phoneDisplay || ''}
                onChange={(e) =>
                  setSiteSettings({
                    ...siteSettings,
                    phoneDisplay: e.target.value,
                    phoneHref: `tel:${e.target.value.replace(/[^0-9+]/g, '')}`,
                  })
                }
                placeholder="+234 803 700 6260"
                className="w-full px-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
                WhatsApp Phone Link
              </label>
              <input
                type="text"
                value={siteSettings.whatsAppHref || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, whatsAppHref: e.target.value })}
                placeholder="https://wa.me/2348037006260"
                className="w-full px-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
              Full Physical Address
            </label>
            <input
              type="text"
              value={siteSettings.address || ''}
              onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
              placeholder="Justice Akanbi Close, behind St. Piran Church, close to Tuscany, Jos, Plateau State, Nigeria"
              className="w-full px-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
                Working & Visiting Hours
              </label>
              <input
                type="text"
                value={siteSettings.workingHours || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                placeholder="Mon – Sat: 8:00 AM – 6:00 PM | Tours by appointment"
                className="w-full px-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
                Custom Logo URL (Optional)
              </label>
              <input
                type="text"
                value={siteSettings.customLogoUrl || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, customLogoUrl: e.target.value })}
                placeholder="/uploads/my-logo.png or https://..."
                className="w-full px-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A]"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-4 border-t border-[#12352B] space-y-4">
            <span className="text-xs uppercase font-semibold text-[#D4AF6A] tracking-wider block">
              Social Media Channels
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-[#F7F3EA]/70 mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={socialLinks.instagram || ''}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/40 border border-[#D4AF6A]/25 text-xs text-[#F7F3EA] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#F7F3EA]/70 mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={socialLinks.facebook || ''}
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/40 border border-[#D4AF6A]/25 text-xs text-[#F7F3EA] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#F7F3EA]/70 mb-1">TikTok URL</label>
                <input
                  type="text"
                  value={socialLinks.tiktok || ''}
                  onChange={(e) => setSocialLinks({ ...socialLinks, tiktok: e.target.value })}
                  placeholder="https://tiktok.com/@..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/40 border border-[#D4AF6A]/25 text-xs text-[#F7F3EA] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#F7F3EA]/70 mb-1">YouTube URL</label>
                <input
                  type="text"
                  value={socialLinks.youtube || ''}
                  onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12352B]/40 border border-[#D4AF6A]/25 text-xs text-[#F7F3EA] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-wider uppercase hover:brightness-105 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Site Settings'}</span>
          </button>
        </form>

        {/* Change Admin Password */}
        <form
          onSubmit={handleChangePassword}
          className="p-8 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/25 space-y-6 shadow-xl"
        >
          <div className="border-b border-[#12352B] pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF6A] uppercase tracking-wider font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Security</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F7F3EA] uppercase font-medium mt-1">
              Change Admin Password
            </h3>
            <p className="text-xs text-[#F7F3EA]/60 mt-0.5">
              Secure your content management portal by updating the master password.
            </p>
          </div>

          {passwordMessage && (
            <div
              className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
                passwordMessage.type === 'success'
                  ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
              }`}
            >
              {passwordMessage.type === 'success' ? (
                <Check className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{passwordMessage.text}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-full bg-[#12352B] hover:bg-[#D4AF6A] text-[#D4AF6A] hover:text-[#0A211A] border border-[#D4AF6A]/40 text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Update Password</span>
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};
