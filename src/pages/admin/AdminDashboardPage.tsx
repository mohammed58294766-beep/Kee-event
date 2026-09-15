import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileEdit,
  Image as ImageIcon,
  Inbox,
  ArrowRight,
  Clock,
  Sparkles,
  Phone,
  Calendar,
  CheckCircle,
  Download,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useContent } from '../../context/ContentContext';
import { EnquiryItem } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const { content, fetchEnquiries, fetchMedia } = useContent();
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [mediaCount, setMediaCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const enq = await fetchEnquiries();
        setEnquiries(enq);
        const media = await fetchMedia();
        setMediaCount(media.length);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [fetchEnquiries, fetchMedia]);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;
  const galleryCount = content.gallery?.items?.length || (Array.isArray(content.gallery) ? content.gallery.length : 12);
  const spacesCount = content.venue?.spaces?.length || 3;

  return (
    <AdminLayout title="Overview & Performance">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#12352B] via-[#153E33] to-[#0A211A] border border-[#D4AF6A]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF6A] tracking-[0.2em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome, Venue Administrator</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F7F3EA] uppercase font-medium">
              Kee Event & Garden Portal
            </h2>
            <p className="text-sm text-[#F7F3EA]/75 mt-1 font-sans font-light">
              Manage your live website content, customer event enquiries, and photography showcase in Jos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/kee-event-and-garden.zip"
              download="kee-event-and-garden.zip"
              className="px-5 py-3.5 rounded-full bg-[#0A211A] border border-[#D4AF6A]/40 text-[#D4AF6A] hover:bg-[#12352B] text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
              title="Download full project source code archive"
            >
              <Download className="w-4 h-4" />
              <span>Download Zip</span>
            </a>
            <Link
              to="/admin/pages"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-wider uppercase hover:brightness-105 transition-all shadow-md flex items-center gap-2"
            >
              <FileEdit className="w-4 h-4" />
              <span>Edit Live Content</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/20 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#F7F3EA]/60 font-medium">
                New Enquiries
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-3xl sm:text-4xl text-[#F7F3EA] font-medium">
                {newEnquiriesCount}
              </span>
              <span className="text-xs text-[#F7F3EA]/50 block mt-1">
                Total: {enquiries.length} enquiries
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/20 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#F7F3EA]/60 font-medium">
                Uploaded Media
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-3xl sm:text-4xl text-[#F7F3EA] font-medium">
                {mediaCount}
              </span>
              <span className="text-xs text-[#F7F3EA]/50 block mt-1">
                Custom images in storage
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/20 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#F7F3EA]/60 font-medium">
                Gallery Photos
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-3xl sm:text-4xl text-[#F7F3EA] font-medium">
                {galleryCount}
              </span>
              <span className="text-xs text-[#F7F3EA]/50 block mt-1">
                Active visual moments
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/20 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#F7F3EA]/60 font-medium">
                Venue Spaces
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#D4AF6A]/20 text-[#D4AF6A] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-3xl sm:text-4xl text-[#F7F3EA] font-medium">
                {spacesCount}
              </span>
              <span className="text-xs text-[#F7F3EA]/50 block mt-1">
                Garden lawns & pavilion
              </span>
            </div>
          </div>
        </div>

        {/* Recent Enquiries Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] uppercase font-medium">
                Recent Booking Enquiries
              </h3>
              <p className="text-xs text-[#F7F3EA]/60 mt-0.5">
                Prospective clients inquiring about weddings, celebrations, and garden reservations.
              </p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs text-[#D4AF6A] hover:underline uppercase tracking-wider font-semibold flex items-center gap-1"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {enquiries.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[#12352B] rounded-2xl">
              <Inbox className="w-8 h-8 text-[#D4AF6A]/40 mx-auto mb-2" />
              <p className="text-sm text-[#F7F3EA]/60">No customer enquiries received yet.</p>
              <p className="text-xs text-[#F7F3EA]/40 mt-1">
                Enquiries submitted on the website or Contact page will appear here immediately.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#12352B] text-[#D4AF6A] uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 font-semibold">Client Name</th>
                    <th className="py-3 px-4 font-semibold">Event Type</th>
                    <th className="py-3 px-4 font-semibold">Preferred Date</th>
                    <th className="py-3 px-4 font-semibold">Phone</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#12352B]/60">
                  {enquiries.slice(0, 5).map((enq) => (
                    <tr key={enq.id} className="hover:bg-[#12352B]/30 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#F7F3EA]">{enq.fullName}</td>
                      <td className="py-3.5 px-4 text-[#F7F3EA]/80">{enq.eventType}</td>
                      <td className="py-3.5 px-4 text-[#F7F3EA]/70">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#D4AF6A]" />
                          <span>{enq.preferredDate || 'TBD'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#D4AF6A] font-medium">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3" />
                          <span>{enq.phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider ${
                            enq.status === 'new'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
