import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  User,
  BookOpen,
  Clock,
  MessageCircle,
  Ruler,
} from 'lucide-react';
import { GoldNGlowLogo } from './Icons';
import { SiteSettings } from '../lib/database.types';

interface HeaderProps {
  settings: SiteSettings;
  onOpenCatalogue: () => void;
  onOpenCart: () => void;
  onOpenSizeGuide?: () => void;
  cartCount?: number;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const NAV_LINKS = [
  { key: 'home',        label: 'HOME' },
  {
    key: 'collections',
    label: 'COLLECTIONS',
    children: [
      { key: 'collections', label: 'All Bangles',                  desc: 'Complete Glass & Lac catalog' },
      { key: 'collections', label: 'Handcrafted Lac Bangles',      desc: 'Heritage Laakh, Jaipuri & royal kadas' },
      { key: 'collections', label: 'Artisan Glass Bangles',        desc: 'Velvet matte, gold-rimmed & shimmer glass' },
      { key: 'bridal',      label: 'Bridal Heritage (Lac & Glass)', desc: 'Royal wedding churas & bridal suites' },
    ],
  },
  { key: 'bridal',      label: 'BRIDAL' },
  { key: 'about',       label: 'ABOUT US' },
  { key: 'experience',  label: 'EXPERIENCE' },
  { key: 'contact',     label: 'CONTACT' },
];

export const Header: React.FC<HeaderProps> = ({
  settings,
  onOpenCatalogue,
  onOpenCart,
  onOpenSizeGuide,
  cartCount = 0,
  currentPage = 'home',
  onNavigate,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On home page: hidden in the Hero landing section, slides down once scrolling past hero (~380px).
  // On all other pages: always visible immediately.
  const isOnHome = currentPage === 'home';
  const [headerVisible, setHeaderVisible] = useState(!isOnHome);

  useEffect(() => {
    if (!isOnHome) {
      setHeaderVisible(true);
      return;
    }

    // Reveal once user scrolls past the Hero landing section (~380px)
    const checkScroll = () => {
      const heroThreshold = Math.min(window.innerHeight * 0.5, 420);
      const isPastHero = window.scrollY > heroThreshold;
      setScrolled(window.scrollY > 8);
      setHeaderVisible(isPastHero);
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [isOnHome]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavigate = (page: string) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    if (onNavigate) onNavigate(page);
    else {
      window.location.hash = page === 'home' ? '' : page;
    }
  };

  const openDropdown = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Gold N Glow!')}`;

  return (
    <div
      style={{
        position: isOnHome ? 'fixed' : 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: headerVisible ? 'auto' : 'none',
        boxShadow: headerVisible && isOnHome ? '0 4px 20px rgba(30,22,16,0.08)' : 'none',
      }}
    >
      {/* ── Top Info Bar (Desktop Only - Removed on Mobile as Requested) ─────────── */}
      <div
        className="header-top-bar hidden lg:block"
        style={{
          width: '100%',
          backgroundColor: '#FAE6E3',
          color: '#5C4A3E',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          padding: '8px 0',
          fontFamily: 'Jost, sans-serif',
          borderBottom: '1px solid #EBE1D8',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Left: Trust claim */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
            <span style={{ color: '#C0846A', fontSize: '9px', flexShrink: 0 }}>•</span>
            <span className="truncate" style={{ fontSize: '10.5px' }}>
              <span className="hidden sm:inline">Hyderabad's Most Trusted Bangle Store Since 2002</span>
              <span className="inline sm:hidden font-medium">Bangle Store Since 2002 • Hyderabad</span>
            </span>
          </div>

          {/* Center: Store Timings */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            className="hidden md:flex"
          >
            <Clock size={12} style={{ color: '#C0846A' }} />
            <span>Store Timings: 10:30 AM – 9:00 PM</span>
          </div>

          {/* Right: Contact & WhatsApp */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#5C4A3E',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontSize: '10.5px',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#C0846A')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#5C4A3E')}
            >
              <MessageCircle size={12} style={{ color: '#25D366' }} />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
            <span style={{ color: '#D5C7BC' }}>|</span>
            <a
              href={`tel:${settings.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#5C4A3E',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '10.5px',
              }}
            >
              <Phone size={10} style={{ color: '#C0846A' }} />
              <span className="hidden sm:inline">{settings.phone || '+91 98490 12345'}</span>
              <span className="inline sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Header ──────────────────────────────── */}
      <header
        style={{
          width: '100%',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(252, 232, 229, 0.96)' : '#FCE8E5',
          borderBottom: '1px solid #E2D5CA',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'box-shadow 0.25s ease, background-color 0.25s ease',
          boxShadow: scrolled ? '0 2px 20px rgba(30,22,16,0.07)' : 'none',
        }}
      >
        <div
          className="header-main-nav-inner container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? '64px' : '72px',
            transition: 'height 0.25s ease',
            gap: '24px',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleNavigate('home'); }}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
            aria-label="Gold N Glow – Home"
          >
            <GoldNGlowLogo />
          </a>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
              flex: 1,
              justifyContent: 'center',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive = currentPage === link.key;

              if (link.children) {
                return (
                  <div
                    key={link.key}
                    ref={dropdownRef}
                    style={{ position: 'relative' }}
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <button
                      onClick={() => handleNavigate(link.key)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 14px',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: isActive ? '#C0846A' : '#1E1610',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                        borderRadius: '6px',
                      }}
                      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#C0846A'; }}
                      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#1E1610'; }}
                    >
                      {link.label}
                      <ChevronDown
                        size={12}
                        style={{
                          color: '#C0846A',
                          transition: 'transform 0.2s ease',
                          transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '680px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '16px',
                          border: '1px solid #E2D5CA',
                          boxShadow: '0 16px 48px rgba(30,22,16,0.12)',
                          padding: '24px',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '20px',
                          zIndex: 100,
                          animation: 'fadeIn 0.18s ease',
                        }}
                        onMouseEnter={openDropdown}
                        onMouseLeave={closeDropdown}
                      >
                        {/* Left: categories */}
                        <div>
                          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A08878', marginBottom: '12px', fontFamily: 'Jost, sans-serif' }}>
                            EXPLORE BY CATEGORY
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {link.children.map((child, ci) => (
                              <a
                                key={ci}
                                href={`#${child.key}`}
                                onClick={(e) => { e.preventDefault(); handleNavigate(child.key); }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '10px 12px',
                                  borderRadius: '10px',
                                  textDecoration: 'none',
                                  transition: 'background-color 0.15s ease',
                                  border: '1px solid transparent',
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.backgroundColor = '#F0E4DC';
                                  (e.currentTarget as HTMLElement).style.borderColor = '#E2D5CA';
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                                  (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                                }}
                              >
                                <div>
                                  <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '16px', fontWeight: 600, color: '#1E1610' }}>
                                    {child.label}
                                  </div>
                                  <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#7A6356', marginTop: '1px' }}>
                                    {child.desc}
                                  </div>
                                </div>
                                <ArrowRight size={13} style={{ color: '#C0846A', flexShrink: 0 }} />
                              </a>
                            ))}
                          </div>
                        </div>
                        {/* Right: featured */}
                        <div>
                          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A08878', marginBottom: '12px', fontFamily: 'Jost, sans-serif' }}>
                            FEATURED SPOTLIGHT
                          </p>
                          <div
                            style={{
                              borderRadius: '12px',
                              overflow: 'hidden',
                              border: '1px solid #E2D5CA',
                              aspectRatio: '4 / 3',
                              backgroundColor: '#F0E4DC',
                              marginBottom: '12px',
                            }}
                          >
                            <img
                              src="/assets/collections/bridal-heritage.jpg"
                              alt="Bridal Heritage Collection"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', fontWeight: 600, color: '#1E1610' }}>
                            The Royal Nizami Bridal Suite
                          </p>
                          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#7A6356', marginTop: '3px' }}>
                            Personally curated by Syed Owais Ahmed
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.key}
                  href={`#${link.key === 'home' ? '' : link.key}`}
                  onClick={(e) => { e.preventDefault(); handleNavigate(link.key); }}
                  style={{
                    padding: '6px 14px',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: isActive ? '#C0846A' : '#1E1610',
                    borderRadius: '6px',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#C0846A'; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = isActive ? '#C0846A' : '#1E1610'; }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -1,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '20px',
                        height: '2px',
                        backgroundColor: '#C0846A',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* User Account / Profile */}
            <button
              onClick={() => handleNavigate('about')}
              className="hidden sm:flex header-action-btn"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: '1px solid #E2D5CA',
                color: '#5C4A3E',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#C0846A';
                (e.currentTarget as HTMLElement).style.color = '#C0846A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#E2D5CA';
                (e.currentTarget as HTMLElement).style.color = '#5C4A3E';
              }}
              aria-label="User Account"
            >
              <User size={15} />
            </button>

            {/* Cart with Pill Counter */}
            <button
              onClick={onOpenCart}
              className="header-action-btn"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: '1px solid #E2D5CA',
                color: '#5C4A3E',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#C0846A';
                (e.currentTarget as HTMLElement).style.color = '#C0846A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#E2D5CA';
                (e.currentTarget as HTMLElement).style.color = '#5C4A3E';
              }}
              aria-label="Shopping bag"
            >
              <ShoppingBag size={16} />
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#C0846A',
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartCount}
              </span>
            </button>

            {/* Catalogue CTA Button (Solid terracotta with Book icon) */}
            <button
              onClick={onOpenCatalogue}
              className="desktop-catalogue-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 18px',
                height: '38px',
                borderRadius: '6px',
                backgroundColor: '#C0846A',
                color: '#FFFFFF',
                border: 'none',
                fontFamily: 'Jost, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.22s ease',
                boxShadow: '0 2px 8px rgba(192, 132, 106, 0.25)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#A06A50';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#C0846A';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <span>CATALOGUE</span>
              <BookOpen size={13} />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: '1px solid #E2D5CA',
                color: '#1E1610',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            style={{
              borderTop: '1px solid #E2D5CA',
              backgroundColor: '#FFFFFF',
              padding: '20px 0 24px',
            }}
          >
            <div className="container">
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.key}
                    href={`#${link.key}`}
                    onClick={(e) => { e.preventDefault(); handleNavigate(link.key); }}
                    style={{
                      padding: '12px 16px',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: currentPage === link.key ? '#C0846A' : '#1E1610',
                      textDecoration: 'none',
                      borderRadius: '10px',
                      transition: 'background-color 0.15s ease',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F0E4DC'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2D5CA', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => { onOpenCatalogue(); setMobileOpen(false); }}
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    height: '44px',
                    borderRadius: '999px',
                    backgroundColor: '#C0846A',
                    color: '#FFFFFF',
                    border: 'none',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  Catalogue <ArrowRight size={11} />
                </button>
                <button
                  onClick={() => { onOpenCart(); setMobileOpen(false); }}
                  style={{
                    height: '44px',
                    width: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    color: '#1E1610',
                    border: '1px solid #E2D5CA',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <ShoppingBag size={17} />
                  {cartCount > 0 && (
                    <span style={{ position: 'absolute', top: '-3px', right: '-3px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#C0846A', color: '#fff', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .desktop-catalogue-btn { display: flex !important; }
          .header-top-bar { display: block !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .desktop-catalogue-btn { display: none !important; }
          .header-top-bar { display: none !important; }
          .header-main-nav-inner {
            height: 58px !important;
            gap: 8px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};
