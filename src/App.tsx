import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { BridalPage } from './pages/BridalPage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { BottomTrustBar } from './components/BottomTrustBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';

// Admin CMS Pages
import { AdminLayout, AdminTab } from './pages/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminHero } from './pages/admin/AdminHero';
import { AdminCollections } from './pages/admin/AdminCollections';
import { AdminFounder } from './pages/admin/AdminFounder';
import { AdminFounderPicks } from './pages/admin/AdminFounderPicks';
import { AdminWhyUs } from './pages/admin/AdminWhyUs';
import { AdminExperience } from './pages/admin/AdminExperience';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminJournal } from './pages/admin/AdminJournal';
import { AdminMediaLibrary } from './pages/admin/AdminMediaLibrary';
import { AdminStoreSettings } from './pages/admin/AdminStoreSettings';
import { AdminDatabaseConfig } from './pages/admin/AdminDatabaseConfig';

// Modals
import { CatalogueModal } from './components/CatalogueModal';
import { StoreModal } from './components/StoreModal';
import { AboutModal } from './components/AboutModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { PostModal } from './components/PostModal';
import { PolicyModal } from './components/PolicyModal';
import { WristSizeGuideModal } from './components/WristSizeGuideModal';

// Data Service & Types
import { DataService, subscribeToUpdates } from './lib/dataService';
import {
  SiteSettings,
  HeroContent,
  CollectionItem,
  FounderContent,
  FounderPick,
  WhyUsItem,
  ExperienceContent,
  TestimonialItem,
  JournalPost,
  MediaAsset,
  EnquiryItem,
} from './lib/database.types';
import {
  defaultSiteSettings,
  defaultHeroContent,
  defaultCollections,
  defaultFounderContent,
  defaultFounderPicks,
  defaultWhyUsItems,
  defaultExperienceContent,
  defaultTestimonials,
  defaultJournalPosts,
  defaultMediaAssets,
} from './lib/defaultContent';
import { useTheme } from './context/ThemeContext';

export const App: React.FC = () => {
  const { theme } = useTheme();

  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [adminAuthUser, setAdminAuthUser] = useState<string | null>(
    sessionStorage.getItem('goldnglow_admin_auth')
  );

  // Entities Data State
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [hero, setHero] = useState<HeroContent>(defaultHeroContent);
  const [collections, setCollections] = useState<CollectionItem[]>(defaultCollections);
  const [founder, setFounder] = useState<FounderContent>(defaultFounderContent);
  const [founderPicks, setFounderPicks] = useState<FounderPick[]>(defaultFounderPicks);
  const [whyUsItems, setWhyUsItems] = useState<WhyUsItem[]>(defaultWhyUsItems);
  const [experience, setExperience] = useState<ExperienceContent>(defaultExperienceContent);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [journalPosts, setJournalPosts] = useState<JournalPost[]>(defaultJournalPosts);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(defaultMediaAssets);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);

  // Modals & Drawers State
  const [collectionCategoryFilter, setCollectionCategoryFilter] = useState<string>('all');
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPost, setSelectedPost] = useState<JournalPost | null>(null);
  const [policyTitle, setPolicyTitle] = useState<string | null>(null);
  const [curtainDocked, setCurtainDocked] = useState(false);

  // Load All Data
  const reloadData = async () => {
    try {
      const [
        s,
        h,
        cols,
        f,
        fp,
        why,
        exp,
        test,
        posts,
        media,
        enq,
      ] = await Promise.all([
        DataService.getSiteSettings(),
        DataService.getHeroContent(),
        DataService.getCollections(),
        DataService.getFounderContent(),
        DataService.getFounderPicks(),
        DataService.getWhyUsItems(),
        DataService.getExperienceContent(),
        DataService.getTestimonials(),
        DataService.getJournalPosts(),
        DataService.getMediaAssets(),
        DataService.getEnquiries(),
      ]);

      if (s) setSettings(s);
      if (h) setHero(h);
      if (cols) setCollections(cols);
      if (f) setFounder(f);
      if (fp) setFounderPicks(fp);
      if (why) setWhyUsItems(why);
      if (exp) setExperience(exp);
      if (test) setTestimonials(test);
      if (posts) setJournalPosts(posts);
      if (media) setMediaAssets(media);
      if (enq) setEnquiries(enq);
    } catch (e) {
      console.warn('Error loading data:', e);
    }
  };

  useEffect(() => {
    reloadData();

    // Check path / hash for route
    const syncRouteFromLocation = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const hash = window.location.hash.replace('#', '').toLowerCase();

      if (path === '/admin' || hash === 'admin') {
        setCurrentPage('admin');
      } else if (path === '/collections' || hash === 'collections') {
        setCurrentPage('collections');
      } else if (path === '/bridal-heritage' || path === '/bridal' || hash === 'bridal' || hash === 'bridal-heritage') {
        setCurrentPage('bridal');
      } else if (path === '/about' || path === '/story' || hash === 'about' || hash === 'story') {
        setCurrentPage('about');
      } else if (path === '/experience' || hash === 'experience') {
        setCurrentPage('experience');
      } else if (path === '/contact' || hash === 'contact') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
    };

    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);

    // Track scroll proximity to bottom for Dynamic Curtain Elevation & Docking
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPos = window.scrollY + window.innerHeight;
      const distFromBottom = scrollHeight - scrollPos;
      
      // When user reaches exact bottom (within 40px), dissolve shadow and dock flush
      if (distFromBottom <= 40) {
        setCurtainDocked(true);
      } else {
        setCurtainDocked(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Subscribe to Realtime Updates
    const unsubscribe = subscribeToUpdates(() => {
      reloadData();
    });

    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  // Cart Management
  const handleAddToCart = (item: CollectionItem, size: string = '2.6') => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          category: item.category,
          image_url: item.image_url,
          size,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const pageToPath: Record<string, string> = {
    home: '/',
    collections: '/collections',
    bridal: '/bridal-heritage',
    about: '/about',
    experience: '/experience',
    contact: '/contact',
    admin: '/admin',
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    const targetPath = pageToPath[page] || (page === 'home' ? '/' : `/${page}`);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing Admin Panel
  if (currentPage === 'admin') {
    if (!adminAuthUser) {
      return (
        <AdminLogin
          onLoginSuccess={(email: string) => setAdminAuthUser(email)}
          onBackToSite={() => navigateTo('home')}
        />
      );
    }

    return (
      <AdminLayout
        activeTab={adminTab}
        onTabChange={(tab) => setAdminTab(tab)}
        onLogout={() => {
          sessionStorage.removeItem('goldnglow_admin_auth');
          setAdminAuthUser(null);
          navigateTo('home');
        }}
        onViewSite={() => navigateTo('home')}
        adminEmail={adminAuthUser}
      >
        {adminTab === 'dashboard' && (
          <AdminDashboard
            onNavigate={(t: AdminTab) => setAdminTab(t)}
            collections={collections}
            posts={journalPosts}
            testimonials={testimonials}
            enquiries={enquiries}
            mediaAssets={mediaAssets}
            onResetDefaults={async () => {
              await DataService.resetToDefaults();
              await reloadData();
            }}
          />
        )}

        {adminTab === 'hero' && (
          <AdminHero
            initialContent={hero}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'collections' && (
          <AdminCollections
            collections={collections}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'founder' && (
          <AdminFounder
            initialContent={founder}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'picks' && (
          <AdminFounderPicks
            picks={founderPicks}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'whyus' && (
          <AdminWhyUs
            items={whyUsItems}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'experience' && (
          <AdminExperience
            initialContent={experience}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'testimonials' && (
          <AdminTestimonials
            testimonials={testimonials}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'journal' && (
          <AdminJournal
            posts={journalPosts}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'media' && (
          <AdminMediaLibrary
            assets={mediaAssets}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'store' && (
          <AdminStoreSettings
            settings={settings}
            onSaved={reloadData}
          />
        )}

        {adminTab === 'database' && (
          <AdminDatabaseConfig />
        )}
      </AdminLayout>
    );
  }

  // Public Website View
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FCE8E5' }}>
      {/* 1. STICKY HEADER */}
      <Header
        settings={settings}
        onOpenCatalogue={() => setCatalogueOpen(true)}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* 2. FOREGROUND CURTAIN CONTENT LAYER (Lifts upward as user scrolls to reveal footer underneath) */}
      <div
        className="curtain-content-layer"
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#FCE8E5',
          boxShadow: curtainDocked
            ? '0 0 0 0 transparent'
            : '0 35px 80px -15px rgba(27, 18, 14, 0.40)',
          borderBottom: curtainDocked ? '1px solid #E2D5CA' : '1px solid transparent',
          transition: 'box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* SUB-PAGE BREADCRUMB BAR (When not on Home) */}
        {currentPage !== 'home' && (
          <div
            style={{
              backgroundColor: '#F0E4DC',
              borderBottom: '1px solid #E2D5CA',
              padding: '12px 0',
            }}
          >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={() => navigateTo('home')}
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#C0846A',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>← Back to Full Homepage Experience</span>
              </button>
              <span
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#7A6356',
                }}
              >
                {currentPage.toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* 3. MAIN PAGE VIEW */}
        <main style={{ flex: 1 }}>
          {currentPage === 'home' && (
            <HomePage
              hero={hero}
              collections={collections}
              founder={founder}
              founderPicks={founderPicks}
              whyUsItems={whyUsItems}
              experience={experience}
              testimonials={testimonials}
              journalPosts={journalPosts}
              settings={settings}
              onOpenCatalogue={() => setCatalogueOpen(true)}
              onOpenStoreModal={() => setStoreModalOpen(true)}
              onOpenAboutModal={() => setAboutModalOpen(true)}
              onOpenPost={(post) => setSelectedPost(post)}
              onSelectCollection={(item) => {
                if (item.category === 'lac' || item.material === 'Lac') {
                  setCollectionCategoryFilter('lac');
                } else if (item.category === 'glass' || item.material === 'Glass') {
                  setCollectionCategoryFilter('glass');
                } else if (item.category === 'bridal' || item.material === 'Lac & Glass') {
                  setCollectionCategoryFilter('bridal');
                } else {
                  setCollectionCategoryFilter('all');
                }
                navigateTo('collections');
              }}
              onSelectFounderPick={(pick) => {
                if (pick.title.toLowerCase().includes('lac') || pick.tagline?.toLowerCase().includes('lac')) {
                  setCollectionCategoryFilter('lac');
                } else if (pick.title.toLowerCase().includes('glass') || pick.tagline?.toLowerCase().includes('glass')) {
                  setCollectionCategoryFilter('glass');
                } else {
                  setCollectionCategoryFilter('all');
                }
                navigateTo('collections');
              }}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'collections' && (
            <CollectionsPage
              collections={collections}
              onAddToCart={handleAddToCart}
              onOpenCatalogue={() => setCatalogueOpen(true)}
              onOpenSizeGuide={() => setSizeGuideOpen(true)}
              whatsapp={settings.whatsapp}
              initialCategory={collectionCategoryFilter}
            />
          )}

          {currentPage === 'bridal' && (
            <BridalPage
              settings={settings}
              onOpenCatalogue={() => setCatalogueOpen(true)}
              onOpenSizeGuide={() => setSizeGuideOpen(true)}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage founder={founder} settings={settings} />
          )}

          {currentPage === 'experience' && (
            <ExperiencePage content={experience} settings={settings} />
          )}

          {currentPage === 'contact' && <ContactPage settings={settings} />}
        </main>

        {/* 4. BOTTOM TRUST BAR */}
        <BottomTrustBar />
      </div>

      {/* 3. UNDERNEATH FIXED/STICKY REVEAL FOOTER (Revealed like a curtain lifting) */}
      <div
        className="curtain-footer-layer"
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Footer
          settings={settings}
          onOpenCatalogue={() => setCatalogueOpen(true)}
          onOpenStoreModal={() => setStoreModalOpen(true)}
          onOpenPolicyModal={(title) => setPolicyTitle(title)}
          onNavigate={navigateTo}
        />
      </div>

      {/* 6. FLOATING CONTROLS — WHATSAPP & MOBILE BOTTOM NAV */}
      <FloatingWhatsApp settings={settings} />
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={navigateTo}
        settings={settings}
      />

      {/* 7. MODALS & DRAWERS */}
      <CatalogueModal
        isOpen={catalogueOpen}
        onClose={() => setCatalogueOpen(false)}
        settings={settings}
      />

      <StoreModal
        isOpen={storeModalOpen}
        onClose={() => setStoreModalOpen(false)}
        settings={settings}
      />

      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        founder={founder}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        settings={settings}
      />

      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        settings={settings}
      />

      <PolicyModal
        title={policyTitle}
        onClose={() => setPolicyTitle(null)}
      />

      <WristSizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        whatsapp={settings.whatsapp}
      />
    </div>
  );
};

export default App;
