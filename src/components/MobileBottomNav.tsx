import React, { useEffect, useState } from 'react';
import { Home, Layers, MessageCircle, Phone } from 'lucide-react';
import { SiteSettings } from '../lib/database.types';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  settings: SiteSettings;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  settings,
}) => {
  const [activeItem, setActiveItem] = useState<string>('home');

  // Track active section on scroll when on the homepage
  useEffect(() => {
    if (currentPage !== 'home') {
      if (currentPage === 'collections') setActiveItem('collections');
      else if (currentPage === 'bridal') setActiveItem('bridal');
      else if (currentPage === 'contact') setActiveItem('call');
      else setActiveItem('');
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const collectionsEl = document.getElementById('collections');
      const collectionsCatalogueEl = document.getElementById('collections-catalogue');

      const collectionsTop = collectionsEl?.offsetTop || 700;
      const collectionsEnd = (collectionsCatalogueEl?.offsetTop || 3500) + 400;

      if (scrollY < collectionsTop - 250) {
        setActiveItem('home');
      } else if (scrollY >= collectionsTop - 250 && scrollY < collectionsEnd) {
        setActiveItem('collections');
      } else {
        setActiveItem('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const whatsappClean = (settings.whatsapp || '919849012345').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
    'Hello Gold N Glow! I would like to inquire about your bangle collections.'
  )}`;

  const handleItemClick = (key: string, e: React.MouseEvent) => {
    if (key === 'chat') {
      // Direct WhatsApp link
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (key === 'call') {
      // Dedicated Contact Page
      onNavigate('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (key === 'home') {
      if (currentPage !== 'home') {
        onNavigate('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (key === 'collections') {
      if (currentPage === 'home') {
        const collectionsEl = document.getElementById('collections');
        if (collectionsEl) {
          collectionsEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          onNavigate('collections');
        }
      } else {
        onNavigate('collections');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (key === 'bridal') {
      onNavigate('bridal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  return (
    <>
      <nav
        className="mobile-bottom-navbar"
        aria-label="Mobile Navigation"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          backgroundColor: 'rgba(28, 20, 17, 0.94)',
          borderTop: '1px solid rgba(192, 132, 106, 0.28)',
          boxShadow: '0 -10px 36px rgba(18, 12, 10, 0.45)',
          paddingTop: '6px',
          paddingBottom: 'calc(6px + env(safe-area-inset-bottom, 8px))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* 1. HOME */}
        <button
          type="button"
          onClick={(e) => handleItemClick('home', e)}
          className={`nav-tab-btn ${activeItem === 'home' ? 'is-active' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 6px',
            flex: 1,
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: activeItem === 'home' ? 'translateY(-2px)' : 'none',
          }}
        >
          <div
            style={{
              color: activeItem === 'home' ? '#C0846A' : '#9E887C',
              transition: 'color 0.2s ease, transform 0.25s ease',
              transform: activeItem === 'home' ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <Home size={18} strokeWidth={activeItem === 'home' ? 2 : 1.5} />
          </div>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '9.5px',
              fontWeight: activeItem === 'home' ? 700 : 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: activeItem === 'home' ? '#F0DDD5' : '#8A7569',
              transition: 'color 0.2s ease',
            }}
          >
            Home
          </span>
          {activeItem === 'home' && (
            <div
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: '#C0846A',
                boxShadow: '0 0 6px #C0846A',
                marginTop: '-1px',
              }}
            />
          )}
        </button>

        {/* 2. COLLECTION */}
        <button
          type="button"
          onClick={(e) => handleItemClick('collections', e)}
          className={`nav-tab-btn ${activeItem === 'collections' ? 'is-active' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 6px',
            flex: 1,
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: activeItem === 'collections' ? 'translateY(-2px)' : 'none',
          }}
        >
          <div
            style={{
              color: activeItem === 'collections' ? '#C0846A' : '#9E887C',
              transition: 'color 0.2s ease, transform 0.25s ease',
              transform: activeItem === 'collections' ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <Layers size={18} strokeWidth={activeItem === 'collections' ? 2 : 1.5} />
          </div>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '9.5px',
              fontWeight: activeItem === 'collections' ? 700 : 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: activeItem === 'collections' ? '#F0DDD5' : '#8A7569',
              transition: 'color 0.2s ease',
            }}
          >
            Collection
          </span>
          {activeItem === 'collections' && (
            <div
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: '#C0846A',
                boxShadow: '0 0 6px #C0846A',
                marginTop: '-1px',
              }}
            />
          )}
        </button>

        {/* 3. BRIDAL (Rose Gold Luxury Medallion) */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={(e) => handleItemClick('bridal', e)}
            className="bridal-center-bulge-btn"
            style={{
              position: 'relative',
              top: '-12px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background:
                activeItem === 'bridal'
                  ? 'linear-gradient(135deg, #E6A792 0%, #C0846A 55%, #8C4D38 100%)'
                  : 'linear-gradient(135deg, #D49681 0%, #B5775F 55%, #7D4330 100%)',
              border: '2px solid rgba(255, 245, 238, 0.9)',
              boxShadow:
                activeItem === 'bridal'
                  ? '0 8px 24px rgba(192, 132, 106, 0.55), 0 0 12px rgba(230, 167, 146, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
                  : '0 6px 18px rgba(192, 132, 106, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#FFF8F5',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: activeItem === 'bridal' ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
            }}
            aria-label="Bridal Heritage Collection"
          >
            {/* Fine Luxury Bangle Contour Motif (No Emojis / Crowns) */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="8.5" />
              <circle cx="12" cy="12" r="5" strokeDasharray="2 2" />
            </svg>
            <span
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: '8px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FFF8F5',
                lineHeight: 1,
                marginTop: '2px',
              }}
            >
              Bridal
            </span>
          </button>
        </div>

        {/* 4. CONCIERGE / CHAT (Refined Rose Gold WhatsApp Link) */}
        <button
          type="button"
          onClick={(e) => handleItemClick('chat', e)}
          className="nav-tab-btn"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 6px',
            flex: 1,
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              color: '#C0846A',
              transition: 'transform 0.25s ease',
            }}
          >
            <MessageCircle size={18} strokeWidth={1.6} />
          </div>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '9.5px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8A7569',
              transition: 'color 0.2s ease',
            }}
          >
            Chat
          </span>
        </button>

        {/* 5. CALL / CONTACT (Dedicated Contact Page) */}
        <button
          type="button"
          onClick={(e) => handleItemClick('call', e)}
          className={`nav-tab-btn ${activeItem === 'call' ? 'is-active' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 6px',
            flex: 1,
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: activeItem === 'call' ? 'translateY(-2px)' : 'none',
          }}
        >
          <div
            style={{
              color: activeItem === 'call' ? '#C0846A' : '#9E887C',
              transition: 'color 0.2s ease, transform 0.25s ease',
              transform: activeItem === 'call' ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <Phone size={17} strokeWidth={activeItem === 'call' ? 2 : 1.5} />
          </div>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '9.5px',
              fontWeight: activeItem === 'call' ? 700 : 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: activeItem === 'call' ? '#F0DDD5' : '#8A7569',
              transition: 'color 0.2s ease',
            }}
          >
            Call
          </span>
          {activeItem === 'call' && (
            <div
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: '#C0846A',
                boxShadow: '0 0 6px #C0846A',
                marginTop: '-1px',
              }}
            />
          )}
        </button>
      </nav>

      {/* Scoped CSS: Mobile Only (Hidden on Desktop) */}
      <style>{`
        @media (min-width: 1024px) {
          .mobile-bottom-navbar {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .mobile-bottom-navbar {
            display: flex !important;
          }
          body {
            padding-bottom: 74px;
          }
        }
        .nav-tab-btn:active {
          transform: scale(0.94) !important;
        }
        .bridal-center-bulge-btn:active {
          transform: scale(0.96) translateY(-1px) !important;
        }
      `}</style>
    </>
  );
};
