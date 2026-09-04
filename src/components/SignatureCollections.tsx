import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CollectionItem } from '../lib/database.types';

interface SignatureCollectionsProps {
  collections?: CollectionItem[];
  onSelectCollection?: (item: CollectionItem) => void;
  onOpenCatalogue?: () => void;
}

interface ShowcaseSlide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  badge: string;
  link_url?: string;
}

const DEFAULT_SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'showcase-1',
    category: 'ROYAL NIZAMI',
    title: 'The Nizami Royal Trousseau Kada',
    subtitle: 'Handcrafted Uncut Polki & Emerald Heritage',
    description:
      'Hand-set uncut polki and vivid green emerald beads encased in hand-carved floral brass filigree, echoing the historic courts of Hyderabad.',
    image_url: '/assets/collections/showcase-nizami-kada.jpg',
    badge: 'HERITAGE SUITE',
  },
  {
    id: 'showcase-2',
    category: 'GULBAHAR EDIT',
    title: 'The Gulbahar Pastel Meenakari Suite',
    subtitle: 'Floral Spring Enamel Hand-Painted Motifs',
    description:
      'Delicate pastel pink and mint green enamel artistry with fine polki accents, custom curated for reception and mehendi festivities.',
    image_url: '/assets/collections/showcase-meenakari-suite.jpg',
    badge: 'PASTEL MEENAKARI',
  },
  {
    id: 'showcase-3',
    category: 'KOHINOOR CZ',
    title: 'The Kohinoor Solitaire Crystal Bangles',
    subtitle: 'Triple-Tier American Diamond Sparkle',
    description:
      'Micro-pavé faceted cubic zirconia stones encased in high-refraction golden alloy for effortless radiance and timeless celebration wear.',
    image_url: '/assets/collections/showcase-kohinoor-cz.jpg',
    badge: 'CLASSIC SPARKLE',
  },
  {
    id: 'showcase-4',
    category: 'SHAHI MOTI',
    title: 'The Shahi Moti Basra Pearl Chooda',
    subtitle: 'Woven Faux Pearls with Gold-Tone Filigree',
    description:
      'An aristocratic bridal suite of lustrous woven Basra pearls and ruby cabochons designed for the quintessential royal bride.',
    image_url: '/assets/collections/showcase-basra-pearl.jpg',
    badge: 'ROYAL BASRA',
  },
];

export const SignatureCollections: React.FC<SignatureCollectionsProps> = ({
  collections = [],
  onSelectCollection,
  onOpenCatalogue,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Map dynamic collections or fall back to default high-res curated showcase slides
  const signatureItems = collections.filter(
    (c) => c.category === 'signature' && c.active
  );

  const slides: ShowcaseSlide[] =
    signatureItems.length >= 4
      ? signatureItems.slice(0, 4).map((item, idx) => ({
          id: item.id,
          category: item.badge_label || DEFAULT_SHOWCASE_SLIDES[idx].category,
          title: item.title,
          subtitle: item.subtitle || DEFAULT_SHOWCASE_SLIDES[idx].subtitle,
          description: item.description || DEFAULT_SHOWCASE_SLIDES[idx].description,
          image_url:
            DEFAULT_SHOWCASE_SLIDES[idx]?.image_url || item.image_url,
          badge: item.badge_label || DEFAULT_SHOWCASE_SLIDES[idx].badge,
        }))
      : DEFAULT_SHOWCASE_SLIDES;

  // Auto transition every 2.5 seconds (2500ms) seamlessly
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentIndex];

  return (
    <section
      id="collections-catalogue"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #E8D2BD 0%, #EFE0C9 50%, #EBD8BE 100%)',
        padding: '90px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          width: 'min(100% - 48px, 1440px)',
          margin: '0 auto',
        }}
      >
        {/* ── Section Header ── */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto 56px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#8C4D15',
              }}
            >
              EXPLORE OUR CATALOGUE
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 3.8vw, 42px)',
              fontWeight: 600,
              color: '#120A06',
              lineHeight: 1.15,
              marginBottom: '14px',
            }}
          >
            Full Collections Showcase
          </h2>

          <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, margin: '0 auto 16px' }} />

          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '14.5px',
              lineHeight: 1.7,
              color: '#5C4A3E',
              margin: 0,
            }}
          >
            From Nizami polki kadas to royal meenakari suites, immerse in Hyderabad’s premier bangle designs.
          </p>
        </div>

        {/* ── Grand Dynamic Panoramic Showcase Banner ── */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '520px',
            borderRadius: '28px 4px 28px 4px',
            overflow: 'hidden',
            border: '1px solid #EDE4DC',
            boxShadow: '0 16px 48px rgba(45, 30, 20, 0.08)',
            backgroundColor: '#FAF5F0',
          }}
        >
          {/* ── Background Slides with Smooth Cross-Fade & Ken Burns Motion ── */}
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center left',
                    transform: isActive ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 5000ms ease-out',
                  }}
                />

                {/* Natural Soft Lighting Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to right, rgba(250, 245, 240, 0) 0%, rgba(250, 245, 240, 0) 45%, rgba(250, 245, 240, 0.3) 75%, rgba(250, 245, 240, 0.65) 100%)',
                  }}
                />

                {/* Tablet / Mobile Soft Overlay */}
                <div
                  className="block lg:hidden"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to bottom, rgba(250, 245, 240, 0) 0%, rgba(250, 245, 240, 0.75) 55%, rgba(250, 245, 240, 0.95) 100%)',
                  }}
                />
              </div>
            );
          })}

          {/* ── Right-Side Luxury Editorial Content Box ── */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              minHeight: '520px',
              maxWidth: '560px',
              marginLeft: 'auto',
              padding: 'clamp(32px, 5vw, 64px)',
            }}
          >
            {/* Slide Category & Number Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#8C4D15',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  padding: '4px 12px',
                  borderRadius: '2px',
                  border: '1px solid rgba(192, 132, 106, 0.25)',
                  boxShadow: '0 2px 6px rgba(45, 30, 20, 0.04)',
                }}
              >
                <span>{activeSlide.badge}</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span>0{currentIndex + 1}/0{slides.length}</span>
              </span>
            </div>

            {/* Headline */}
            <h2
              key={`title-${currentIndex}`}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 44px)',
                fontWeight: 600,
                lineHeight: 1.08,
                color: '#120A06',
                marginBottom: '4px',
                animation: 'fadeSlideUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {activeSlide.title}
            </h2>

            {/* Subtitle */}
            <h3
              key={`sub-${currentIndex}`}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(20px, 2.6vw, 26px)',
                fontWeight: 500,
                fontStyle: 'italic',
                color: '#8A2E20',
                lineHeight: 1.2,
                marginBottom: '16px',
                animation: 'fadeSlideUp 650ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {activeSlide.subtitle}
            </h3>

            {/* Refined Hairline Divider */}
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, marginBottom: '18px' }} />

            {/* Description */}
            <p
              key={`desc-${currentIndex}`}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '14.5px',
                lineHeight: 1.7,
                color: '#5C4A3E',
                marginBottom: '28px',
                maxWidth: '460px',
                animation: 'fadeSlideUp 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {activeSlide.description}
            </p>

            {/* Action CTA Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  if (onSelectCollection) {
                    const match = signatureItems.find((c) => c.title === activeSlide.title);
                    if (match) {
                      onSelectCollection(match);
                    } else if (signatureItems.length > 0) {
                      onSelectCollection(signatureItems[0]);
                    }
                  } else if (onOpenCatalogue) {
                    onOpenCatalogue();
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 26px',
                  height: '42px',
                  borderRadius: '4px',
                  backgroundColor: '#C0846A',
                  color: '#FFFFFF',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1px solid #C0846A',
                  boxShadow: '0 2px 8px rgba(192, 132, 106, 0.25)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#A06A50';
                  (e.currentTarget as HTMLElement).style.borderColor = '#A06A50';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#C0846A';
                  (e.currentTarget as HTMLElement).style.borderColor = '#C0846A';
                }}
              >
                <span>EXPLORE THIS SET</span>
                <ArrowRight size={12} />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenCatalogue) {
                    onOpenCatalogue();
                  } else if (onSelectCollection && signatureItems.length > 0) {
                    onSelectCollection(signatureItems[0]);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 22px',
                  height: '42px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#C0846A',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1.5px solid #C0846A',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#C0846A';
                  (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  (e.currentTarget as HTMLElement).style.color = '#C0846A';
                }}
              >
                <span>VIEW FULL CATALOGUE</span>
              </button>
            </div>

            {/* Dynamic Progress Indicator Dots / Lines */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '28px',
              }}
            >
              {slides.map((_, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      height: '4px',
                      width: isSelected ? '32px' : '10px',
                      borderRadius: '2px',
                      backgroundColor: isSelected ? '#C0846A' : '#EDE4DC',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.4s ease',
                    }}
                    title={`Slide ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner to Dedicated Catalogue */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            type="button"
            onClick={() => {
              if (onOpenCatalogue) {
                onOpenCatalogue();
              } else if (onSelectCollection && signatureItems.length > 0) {
                onSelectCollection(signatureItems[0]);
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0 28px',
              height: '42px',
              borderRadius: '4px',
              backgroundColor: '#FFFFFF',
              color: '#C0846A',
              fontFamily: 'Jost, sans-serif',
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1.5px solid #C0846A',
              transition: 'all 0.22s ease',
              boxShadow: '0 2px 8px rgba(45, 30, 20, 0.03)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#C0846A';
              (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
              (e.currentTarget as HTMLElement).style.color = '#C0846A';
            }}
          >
            <span>EXPLORE COMPLETE SHOWCASE ARCHIVE</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
