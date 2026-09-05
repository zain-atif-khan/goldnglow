import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { CollectionItem } from '../lib/database.types';

interface SignatureCollectionsProps {
  collections?: CollectionItem[];
  onSelectCollection?: (item: CollectionItem) => void;
  onOpenCatalogue?: () => void;
  onNavigate?: (page: string) => void;
  whatsapp?: string;
}

interface ShowcaseSlide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  desktop_image: string;
  mobile_image: string;
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
    desktop_image: '/assets/collections/showcase-nizami-kada.webp',
    mobile_image: '/assets/showcase/bangles-1-polki.webp',
    image_url: '/assets/collections/showcase-nizami-kada.webp',
    badge: 'HERITAGE SUITE',
  },
  {
    id: 'showcase-2',
    category: 'GULBAHAR EDIT',
    title: 'The Gulbahar Pastel Meenakari Suite',
    subtitle: 'Floral Spring Enamel Hand-Painted Motifs',
    description:
      'Delicate pastel pink and mint green enamel artistry with fine polki accents, custom curated for reception and mehendi festivities.',
    desktop_image: '/assets/collections/showcase-meenakari-suite.webp',
    mobile_image: '/assets/showcase/bangles-3-meenakari.webp',
    image_url: '/assets/collections/showcase-meenakari-suite.webp',
    badge: 'PASTEL MEENAKARI',
  },
  {
    id: 'showcase-3',
    category: 'KOHINOOR CZ',
    title: 'The Kohinoor Solitaire Crystal Bangles',
    subtitle: 'Triple-Tier American Diamond Sparkle',
    description:
      'Micro-pavé faceted cubic zirconia stones encased in high-refraction golden alloy for effortless radiance and timeless celebration wear.',
    desktop_image: '/assets/collections/showcase-kohinoor-cz.webp',
    mobile_image: '/assets/showcase/bangles-2-cz.webp',
    image_url: '/assets/collections/showcase-kohinoor-cz.webp',
    badge: 'CLASSIC SPARKLE',
  },
  {
    id: 'showcase-4',
    category: 'SHAHI MOTI',
    title: 'The Shahi Moti Basra Pearl Chooda',
    subtitle: 'Woven Faux Pearls with Gold-Tone Filigree',
    description:
      'An aristocratic bridal suite of lustrous woven Basra pearls and ruby cabochons designed for the quintessential royal bride.',
    desktop_image: '/assets/collections/showcase-basra-pearl.webp',
    mobile_image: '/assets/showcase/bangles-4-pearl.webp',
    image_url: '/assets/collections/showcase-basra-pearl.webp',
    badge: 'ROYAL BASRA',
  },
];

export const SignatureCollections: React.FC<SignatureCollectionsProps> = ({
  collections = [],
  onSelectCollection,
  onOpenCatalogue,
  onNavigate,
  whatsapp = '919014761009',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Use the 4 curated showcase slides (desktop panoramic + mobile 4:5)
  const slides: ShowcaseSlide[] = DEFAULT_SHOWCASE_SLIDES;

  // Auto transition every 2.5 seconds seamlessly when not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  const activeSlide = slides[currentIndex];

  return (
    <section
      id="collections-catalogue"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #E8D2BD 0%, #EDDCB7 50%, #E8D4B7 100%)',
        padding: 'clamp(50px, 6vw, 76px) 0 clamp(60px, 8vw, 90px)',
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
            margin: '0 auto clamp(32px, 4.5vw, 52px)',
          }}
        >
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(30px, 4vw, 46px)',
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
          onClick={() => {
            if (onSelectCollection) {
              const match = collections.find((c) => c.title.toLowerCase() === activeSlide.title.toLowerCase());
              if (match) {
                onSelectCollection(match);
              } else {
                onSelectCollection({
                  id: activeSlide.id,
                  title: activeSlide.title,
                  subtitle: activeSlide.subtitle,
                  description: activeSlide.description,
                  category: 'signature',
                  image_url: activeSlide.image_url,
                  display_order: 1,
                  featured: true,
                  active: true,
                });
              }
            }
          }}
          className="cursor-pointer"
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
                <picture className="w-full h-full block">
                  <source media="(min-width: 1024px)" srcSet={slide.desktop_image} />
                  <img
                    src={slide.mobile_image}
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
                </picture>

                {/* Desktop Natural Soft Right Lighting Overlay */}
                <div
                  className="hidden lg:block"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to right, rgba(250, 245, 240, 0) 0%, rgba(250, 245, 240, 0) 45%, rgba(250, 245, 240, 0.3) 75%, rgba(250, 245, 240, 0.65) 100%)',
                  }}
                />
              </div>
            );
          })}

          {/* ── Right-Side Luxury Editorial Content Box ── */}
          <div
            className="showcase-editorial-content"
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
              padding: 'clamp(28px, 5vw, 64px)',
            }}
          >
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

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNavigate) {
                    onNavigate('collections');
                  } else if (onOpenCatalogue) {
                    onOpenCatalogue();
                  } else {
                    window.location.hash = 'collections';
                  }
                }}
                className="button-sliding-pill w-full sm:w-auto justify-center"
                style={{
                  height: '44px',
                  paddingLeft: '22px',
                  paddingRight: '12px',
                  backgroundColor: '#C0846A',
                }}
              >
                <span>EXPLORE THIS SET</span>
                <div className="button__icon-wrapper">
                  <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width="10" height="10">
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.28.024z" fill="currentColor"></path>
                  </svg>
                  <svg viewBox="0 0 14 15" fill="none" width="10" height="10" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.28.024z" fill="currentColor"></path>
                  </svg>
                </div>
              </button>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello Gold N Glow! I would like to inquire about "${activeSlide.title}" (${activeSlide.subtitle}) from your signature showcase.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn btn-whatsapp w-full sm:w-auto justify-center"
                style={{
                  height: '44px',
                  padding: '0 22px',
                  borderRadius: '5px',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={15} />
                <span>DISCUSS ON WHATSAPP</span>
              </a>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
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
              } else if (onNavigate) {
                onNavigate('collections');
              } else if (onSelectCollection && collections.length > 0) {
                onSelectCollection(collections[0]);
              }
            }}
            className="button-bubble-expand"
            style={{
              height: '46px',
              padding: '0 32px',
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
        @media (max-width: 768px) {
          .showcase-editorial-content {
            background: rgba(255, 255, 255, 0.18) !important;
            background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 100%) !important;
            backdrop-filter: blur(14px) saturate(160%) !important;
            -webkit-backdrop-filter: blur(14px) saturate(160%) !important;
            border-radius: 18px !important;
            border: 1px solid rgba(255, 255, 255, 0.45) !important;
            padding: 24px 18px !important;
            margin: 14px 10px !important;
            min-height: auto !important;
            box-shadow: 0 8px 32px 0 rgba(45, 30, 20, 0.18), inset 0 1px 0 0 rgba(255, 255, 255, 0.55) !important;
            width: calc(100% - 20px) !important;
          }
          .showcase-editorial-content h2,
          .showcase-editorial-content h3 {
            text-shadow: 0 1px 8px rgba(30, 18, 10, 0.22), 0 0px 1px rgba(255, 255, 255, 0.6) !important;
            color: #1a0e08 !important;
          }
          .showcase-editorial-content p {
            text-shadow: 0 1px 4px rgba(30, 18, 10, 0.18) !important;
          }
        }
      `}</style>
    </section>
  );
};
