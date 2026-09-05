import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CollectionItem } from '../lib/database.types';

gsap.registerPlugin(ScrollTrigger);

interface SignatureStripProps {
  collections: CollectionItem[];
  onSelectCollection?: (item: CollectionItem) => void;
  onNavigateCollections?: () => void;
  onNavigate?: (page: string) => void;
}

interface StoryItem {
  id: string;
  title: string;
  material: 'Lac' | 'Glass' | 'Lac & Glass';
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

export const SignatureStrip: React.FC<SignatureStripProps> = ({
  collections,
  onSelectCollection,
  onNavigateCollections,
  onNavigate,
}) => {
  // 6 Curated Editorial Stories: Handcrafted Lac & Artisan Glass
  const stories: StoryItem[] = [
    {
      id: 'heritage-lac',
      title: 'HERITAGE',
      material: 'Lac',
      subtitle: 'Raw Lac Resin & Kundan Mirror Work',
      description:
        'Centuries-old Tolichowki craftsmanship: 100% natural lac resin hand-shaped with vibrant stones, miniature mirrors, and sturdy brass foundations.',
      image: '/assets/collections/hyderabadi-lac.webp',
      category: 'lac',
    },
    {
      id: 'velvet-glass',
      title: 'VELVET',
      material: 'Glass',
      subtitle: 'Plush Velvet Matte & Annealed Crystal Glass',
      description:
        'Sensory velvet-textured glass bangles in royal crimson and emerald, bordered by dazzling micro-crystal spacers for rich festive elegance.',
      image: '/assets/collections/velvet-silk-thread.webp',
      category: 'glass',
    },
    {
      id: 'bridal-ensemble',
      title: 'BRIDAL CHOODA',
      material: 'Lac & Glass',
      subtitle: 'Opulent Matrimonial Lac & Glass Suites',
      description:
        'The crowning wedding trousseau: magnificent handcrafted openable Lac kadas seamlessly paired with 24 radiant bridal glass bangles.',
      image: '/assets/collections/bridal-heritage.webp',
      category: 'bridal',
    },
    {
      id: 'cz-glass',
      title: 'DIAMOND',
      material: 'Glass',
      subtitle: 'Micro-Pavé Sparkle on Fine Glass Rims',
      description:
        'Brilliant American diamond cubic zirconia stones encased along gold-rimmed annealed glass bangles for everyday glamour.',
      image: '/assets/collections/cz-diamond-bangles.webp',
      category: 'glass',
    },
    {
      id: 'meenakari-lac',
      title: 'MEENAKARI',
      material: 'Lac',
      subtitle: 'Hand-Painted Enamel on Sculpted Lac',
      description:
        'Delicate floral enamel artistry combined with uncut polki Kundan stones, set onto durable molded royal Lac bangles.',
      image: '/assets/collections/meenakari-pastel.webp',
      category: 'lac',
    },
    {
      id: 'pearl-glass',
      title: 'BASRA PEARL',
      material: 'Glass',
      subtitle: 'Lustrous Seed Pearls on Royal Glass Rims',
      description:
        'Classic Deccani royal aesthetics featuring multi-strand woven faux pearls and floral Kundan accents along fine glass bangles.',
      image: '/assets/collections/pearl-bangles-set.webp',
      category: 'glass',
    },
  ];

  const handleCardClick = (story: StoryItem) => {
    if (onSelectCollection) {
      const match = collections.find(
        (c) =>
          c.title.toLowerCase().includes(story.title.toLowerCase()) ||
          c.category === story.category
      );
      if (match) {
        onSelectCollection(match);
        return;
      }
      onSelectCollection({
        id: story.id,
        title: story.title,
        subtitle: story.subtitle,
        description: story.description,
        category: story.material === 'Lac' ? 'lac' : story.material === 'Glass' ? 'glass' : 'bridal',
        material: story.material,
        image_url: story.image,
        display_order: 1,
        featured: true,
        active: true,
      });
    }
  };

  const handleExploreClick = (story: StoryItem) => {
    const targetPage = story.category === 'bridal' ? 'bridal' : 'collections';
    if (onNavigate) {
      onNavigate(targetPage);
    } else if (onNavigateCollections) {
      onNavigateCollections();
    } else {
      window.location.hash = targetPage;
    }
  };

  // Reusable Horizontal Editorial Collection Card Component (2-in-a-row on mobile, horizontal on desktop)
  const renderCard = (story: StoryItem) => (
    <div
      className="w-full bg-white transition-all duration-300 hover:shadow-lg flex flex-col lg:flex-row items-stretch cursor-pointer group signature-story-card"
      onClick={() => handleCardClick(story)}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #EDE4DC',
        boxShadow: '0 4px 18px -4px rgba(45, 30, 20, 0.05)',
        borderRadius: '20px 4px 20px 4px',
        overflow: 'hidden',
      }}
    >
      {/* 1. Card Image */}
      <div className="signature-card-img-wrap">
        <img
          src={story.image}
          alt={story.title}
          className="signature-card-img group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* 2. Card Content */}
      <div className="signature-card-content flex flex-col justify-between">
        <div>
          {/* Title & Material Tag */}
          <div className="signature-card-header">
            <h3 className="signature-card-title">
              {story.title}
            </h3>
            <span
              className="signature-card-tag"
              style={{
                color: story.material.includes('Lac') ? '#9E6B15' : '#8A2E20',
                backgroundColor: story.material.includes('Lac') ? '#FDF5E6' : '#FAF0F2',
                border: story.material.includes('Lac') ? '1px solid rgba(158,107,21,0.25)' : '1px solid rgba(138,46,32,0.25)',
              }}
            >
              {story.material}
            </span>
          </div>

          {/* Subtitle */}
          <h4 className="signature-card-sub">
            {story.subtitle.replace('\n', ' ')}
          </h4>

          {/* Refined Hairline Divider */}
          <div className="signature-card-divider" />

          {/* Description */}
          <p className="signature-card-desc">
            {story.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="signature-card-action">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleExploreClick(story);
            }}
            className="btn btn-rose btn-sm signature-card-btn"
          >
            <span>EXPLORE</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );

  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(max-width: 1023px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.signature-mobile-stack-card');
        if (!cards.length) return;

        cards.forEach((card, index) => {
          if (index < cards.length - 1) {
            const nextCard = cards[index + 1];
            gsap.to(card, {
              scale: 0.94,
              opacity: 0.8,
              yPercent: -2,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 65%',
                end: 'top 20%',
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            });
          }
        });
      });
    }, stackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
      className="w-full relative"
      style={{
        background: 'linear-gradient(180deg, #F9E4E2 0%, #F7DDE0 50%, #F3D4D8 100%)',
        padding: 'clamp(56px, 7vw, 90px) 0',
      }}
    >
      {/* ── Centered Max-Width Container (1440px) ────────────────────── */}
      <div
        style={{
          maxWidth: '1440px',
          width: 'min(100% - 48px, 1440px)',
          margin: '0 auto',
        }}
      >
        {/* ── Section Heading with Elegant Typography ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            marginBottom: 'clamp(28px, 4vw, 44px)',
          }}
        >
          <div
            style={{
              height: '1px',
              width: '48px',
              backgroundColor: '#C0846A',
              opacity: 0.5,
            }}
          />
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(22px, 3vw, 34px)',
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: '#120A06',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Explore Our Signature Collections
          </h2>
          <div
            style={{
              height: '1px',
              width: '48px',
              backgroundColor: '#C0846A',
              opacity: 0.5,
            }}
          />
        </div>

        {/* ── Desktop Two-Column Architecture: Left 46% Cards / Right 54% Full-Height Pinned Video ── */}
        <div className="signature-split-grid">
          
          {/* ── Mobile/Tablet Static Video (Rendered before cards on small screens) ── */}
          <div className="block lg:hidden w-full mb-8">
            <div
              className="w-full relative overflow-hidden"
              style={{
                aspectRatio: '16 / 9',
                borderRadius: '18px',
                border: '1px solid #EDE4DC',
                boxShadow: '0 16px 40px -12px rgba(45, 30, 20, 0.09)',
                backgroundColor: '#1E1610',
              }}
            >
              <video
                src="https://res.cloudinary.com/akmdvmmw/video/upload/v1788004274/Create_a_second_ultra_realis_shkdo7.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="auto"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

          {/* ── MOBILE SCROLL STACK: Smooth GSAP Cards Stacking Deck (Mobile Only) ── */}
          <div ref={stackRef} className="block lg:hidden w-full signature-mobile-stack-wrapper">
            {stories.map((story, index) => (
              <div
                key={`mobile-stack-${story.id}`}
                className="signature-mobile-stack-card group cursor-pointer"
                onClick={() => handleCardClick(story)}
                style={{
                  position: 'sticky',
                  top: `calc(70px + ${index * 8}px)`,
                  zIndex: index + 1,
                  marginBottom: '24px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px 4px 20px 4px',
                  border: '1px solid #EDE4DC',
                  boxShadow: '0 10px 32px -6px rgba(45, 30, 20, 0.12)',
                  overflow: 'hidden',
                  willChange: 'transform, opacity',
                  transition: 'border-color 0.25s ease',
                }}
              >
                {/* 1. Image with refined 16:10 ratio */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#FAF5F0',
                  }}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    className="group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(30, 22, 16, 0.4) 0%, transparent 40%)',
                    }}
                  />
                </div>

                {/* 2. Content */}
                <div style={{ padding: '18px 18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '21px',
                        fontWeight: 600,
                        color: '#120A06',
                        lineHeight: 1.15,
                        letterSpacing: '0.02em',
                        margin: 0,
                      }}
                    >
                      {story.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        color: story.material.includes('Lac') ? '#9E6B15' : '#8A2E20',
                        backgroundColor: story.material.includes('Lac') ? '#FDF5E6' : '#FAF0F2',
                        border: story.material.includes('Lac') ? '1px solid rgba(158,107,21,0.25)' : '1px solid rgba(138,46,32,0.25)',
                      }}
                    >
                      {story.material}
                    </span>
                  </div>

                  <h4
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '14.5px',
                      fontWeight: 500,
                      fontStyle: 'italic',
                      color: '#8A2E20',
                      lineHeight: 1.25,
                      margin: '0 0 10px 0',
                    }}
                  >
                    {story.subtitle.replace('\n', ' ')}
                  </h4>

                  <div style={{ width: '36px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, marginBottom: '12px' }} />

                  <p
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '12.5px',
                      lineHeight: 1.6,
                      color: '#5C4A3E',
                      marginBottom: '16px',
                    }}
                  >
                    {story.description}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExploreClick(story);
                    }}
                    className="btn btn-rose btn-sm w-full"
                    style={{
                      height: '38px',
                      borderRadius: '4px',
                      fontSize: '10.5px',
                      letterSpacing: '0.12em',
                      justifyContent: 'center',
                    }}
                  >
                    <span>EXPLORE {story.title}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── LEFT COLUMN: Desktop Cards (Desktop Only) ── */}
          <div className="hidden lg:flex lg:flex-col w-full gap-5">
            {stories.map((story) => (
              <div key={story.id} className="w-full">
                {renderCard(story)}
              </div>
            ))}
          </div>

          {/* ── RIGHT COLUMN: Full-Height Track Housing the Large Pinned Video ── */}
          <div className="hidden lg:block w-full h-full relative" style={{ height: '100%' }}>
            <div
              className="signature-sticky-video"
              style={{
                position: 'sticky',
                top: 'clamp(70px, 9vh, 90px)',
                width: '100%',
                height: 'calc(100vh - clamp(100px, 12vh, 130px))',
                minHeight: '520px',
                maxHeight: '840px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px -10px rgba(30, 22, 16, 0.12)',
                border: '1px solid #EDE4DC',
                backgroundColor: '#1E1610',
              }}
            >
              <video
                src="https://res.cloudinary.com/akmdvmmw/video/upload/v1788004274/Create_a_second_ultra_realis_shkdo7.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="auto"
                className="w-full h-full object-cover block"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .signature-split-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: stretch;
        }
        @media (min-width: 1024px) {
          .signature-split-grid {
            grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
            gap: clamp(28px, 3vw, 44px);
            align-items: stretch;
          }
        }

        /* ── Card Styles: Mobile First (2 per row) ── */
        .signature-card-img-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          position: relative;
          overflow: hidden;
          background-color: #F5EFE8;
          flex-shrink: 0;
        }
        .signature-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .signature-card-content {
          width: 100%;
          padding: 10px 10px 12px;
          box-sizing: border-box;
        }
        .signature-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          margin-bottom: 3px;
        }
        .signature-card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 14.5px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: #120A06;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 68%;
        }
        .signature-card-tag {
          font-family: 'Jost', sans-serif;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 1.5px 5px;
          border-radius: 3px;
          flex-shrink: 0;
        }
        .signature-card-sub {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 11.5px;
          font-weight: 500;
          font-style: italic;
          line-height: 1.25;
          color: #8A2E20;
          margin: 0 0 6px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .signature-card-divider {
          display: none;
        }
        .signature-card-desc {
          display: none;
        }
        .signature-card-action {
          margin-top: 6px;
          width: 100%;
        }
        .signature-card-btn {
          width: 100% !important;
          height: 32px !important;
          font-size: 9.5px !important;
          padding: 0 8px !important;
          justify-content: center !important;
          border-radius: 4px !important;
          letter-spacing: 0.08em !important;
        }

        /* ── Card Styles: Desktop (Horizontal Editorial Split) ── */
        @media (min-width: 1024px) {
          .signature-story-card {
            min-height: 220px;
          }
          .signature-card-img-wrap {
            width: 42%;
            min-width: 42%;
            aspect-ratio: auto;
            align-self: stretch;
          }
          .signature-card-img {
            position: absolute;
            inset: 0;
          }
          .signature-card-content {
            width: 58%;
            padding: 24px 28px 22px 32px;
          }
          .signature-card-header {
            justify-content: flex-start;
            gap: 10px;
            margin-bottom: 5px;
          }
          .signature-card-title {
            font-size: 22px;
            line-height: 1.15;
            white-space: normal;
            overflow: visible;
            text-overflow: unset;
            max-width: none;
          }
          .signature-card-tag {
            font-size: 10px;
            letter-spacing: 0.14em;
            padding: 2.5px 8px;
            border-radius: 4px;
          }
          .signature-card-sub {
            font-size: 14.5px;
            line-height: 1.3;
            margin-bottom: 10px;
            white-space: normal;
            overflow: visible;
            text-overflow: unset;
          }
          .signature-card-divider {
            display: block;
            width: 32px;
            height: 1px;
            background-color: #C0846A;
            opacity: 0.45;
            margin-bottom: 12px;
          }
          .signature-card-desc {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-family: 'Jost', sans-serif;
            font-size: 12.5px;
            font-weight: 400;
            line-height: 1.6;
            color: #5C4A3E;
            margin: 0;
          }
          .signature-card-action {
            margin-top: 14px;
            width: auto;
          }
          .signature-card-btn {
            width: auto !important;
            height: 34px !important;
            padding: 0 18px !important;
            font-size: 10.5px !important;
            letter-spacing: 0.1em !important;
          }
        }
      `}</style>
    </section>
  );
};
