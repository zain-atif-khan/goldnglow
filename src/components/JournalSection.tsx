import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { JournalPost } from '../lib/database.types';

interface JournalSectionProps {
  posts?: JournalPost[];
  onOpenPost: (post: JournalPost) => void;
}

interface JournalSlide {
  id: string;
  eyebrow: string;
  heading_line1: string;
  heading_line2: string;
  subtitle: string;
  description: string;
  image_url: string;
  flipImage?: boolean;
  button_text: string;
  slug?: string;
}

const JOURNAL_SLIDES: JournalSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'JOURNAL & GUIDES',
    heading_line1: 'The Gold N Glow',
    heading_line2: 'Journal.',
    subtitle: 'Tips, Trends & Timeless Bangle Wisdom.',
    description:
      'Everything you need to know about bangles — from choosing the perfect pair to caring for your treasures.',
    image_url: '/assets/journal/journal-bg-1.jpg',
    flipImage: false,
    button_text: 'EXPLORE ALL ARTICLES',
    slug: 'nizam-legacy-bangle-design',
  },
  {
    id: 'slide-2',
    eyebrow: 'HERITAGE & CRAFT',
    heading_line1: 'The Nizam Legacy:',
    heading_line2: 'Royal Heritage.',
    subtitle: 'How Royal Hyderabad Shaped Indian Bangle Design.',
    description:
      'Explore the fascinating history of Nizami jewellery craftsmanship and how uncut polki and meenakari became the crown jewels of Hyderabad.',
    image_url: '/assets/journal/journal-bg-2.jpg',
    flipImage: true,
    button_text: 'READ HERITAGE ARTICLE',
    slug: 'nizam-legacy-bangle-design',
  },
  {
    id: 'slide-3',
    eyebrow: 'BRIDAL STYLING GUIDE',
    heading_line1: 'Bridal Stacking 101:',
    heading_line2: 'The Royal Harmony.',
    subtitle: 'The Rule of Proportions for Your Wedding Ensemble.',
    description:
      'A comprehensive visual guide to balancing kadas, thin chudiyan, and patlis for a grand bridal ensemble that feels regal yet weightless.',
    image_url: '/assets/journal/journal-bg-3.jpg',
    flipImage: true,
    button_text: 'READ BRIDAL GUIDE',
    slug: 'bridal-bangle-stacking-proportions',
  },
  {
    id: 'slide-4',
    eyebrow: 'CARE & MAINTENANCE',
    heading_line1: 'Preserving The Luster:',
    heading_line2: 'Heirloom Care.',
    subtitle: 'Care & Maintenance of Kundan & Polki.',
    description:
      'Simple yet essential tips from our master craftsmen on keeping your precious bangles shining bright across generations.',
    image_url: '/assets/journal/journal-bg-4.jpg',
    flipImage: true,
    button_text: 'READ CARE GUIDE',
    slug: 'care-maintenance-kundan-polki',
  },
];

const DEFAULT_ARTICLES = [
  {
    id: '1',
    title: 'The Nizam Legacy: How Royal Hyderabad Shaped Indian Bangle Design',
    title_line1: 'The Nizam Legacy: How Royal Hyderabad',
    title_line2: 'Shaped Indian Bangle Design',
    slug: 'nizam-legacy-bangle-design',
    category: 'HERITAGE & CRAFT',
    excerpt: 'Explore the fascinating history of Nizami jewellery craftsmanship and how uncut polki and meenakari became the crown jewels of Hyderabad.',
    cover_image_url: '/assets/journal/journal-card-1.jpg',
    read_time: '5 min read',
    published: true,
  },
  {
    id: '2',
    title: 'Bridal Bangle Stacking 101: The Rule of Proportions',
    title_line1: 'Bridal Bangle Stacking 101:',
    title_line2: 'The Rule of Proportions',
    slug: 'bridal-bangle-stacking-proportions',
    category: 'STYLING GUIDE',
    excerpt: 'A comprehensive visual guide to balancing kadas, thin chudiyan, and patlis for a grand bridal ensemble that feels regal yet weightless.',
    cover_image_url: '/assets/journal/journal-card-2.jpg',
    read_time: '4 min read',
    published: true,
  },
  {
    id: '3',
    title: 'How to Measure Your Wrist for the Perfect Bangle Fit',
    title_line1: 'How to Measure Your Wrist',
    title_line2: 'for the Perfect Bangle Fit',
    slug: 'measure-wrist-bangle-fit-guide',
    category: 'BUYER’S GUIDE',
    excerpt: 'Step-by-step instructions to find your exact Indian bangle size (from 2.2 to 2.10) with ease before ordering online or visiting our showroom.',
    cover_image_url: '/assets/journal/journal-card-3.jpg',
    read_time: '3 min read',
    published: true,
  },
  {
    id: '4',
    title: 'Preserving the Luster: Care & Maintenance of Kundan & Polki',
    title_line1: 'Preserving the Luster: Care & Maintenance',
    title_line2: 'of Kundan & Polki',
    slug: 'care-maintenance-kundan-polki',
    category: 'CARE & MAINTENANCE',
    excerpt: 'Simple yet essential tips from our master craftsmen on keeping your precious bangles shining bright across generations.',
    cover_image_url: '/assets/journal/journal-card-4.jpg',
    read_time: '4 min read',
    published: true,
  },
];

export const JournalSection: React.FC<JournalSectionProps> = ({
  posts = [],
  onOpenPost,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Automatically cycle through the 4 background pictures every 3 seconds (3000ms) with zero user controls
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % JOURNAL_SLIDES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const activeSlide = JOURNAL_SLIDES[currentSlideIndex];
  const displayArticles = posts.length >= 4 ? posts.slice(0, 4) : DEFAULT_ARTICLES;

  return (
    <section
      id="journal"
      className="w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #E5CCBB 0%, #EBD9C8 50%, #E8D2BD 100%)',
        padding: '90px 0',
      }}
    >
      <div
        style={{
          width: 'min(100% - 48px, 1440px)',
          margin: '0 auto',
        }}
      >
        {/* ── 1. Main Full Background Banner with 3-Second Dynamic Cross-Fade ── */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            minHeight: '500px',
            borderRadius: '28px 4px 28px 4px',
            border: '1px solid #EDE4DC',
            backgroundColor: '#FAF5F0',
            boxShadow: '0 12px 40px rgba(45, 30, 20, 0.06)',
          }}
        >
          {/* Dynamic Background Slides */}
          {JOURNAL_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <div
                key={slide.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: isActive ? 1 : 0,
                }}
              >
                <img
                  src={slide.image_url}
                  alt={slide.heading_line1}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center right',
                    transform: slide.flipImage
                      ? isActive
                        ? 'scaleX(-1) scale(1.02)'
                        : 'scaleX(-1) scale(1)'
                      : isActive
                      ? 'scale(1.02)'
                      : 'scale(1)',
                    transition: 'transform 6000ms ease-out',
                  }}
                />

                {/* Subtle soft gradient overlay on mobile for guaranteed legibility */}
                <div
                  className="block lg:hidden"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to right, rgba(250, 245, 240, 0.95) 0%, rgba(250, 245, 240, 0.85) 60%, rgba(250, 245, 240, 0.2) 100%)',
                  }}
                />
              </div>
            );
          })}

          {/* Left-Aligned Editorial Content Block (Synchronized with 3s slide) */}
          <div
            className="relative z-10 flex flex-col items-start justify-center min-h-[440px] sm:min-h-[500px]"
            style={{
              maxWidth: '560px',
              paddingTop: 'clamp(36px, 5vw, 64px)',
              paddingBottom: 'clamp(36px, 5vw, 64px)',
              paddingLeft: 'clamp(20px, 4vw, 72px)',
              paddingRight: 'clamp(20px, 4vw, 64px)',
            }}
          >
            {/* Eyebrow */}
            <div style={{ marginBottom: '14px' }}>
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
                {activeSlide.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <div style={{ marginBottom: '16px' }} key={`heading-${currentSlideIndex}`}>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(26px, 5.5vw, 42px)',
                  fontWeight: 600,
                  lineHeight: 1.08,
                  color: '#120A06',
                  marginBottom: '2px',
                  animation: 'journalFadeIn 600ms ease-out forwards',
                }}
              >
                {activeSlide.heading_line1}
              </h2>
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(24px, 5vw, 38px)',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  lineHeight: 1.12,
                  color: '#8A2E20',
                  animation: 'journalFadeIn 650ms ease-out forwards',
                }}
              >
                {activeSlide.heading_line2}
              </h3>
            </div>

            {/* Refined Hairline Divider */}
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, marginBottom: '18px' }} />

            {/* Description */}
            <p
              key={`desc-${currentSlideIndex}`}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '14.5px',
                fontWeight: 400,
                lineHeight: 1.7,
                color: '#5C4A3E',
                marginBottom: '32px',
                maxWidth: '470px',
                animation: 'journalFadeIn 700ms ease-out forwards',
              }}
            >
              {activeSlide.description}
            </p>

            {/* Button */}
            <button
              type="button"
              onClick={() => {
                const target =
                  displayArticles.find((a: any) => a.slug === activeSlide.slug) ||
                  displayArticles[0];
                if (target) onOpenPost(target as any);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 24px',
                height: '42px',
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: '#C0846A',
                fontFamily: 'Jost, sans-serif',
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                border: '1.5px solid #C0846A',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(45, 30, 20, 0.04)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#C0846A';
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
                (e.currentTarget as HTMLElement).style.color = '#C0846A';
              }}
            >
              <span>{activeSlide.button_text}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* ── 2. Four-Card Grid Below Banner (56px Margin Top, 24px Gap) ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
          style={{
            marginTop: '56px',
            gap: '24px',
          }}
        >
          {displayArticles.map((article: any) => (
            <div
              key={article.id}
              onClick={() => onOpenPost(article)}
              className="group cursor-pointer flex flex-col justify-between"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px 4px 24px 4px',
                padding: '24px',
                border: '1px solid #EDE4DC',
                boxShadow: '0 4px 20px rgba(45, 30, 20, 0.04)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#C0846A';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 8px 24px rgba(192, 132, 106, 0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#EDE4DC';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 4px 20px rgba(45, 30, 20, 0.04)';
              }}
            >
              <div>
                {/* 16:9 Image Container */}
                <div
                  className="w-full relative overflow-hidden"
                  style={{
                    aspectRatio: '16 / 9',
                    borderRadius: '10px',
                    backgroundColor: '#FAF5F0',
                    border: '1px solid #EDE4DC',
                    marginBottom: '20px',
                  }}
                >
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Category Tag */}
                <div style={{ marginBottom: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#C0846A',
                    }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Article Headline */}
                <h4
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '19px',
                    fontWeight: 500,
                    lineHeight: 1.25,
                    color: '#1E1610',
                    marginBottom: '16px',
                  }}
                >
                  {article.title}
                </h4>
              </div>

              {/* Read More Link */}
              <div
                className="flex items-center gap-1 text-[#C0846A] group-hover:text-[#A06A50] transition-colors"
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  paddingTop: '16px',
                  borderTop: '1px solid #EDE4DC',
                }}
              >
                <span>READ MORE</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes journalFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
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
