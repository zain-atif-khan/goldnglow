import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BottomTrustBar } from './components/BottomTrustBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Non-critical pages — code split for smaller initial bundle
const CollectionsPage = lazy(() => import('./pages/CollectionsPage').then(m => ({ default: m.CollectionsPage })));
const BridalPage = lazy(() => import('./pages/BridalPage').then(m => ({ default: m.BridalPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then(m => ({ default: m.ExperiencePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

// Admin CMS Pages — lazy loaded (never needed by regular visitors)
import type { AdminTab } from './pages/admin/AdminLayout';
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminHero = lazy(() => import('./pages/admin/AdminHero').then(m => ({ default: m.AdminHero })));
const AdminCollections = lazy(() => import('./pages/admin/AdminCollections').then(m => ({ default: m.AdminCollections })));
const AdminFounder = lazy(() => import('./pages/admin/AdminFounder').then(m => ({ default: m.AdminFounder })));
const AdminFounderPicks = lazy(() => import('./pages/admin/AdminFounderPicks').then(m => ({ default: m.AdminFounderPicks })));
const AdminWhyUs = lazy(() => import('./pages/admin/AdminWhyUs').then(m => ({ default: m.AdminWhyUs })));
const AdminExperience = lazy(() => import('./pages/admin/AdminExperience').then(m => ({ default: m.AdminExperience })));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials').then(m => ({ default: m.AdminTestimonials })));
const AdminJournal = lazy(() => import('./pages/admin/AdminJournal').then(m => ({ default: m.AdminJournal })));
const AdminMediaLibrary = lazy(() => import('./pages/admin/AdminMediaLibrary').then(m => ({ default: m.AdminMediaLibrary })));
const AdminStoreSettings = lazy(() => import('./pages/admin/AdminStoreSettings').then(m => ({ default: m.AdminStoreSettings })));
const AdminDatabaseConfig = lazy(() => import('./pages/admin/AdminDatabaseConfig').then(m => ({ default: m.AdminDatabaseConfig })));

// Modals
import { CatalogueModal } from './components/CatalogueModal';
import { StoreModal } from './components/StoreModal';
import { AboutModal } from './components/AboutModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { PostModal } from './components/PostModal';
import { PolicyModal } from './components/PolicyModal';
import { WristSizeGuideModal } from './components/WristSizeGuideModal';
import { BangleDetailModal } from './components/BangleDetailModal';

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
  const [homeDetailItem, setHomeDetailItem] = useState<CollectionItem | null>(null);
  const [curtainDocked, setCurtainDocked] = useState(false);
  const [footerBlur, setFooterBlur] = useState<number>(0);

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
      // Dismiss any open modals and guarantee body scroll is completely unlocked
      setCartOpen(false);
      setCatalogueOpen(false);
      setStoreModalOpen(false);
      setAboutModalOpen(false);
      setSelectedPost(null);
      setPolicyTitle(null);
      setSizeGuideOpen(false);
      setHomeDetailItem(null);
      document.body.classList.remove('modal-open', 'bangle-modal-active');
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.touchAction = '';

      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const hash = window.location.hash.replace('#', '').toLowerCase();

      if (path === '/admin' || hash === 'admin') {
        setCurrentPage('admin');
      } else if (path === '/collections' || hash === 'collections') {
        setCurrentPage('collections');
      } else if (path === '/bridal-heritage' || path === '/bridal' || hash === 'bridal' || hash === 'bridal-heritage') {
        setCurrentPage('bridal');
      } else if (path === '/about' || path === '/story' || path === '/experience' || hash === 'about' || hash === 'story' || hash === 'experience') {
        setCurrentPage('about');
      } else if (path === '/contact' || hash === 'contact') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
    };

    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);

    // Track scroll proximity to bottom for Dynamic Curtain Elevation, Docking & Subtle Cinematic Blur
    const handleScroll = () => {
      // Disable blur calculations on mobile completely (mobile footer is normal static)
      if (window.innerWidth <= 768) {
        setFooterBlur(0);
        return;
      }

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPos = window.scrollY + window.innerHeight;
      const distFromBottom = scrollHeight - scrollPos;
      
      // Peak blur is very slight (max 2.5px) and clears to 0px well before GOLD N GLOW arch arrives (within ~420px of bottom)
      const maxBlur = 2.5;
      const clearThreshold = 420; // At this distance, footer text and GOLD N GLOW are 100% crisp (0px blur)
      const revealWindow = 680;

      if (distFromBottom <= clearThreshold) {
        setFooterBlur(0);
      } else if (distFromBottom < revealWindow) {
        const progress = (distFromBottom - clearThreshold) / (revealWindow - clearThreshold);
        setFooterBlur(Math.round(progress * maxBlur * 10) / 10);
      } else {
        setFooterBlur(maxBlur);
      }

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

  // Global Modal Active State: Hide navbar and lock website scroll from behind
  const isAnyModalOpen = Boolean(
    catalogueOpen ||
    storeModalOpen ||
    aboutModalOpen ||
    cartOpen ||
    selectedPost ||
    policyTitle ||
    sizeGuideOpen ||
    homeDetailItem
  );

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.classList.add('modal-open', 'bangle-modal-active');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open', 'bangle-modal-active');
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.touchAction = '';
    }

    return () => {
      document.body.classList.remove('modal-open', 'bangle-modal-active');
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.touchAction = '';
    };
  }, [isAnyModalOpen]);

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
    experience: '/about',
    contact: '/contact',
    admin: '/admin',
  };

  const navigateTo = (page: string) => {
    // Dismiss all modals and ensure body scroll is completely unlocked
    setCartOpen(false);
    setCatalogueOpen(false);
    setStoreModalOpen(false);
    setAboutModalOpen(false);
    setSelectedPost(null);
    setPolicyTitle(null);
    setSizeGuideOpen(false);
    setHomeDetailItem(null);
    document.body.classList.remove('modal-open', 'bangle-modal-active');
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
    document.body.style.touchAction = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = '';
    document.documentElement.style.touchAction = '';

    const targetPage = page === 'experience' ? 'about' : page;
    setCurrentPage(targetPage);
    const targetPath = pageToPath[targetPage] || (targetPage === 'home' ? '/' : `/${targetPage}`);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing Admin Panel
  if (currentPage === 'admin') {
    if (!adminAuthUser) {
      return (
        <Suspense fallback={null}>
          <AdminLogin
            onLoginSuccess={(email: string) => setAdminAuthUser(email)}
            onBackToSite={() => navigateTo('home')}
          />
        </Suspense>
      );
    }

    return (
      <Suspense fallback={null}>
        <AdminLayout
          activeTab={adminTab}
          onTabChange={(tab: AdminTab) => setAdminTab(tab)}
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
      </Suspense>
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
                setHomeDetailItem(item);
              }}
              onSelectFounderPick={(pick) => {
                const match = collections.find((c) => c.title.toLowerCase() === pick.title.toLowerCase());
                if (match) {
                  setHomeDetailItem(match);
                } else {
                  setHomeDetailItem({
                    id: pick.id,
                    title: pick.title,
                    subtitle: pick.tagline,
                    description: pick.description || pick.tagline,
                    category: 'signature',
                    material: 'Lac',
                    image_url: pick.image_url,
                    badge_label: 'FOUNDER PICK',
                    display_order: 1,
                    featured: true,
                    active: true,
                  });
                }
              }}
              onNavigate={navigateTo}
            />
          )}

          <Suspense fallback={null}>
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
                onAddToCart={handleAddToCart}
              />
            )}

            {(currentPage === 'about' || currentPage === 'experience') && (
              <AboutPage founder={founder} experience={experience} settings={settings} />
            )}

            {currentPage === 'contact' && <ContactPage settings={settings} />}
          </Suspense>
        </main>

        {/* 4. BOTTOM TRUST BAR */}
        <BottomTrustBar />

      </div>

      {/* 3. UNDERNEATH FIXED/STICKY REVEAL FOOTER (Desktop curtain reveal, mobile normal static) */}
      <div
        className="curtain-footer-layer curtain-footer-cinematic"
        style={{
          filter: footerBlur > 0.3 ? `blur(${footerBlur}px)` : 'none',
        }}
      >
        <div className="footer-cinematic-light" />
        <Footer
          settings={settings}
          onOpenCatalogue={() => setCatalogueOpen(true)}
          onOpenStoreModal={() => setStoreModalOpen(true)}
          onOpenPolicyModal={(title) => setPolicyTitle(title)}
          onNavigate={navigateTo}
        />
      </div>

      {/* 6. FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp settings={settings} />

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
        onNavigate={navigateTo}
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

      {/* Home Page Bangle Detail Modal with Size Guide & Selector */}
      <BangleDetailModal
        isOpen={!!homeDetailItem}
        onClose={() => setHomeDetailItem(null)}
        item={
          homeDetailItem
            ? {
                id: homeDetailItem.id,
                title: homeDetailItem.title,
                description: homeDetailItem.description || homeDetailItem.subtitle,
                image: homeDetailItem.image_url,
                tag:
                  homeDetailItem.badge_label ||
                  (homeDetailItem.category === 'lac'
                    ? 'HANDCRAFTED LAC'
                    : homeDetailItem.category === 'glass'
                    ? 'ARTISAN GLASS'
                    : homeDetailItem.category === 'bridal'
                    ? 'BRIDAL SUITE'
                    : 'SIGNATURE COLLECTION'),
                material: homeDetailItem.material,
              }
            : null
        }
        onAddToCart={(modalItem, size) => {
          if (homeDetailItem) {
            handleAddToCart(homeDetailItem, size || '2.6');
            setHomeDetailItem(null);
          }
        }}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        whatsapp={settings.whatsapp}
      />
    </div>
  );
};

export default App;
