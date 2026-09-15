import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileEdit,
  Image,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutAdmin } = useContent();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Pages & Content', path: '/admin/pages', icon: FileEdit },
    { label: 'Media Library', path: '/admin/media', icon: Image },
    { label: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#071712] text-[#F7F3EA] flex">
      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2.5 rounded-xl bg-[#12352B] border border-[#D4AF6A]/30 text-[#D4AF6A]"
          aria-label="Toggle admin navigation"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0A211A] border-r border-[#12352B] flex flex-col justify-between p-6 z-40 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="pb-6 border-b border-[#12352B]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF6A] bg-[#12352B] flex items-center justify-center text-[#D4AF6A] font-serif text-xl font-bold">
                K
              </div>
              <div>
                <h1 className="font-serif text-sm font-semibold tracking-wider text-[#F7F3EA] uppercase leading-tight">
                  Kee Event & Garden
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Shield className="w-3 h-3 text-[#D4AF6A]" />
                  <span className="text-[10px] text-[#D4AF6A] uppercase tracking-widest font-semibold">
                    Admin Portal
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                    isActive
                      ? 'bg-[#D4AF6A] text-[#0A211A] font-semibold shadow-md'
                      : 'text-[#F7F3EA]/70 hover:text-[#F7F3EA] hover:bg-[#12352B]/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[#12352B] space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-[#F7F3EA]/60 hover:text-[#D4AF6A] hover:bg-[#12352B]/40 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 px-6 sm:px-8 border-b border-[#12352B] bg-[#0A211A]/60 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] uppercase font-medium">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs text-[#F7F3EA]/50 font-sans">
              Jos, Plateau State • Kee Event & Garden
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
          </div>
        </header>

        {/* Page Content Body */}
        <div className="p-6 sm:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
};
