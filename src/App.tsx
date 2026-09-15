import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ContentProvider, useContent } from './context/ContentContext';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { VenuePage } from './pages/VenuePage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPagesEditorPage } from './pages/admin/AdminPagesEditorPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Protected Admin Route Component
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useContent();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

// Main Layout Wrapper that hides public Navbar/Footer on Admin Routes
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // Only show loading screen once on initial site visit (not when navigating inside admin)
  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A211A] text-[#F7F3EA] flex flex-col font-sans selection:bg-[#D4AF6A]/30 selection:text-[#F7F3EA]">
      <ScrollToTop />

      {/* Branded Entry Animation */}
      {showLoadingScreen && !isAdminRoute && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Public Navigation */}
      {!isAdminRoute && <Navbar />}

      {/* Main Page View Routes */}
      <div className="flex-1">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Portal Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/pages"
            element={
              <ProtectedAdminRoute>
                <AdminPagesEditorPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedAdminRoute>
                <AdminMediaPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedAdminRoute>
                <AdminEnquiriesPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute>
                <AdminSettingsPage />
              </ProtectedAdminRoute>
            }
          />

          {/* Fallback redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Public Footer & Floating WhatsApp */}
      {!isAdminRoute && (
        <>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ContentProvider>
      <Router>
        <AppContent />
      </Router>
    </ContentProvider>
  );
}
