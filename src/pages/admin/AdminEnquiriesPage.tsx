import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  CheckCircle,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useContent } from '../../context/ContentContext';
import { EnquiryItem } from '../../types';

export const AdminEnquiriesPage: React.FC = () => {
  const { fetchEnquiries, updateEnquiryStatus, deleteEnquiry } = useContent();
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'booked' | 'archived'>('all');
  const [loading, setLoading] = useState(true);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await fetchEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryItem['status']) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this enquiry record?')) return;
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Failed to delete enquiry', err);
    }
  };

  const filteredEnquiries =
    filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter);

  return (
    <AdminLayout title="Booking Enquiries">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0A211A] border border-[#D4AF6A]/20">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0">
            {(['all', 'new', 'contacted', 'booked', 'archived'] as const).map((status) => {
              const count =
                status === 'all'
                  ? enquiries.length
                  : enquiries.filter((e) => e.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    filter === status
                      ? 'bg-[#D4AF6A] text-[#0A211A]'
                      : 'bg-[#12352B]/60 text-[#F7F3EA]/70 hover:text-[#F7F3EA]'
                  }`}
                >
                  {status} ({count})
                </button>
              );
            })}
          </div>

          <span className="text-xs text-[#F7F3EA]/50">
            Showing {filteredEnquiries.length} enquiry items
          </span>
        </div>

        {/* Enquiries List */}
        {filteredEnquiries.length === 0 ? (
          <div className="p-16 text-center border border-dashed border-[#12352B] rounded-3xl bg-[#0A211A]">
            <Inbox className="w-12 h-12 text-[#D4AF6A]/30 mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#F7F3EA] uppercase font-medium">
              No Enquiries Found
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F3EA]/50 mt-1">
              {filter === 'all'
                ? 'Client booking submissions from the website will appear here.'
                : `No enquiries currently marked as "${filter}".`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="p-6 rounded-3xl bg-[#0A211A] border border-[#D4AF6A]/25 hover:border-[#D4AF6A]/45 transition-all shadow-lg space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#12352B] pb-4">
                  <div>
                    <span className="text-xs font-semibold text-[#D4AF6A] uppercase tracking-wider">
                      {enquiry.eventType}
                    </span>
                    <h4 className="font-serif text-2xl text-[#F7F3EA] font-medium mt-0.5">
                      {enquiry.fullName}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Status Dropdown */}
                    <select
                      value={enquiry.status}
                      onChange={(e) =>
                        handleStatusChange(enquiry.id, e.target.value as EnquiryItem['status'])
                      }
                      className="px-3 py-1.5 rounded-xl bg-[#12352B] border border-[#D4AF6A]/30 text-xs font-semibold uppercase tracking-wider text-[#D4AF6A] focus:outline-none"
                    >
                      <option value="new">Status: New</option>
                      <option value="contacted">Status: Contacted</option>
                      <option value="booked">Status: Booked</option>
                      <option value="archived">Status: Archived</option>
                    </select>

                    <button
                      onClick={() => handleDelete(enquiry.id)}
                      className="p-2 rounded-xl bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors cursor-pointer"
                      title="Delete enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-[#12352B]/40 border border-[#D4AF6A]/15">
                    <span className="text-[10px] text-[#D4AF6A] uppercase tracking-wider font-semibold block">
                      Preferred Date
                    </span>
                    <div className="flex items-center gap-1.5 text-[#F7F3EA] font-medium mt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF6A]" />
                      <span>{enquiry.preferredDate || 'Not specified'}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#12352B]/40 border border-[#D4AF6A]/15">
                    <span className="text-[10px] text-[#D4AF6A] uppercase tracking-wider font-semibold block">
                      Estimated Guests
                    </span>
                    <div className="flex items-center gap-1.5 text-[#F7F3EA] font-medium mt-1">
                      <Users className="w-3.5 h-3.5 text-[#D4AF6A]" />
                      <span>{enquiry.guestCount || 'Flexible / TBD'}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#12352B]/40 border border-[#D4AF6A]/15">
                    <span className="text-[10px] text-[#D4AF6A] uppercase tracking-wider font-semibold block">
                      Submission Time
                    </span>
                    <div className="flex items-center gap-1.5 text-[#F7F3EA]/70 mt-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF6A]" />
                      <span>{new Date(enquiry.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                {enquiry.message && (
                  <div className="p-4 rounded-xl bg-[#12352B]/20 border border-[#12352B] text-xs text-[#F7F3EA]/80">
                    <span className="text-[10px] text-[#D4AF6A] uppercase font-semibold block mb-1">
                      Client Notes / Vision
                    </span>
                    <p className="font-light leading-relaxed">{enquiry.message}</p>
                  </div>
                )}

                {/* Quick Actions: Call & WhatsApp */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="px-4 py-2 rounded-xl bg-[#12352B] hover:bg-[#153E33] border border-[#D4AF6A]/30 text-[#F7F3EA] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF6A]" />
                    <span>Call ({enquiry.phone})</span>
                  </a>

                  <a
                    href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${enquiry.fullName}, this is Kee Event & Garden in Jos regarding your enquiry for ${enquiry.eventType}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
