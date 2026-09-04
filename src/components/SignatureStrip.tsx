import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CollectionItem } from '../lib/database.types';

interface SignatureStripProps {
  collections: CollectionItem[];
  onSelectCollection?: (item: CollectionItem) => void;
  onNavigateCollections?: () => void;
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
}) => {
  // 6 Curated Editorial Stories: Handcrafted Lac & Artisan Glass
  const stories: StoryItem[] = [
    {
      id: 'lac-mirror',
      title: 'HERITAGE LAC',
      material: 'Lac',
      subtitle: 'Raw Lac Resin &\nKundan Mirror Work',
      description:
        'Centuries-old Tolichowki craftsmanship: 100% natural lac resin hand-shaped with vibrant stones, miniature mirrors, and sturdy brass foundations.',
      image: '/assets/collections/hyderabadi-lac.jpg',
      category: 'lac',
    },
    {
      id: 'velvet-glass',
      title: 'VELVET GLASS',
      material: 'Glass',
      subtitle: 'Plush Velvet Matte &\nAnnealed Crystal Glass',
      description:
        'Sensory velvet-textured glass bangles in royal crimson and emerald, bordered by dazzling micro-crystal spacers for rich festive elegance.',
      image: '/assets/collections/velvet-silk-thread.jpg',
      category: 'glass',
    },
    {
      id: 'bridal-ensemble',
      title: 'BRIDAL CHOODA',
      material: 'Lac & Glass',
      subtitle: 'Opulent Matrimonial\nLac & Glass Suites',
      description:
        'The crowning wedding trousseau: magnificent handcrafted openable Lac kadas seamlessly paired with 24 radiant bridal glass bangles.',
      image: '/assets/collections/bridal-heritage.jpg',
      category: 'bridal',
    },
    {
      id: 'cz-glass',
      title: 'DIAMOND GLASS',
      material: 'Glass',
      subtitle: 'Micro-Pavé Sparkle on\nFine Glass Rims',
      description:
        'Brilliant American diamond cubic zirconia stones encased along gold-rimmed annealed glass bangles for everyday glamour.',
      image: '/assets/collections/cz-diamond-bangles.jpg',
      category: 'glass',
    },
    {
      id: 'meenakari-lac',
      title: 'MEENAKARI LAC',
      material: 'Lac',
      subtitle: 'Hand-Painted Enamel\non Sculpted Lac',
      description:
        'Delicate floral enamel artistry combined with uncut polki Kundan stones, set onto durable molded royal Lac bangles.',
      image: '/assets/collections/meenakari-pastel.jpg',
      category: 'lac',
    },
    {
      id: 'pearl-glass',
      title: 'BASRA GLASS',
      material: 'Glass',
      subtitle: 'Lustrous Seed Pearls on\nRoyal Glass Rims',
      description:
        'Classic Deccani royal aesthetics featuring multi-strand woven faux pearls and floral Kundan accents along fine glass bangles.',
      image: '/assets/collections/pearl-bangles-set.jpg',
      category: 'glass',
    },
  ];

  const handleAction = (story: StoryItem) => {
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
      return;
    }
    if (onNavigateCollections) onNavigateCollections();
    else window.location.hash = 'collections';
  };

  // Reusable Horizontal Editorial Collection Card Component
  const renderCard = (story: StoryItem) => (
    <div
      className="w-full bg-white transition-all duration-300 hover:shadow-lg flex flex-col sm:flex-row items-center cursor-pointer group signature-story-card"
      onClick={() => handleAction(story)}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #EDE4DC',
        boxShadow: '0 8px 30px -8px rgba(45, 30, 20, 0.06)',
        borderRadius: '24px 4px 24px 4px',
        padding: 'clamp(14px, 3.5vw, 20px)',
        gap: 'clamp(14px, 3vw, 20px)',
      }}
    >
      {/* 1. Card Image (Left Thumbnail inside Card) */}
      <div
        className="w-full sm:w-[46%] flex-shrink-0 overflow-hidden"
        style={{
          backgroundColor: '#F5EFE8',
          aspectRatio: '1.15 / 1',
          borderRadius: '18px 2px 18px 2px',
        }}
      >
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* 2. Card Content (Right Column inside Card) */}
      <div className="w-full sm:w-[54%] flex flex-col items-start justify-center">
        {/* Title & Material Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(22px, 5.5vw, 26px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '0.04em',
              color: '#120A06',
              margin: 0,
            }}
          >
            {story.title}
          </h3>
          <span
            className={
              story.material === 'Lac'
                ? 'type-editorial-tag type-editorial-tag-gold'
                : story.material === 'Glass'
                ? 'type-editorial-tag type-editorial-tag-muted'
                : 'type-editorial-tag type-editorial-tag-rose'
            }
          >
            {story.material}
          </span>
        </div>

        {/* Subtitle */}
        <h4
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '16.5px',
            fontWeight: 500,
            fontStyle: 'italic',
            lineHeight: 1.2,
            color: '#8A2E20',
            marginBottom: '8px',
            whiteSpace: 'pre-line',
          }}
        >
          {story.subtitle}
        </h4>

        {/* Refined Hairline Divider */}
        <div style={{ width: '32px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, marginBottom: '10px' }} />

        {/* Description */}
        <p
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '12.5px',
            fontWeight: 450,
            lineHeight: 1.6,
            color: '#3B2921',
            marginBottom: '14px',
          }}
        >
          {story.description}
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAction(story);
          }}
          className="btn btn-rose btn-sm w-full sm:w-auto"
          style={{
            borderRadius: '5px',
            gap: '8px',
          }}
        >
          <span>EXPLORE COLLECTION</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );

  return (
    <section
      id="collections"
      className="w-full relative"
      style={{
        background: 'linear-gradient(180deg, #F9E4E2 0%, #F7DDE0 50%, #F3D4D8 100%)',
        padding: '90px 0',
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
        {/* ── Section Heading with Generous 1-Inch (56px) Spacing ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '56px',
          }}
        >
          <div
            style={{
              height: '1px',
              width: '42px',
              backgroundColor: '#C0846A',
              opacity: 0.5,
            }}
          />
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: '#120A06',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            EXPLORE OUR SIGNATURE COLLECTIONS
          </span>
          <div
            style={{
              height: '1px',
              width: '42px',
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

          {/* ── LEFT COLUMN: All Six Horizontal Cards in Normal Document Flow ── */}
          <div className="flex flex-col w-full" style={{ gap: '28px' }}>
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
          gap: 32px;
          align-items: stretch;
        }
        @media (min-width: 1024px) {
          .signature-split-grid {
            grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
            gap: clamp(32px, 3.2vw, 48px);
            align-items: stretch;
          }
        }
      `}</style>
    </section>
  );
};
