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
  desktop_image: string;
  mobile_image: string;
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
    desktop_image: '/assets/journal/journal-bg-1.jpg',
    mobile_image: '/assets/showcase/bangles-1-polki.webp',
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
    desktop_image: '/assets/journal/journal-bg-2.jpg',
    mobile_image: '/assets/showcase/bangles-3-meenakari.webp',
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
    desktop_image: '/assets/journal/journal-bg-3.jpg',
    mobile_image: '/assets/showcase/bangles-4-pearl.webp',
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
    desktop_image: '/assets/journal/journal-bg-4.jpg',
    mobile_image: '/assets/showcase/bangles-5-antique.webp',
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
    cover_image_url: '/assets/journal/journal-card-1.webp',
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
    cover_image_url: '/assets/journal/journal-card-2.webp',
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
    cover_image_url: '/assets/journal/journal-card-3.webp',
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
    cover_image_url: '/assets/journal/journal-card-4.webp',
    read_time: '4 min read',
    published: true,
  },
];

export const JournalSection: React.FC<JournalSectionProps> = ({
  posts = [],
  onOpenPost,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Automatically cycle through the background pictures every 3 seconds seamlessly
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
        padding: 'clamp(52px, 6vw, 80px) 0 clamp(48px, 5.5vw, 70px)',
      }}
    >
      <div
        className="journal-container"
        style={{
          width: 'min(100% - 48px, 1440px)',
          margin: '0 auto',
        }}
      >
        {/* ── 1. Main Full Background Banner with Dynamic Cross-Fade ── */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            minHeight: '480px',
            borderRadius: '28px 4px 28px 4px',
            border: '1px solid #EDE4DC',
            backgroundColor: '#FAF5F0',
            boxShadow: '0 12px 40px rgba(45, 30, 20, 0.06)',
          }}
        >
          {/* Background Slides with Cross-Fade & Ken Burns motion */}
          {JOURNAL_SLIDES.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={slide.id}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <picture className="w-full h-full block">
                  <source media="(min-width: 1024px)" srcSet={slide.desktop_image} />
                  <img
                    src={slide.mobile_image}
                    alt={slide.heading_line1}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
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
                </picture>

                {/* Subtle Left Vignette on Desktop so text is 100% crisp without covering the photo */}
                <div className="journal-banner-left-glow hidden lg:block" />
              </div>
            );
          })}

          {/* Left-Aligned Editorial Content Block (Synchronized with 3s slide) */}
          <div
            className="journal-banner-content relative z-10 flex flex-col items-start justify-center min-h-[420px] sm:min-h-[480px]"
            style={{
              maxWidth: '560px',
              paddingTop: 'clamp(28px, 4.5vw, 56px)',
              paddingBottom: 'clamp(28px, 4.5vw, 56px)',
              paddingLeft: 'clamp(20px, 4.5vw, 64px)',
              paddingRight: 'clamp(20px, 4vw, 48px)',
            }}
          >
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
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.85), 0 0 16px rgba(255, 255, 255, 0.6)',
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
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.85), 0 0 16px rgba(255, 255, 255, 0.6)',
                  animation: 'journalFadeIn 650ms ease-out forwards',
                }}
              >
                {activeSlide.heading_line2}
              </h3>
            </div>

            {/* Refined Hairline Divider */}
            <div style={{ width: '48px', height: '1.5px', backgroundColor: '#C0846A', marginBottom: '18px', boxShadow: '0 1px 3px rgba(255, 255, 255, 0.8)' }} />

            {/* Description */}
            <p
              key={`desc-${currentSlideIndex}`}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '14.5px',
                fontWeight: 450,
                lineHeight: 1.7,
                color: '#2B1E16',
                marginBottom: '30px',
                maxWidth: '470px',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.85)',
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
                backgroundColor: '#FFFFFF',
                color: '#8A2E20',
                fontFamily: 'Jost, sans-serif',
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                border: '1.5px solid #C0846A',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(45, 30, 20, 0.08)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#C0846A';
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.color = '#8A2E20';
              }}
            >
              <span>{activeSlide.button_text}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* ── 2. Four-Card Grid Below Banner (2 per row on mobile, 4 on desktop) ── */}
        <div className="journal-cards-grid grid grid-cols-2 lg:grid-cols-4 items-stretch">
          {displayArticles.map((article: any) => (
            <div
              key={article.id}
              onClick={() => onOpenPost(article)}
              className="journal-card group cursor-pointer flex flex-col justify-between"
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
                  className="journal-card-img-wrap w-full relative overflow-hidden"
                  style={{
                    aspectRatio: '16 / 9',
                    borderRadius: '10px',
                    backgroundColor: '#FAF5F0',
                    border: '1px solid #EDE4DC',
                    marginBottom: '16px',
                  }}
                >
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Category Tag */}
                <div className="journal-article-tag" style={{ marginBottom: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#C0846A',
                      display: 'inline-block',
                    }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Article Headline */}
                <h4
                  className="journal-article-title"
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(15px, 1.35vw, 18.5px)',
                    fontWeight: 600,
                    lineHeight: 1.28,
                    color: '#1E1610',
                    marginBottom: '14px',
                  }}
                >
                  {article.title}
                </h4>
              </div>

              {/* Read More Link */}
              <div
                className="journal-article-more flex items-center gap-1.5 text-[#C0846A] group-hover:text-[#A06A50] transition-colors"
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  paddingTop: '14px',
                  marginTop: 'auto',
                  borderTop: '1px solid #EADBCE',
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

        .journal-cards-grid {
          margin-top: 52px;
          gap: 24px;
        }

        .journal-card {
          padding: 24px 22px 20px;
          background-color: #FFFFFF;
          border-radius: 20px 4px 20px 4px;
          border: 1px solid #EDE4DC;
          box-shadow: 0 4px 20px rgba(45, 30, 20, 0.04);
          transition: all 0.25s ease;
        }

        .journal-banner-left-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(250, 245, 240, 0.88) 0%, rgba(250, 245, 240, 0.6) 42%, rgba(250, 245, 240, 0) 70%);
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .journal-cards-grid {
            margin-top: 36px;
            gap: 16px;
          }
          .journal-card {
            padding: 16px 14px 14px;
          }
        }

        @media (max-width: 768px) {
          .journal-banner-content {
            background: rgba(255, 255, 255, 0.18) !important;
            background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 100%) !important;
            backdrop-filter: blur(14px) saturate(160%) !important;
            -webkit-backdrop-filter: blur(14px) saturate(160%) !important;
            border-radius: 18px !important;
            border: 1px solid rgba(255, 255, 255, 0.45) !important;
            padding: 24px 18px !important;
            margin: 14px 10px !important;
            box-shadow: 0 8px 32px 0 rgba(45, 30, 20, 0.18), inset 0 1px 0 0 rgba(255, 255, 255, 0.55) !important;
            min-height: auto !important;
            width: calc(100% - 20px) !important;
          }
          .journal-banner-content h2,
          .journal-banner-content h3 {
            text-shadow: 0 1px 8px rgba(30, 18, 10, 0.22), 0 0px 1px rgba(255, 255, 255, 0.6) !important;
            color: #1a0e08 !important;
          }
          .journal-banner-content p {
            text-shadow: 0 1px 4px rgba(30, 18, 10, 0.18) !important;
          }
          #journal {
            padding-bottom: 64px !important;
          }
          .journal-container {
            width: calc(100% - 16px) !important;
          }
          .journal-cards-grid {
            margin-top: 24px !important;
            gap: 8px !important;
          }
          .journal-card {
            padding: 14px 12px 14px !important;
            border-radius: 16px 4px 16px 4px !important;
          }
          .journal-card-img-wrap {
            aspect-ratio: 4 / 3 !important;
            margin-bottom: 12px !important;
            border-radius: 10px !important;
          }
          .journal-article-tag {
            margin-bottom: 6px !important;
          }
          .journal-article-tag span {
            font-size: 10px !important;
            letter-spacing: 0.14em !important;
          }
          .journal-article-title {
            font-size: 14.5px !important;
            line-height: 1.25 !important;
            font-weight: 600 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            margin-bottom: 10px !important;
          }
          .journal-article-more {
            margin-top: auto !important;
            padding-top: 12px !important;
            padding-bottom: 2px !important;
            font-size: 10px !important;
            letter-spacing: 0.12em !important;
          }
        }
      `}</style>
    </section>
  );
};
