import { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SettingsProvider } from '@/context/SettingsContext';
import { ToastProvider } from '@/context/ToastContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { HomePage } from '@/pages/HomePage';
import { EventPage } from '@/pages/EventPage';
import { BookPage } from '@/pages/BookPage';
import { AwardsPage } from '@/pages/AwardsPage';
import { AboutPage } from '@/pages/AboutPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { usePageView } from '@/hooks/usePageView';

const AdminApp = lazy(() => import('@/admin/AdminApp'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function SiteChrome({ children }: { children: React.ReactNode }) {
  usePageView();
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-3">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
        <span className="text-sm text-ink-soft">Loading…</span>
      </div>
    </div>
  );
}

const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <BrowserRouter basename={ROUTER_BASENAME}>
      <SettingsProvider>
        <ToastProvider>
          <ScrollToTop />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<SiteChrome><HomePage /></SiteChrome>} />
              <Route path="/event" element={<SiteChrome><EventPage /></SiteChrome>} />
              <Route path="/book" element={<SiteChrome><BookPage /></SiteChrome>} />
              <Route path="/awards" element={<SiteChrome><AwardsPage /></SiteChrome>} />
              <Route path="/about" element={<SiteChrome><AboutPage /></SiteChrome>} />
              <Route path="/gallery" element={<SiteChrome><GalleryPage /></SiteChrome>} />
              <Route path="/contact" element={<SiteChrome><ContactPage /></SiteChrome>} />
              <Route path="/admin/*" element={<AdminApp />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<SiteChrome><NotFoundPage /></SiteChrome>} />
            </Routes>
          </Suspense>
        </ToastProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}
