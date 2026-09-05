import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroContent } from '../lib/database.types';
import { GoldNGlowEmblemMark } from './Icons';

interface HeroProps {
  content?: HeroContent;
  onOpenAboutModal?: () => void;
  onOpenCatalogue?: () => void;
  onNavigate?: (page: string) => void;
}

const VIDEO_URL =
  'https://res.cloudinary.com/akmdvmmw/video/upload/v1788143364/clean_9e0224c9-76a2-4e7b-ade7-c953c90d4b61_wbegok.mp4';

export const Hero: React.FC<HeroProps> = ({ content, onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const hasAutoScrolled = useRef(false);

  const taglineLine1 = content?.heading_line1 || 'Timeless Elegance.';
  const taglineLine2 = content?.heading_line2 || 'Crafted to Perfection.';
  const description =
    content?.description ||
    "For over two decades, Gold N Glow has been Hyderabad's premier destination for the world's most exquisite bangles — where royal heritage meets master craftsmanship.";

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('collections');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    // Start autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsVideoLoaded(true);
        })
        .catch((err) => {
          console.warn('Autoplay deferred by browser:', err);
          setIsVideoLoaded(true);
        });
    }

    const handleTimeUpdate = () => {
      if (video.duration && video.duration > 0) {
        const p = video.currentTime / video.duration;
        setProgress(Math.min(p, 1));

        // Exact second the video ends (within 0.08s of end or when finished)
        if (
          video.currentTime >= video.duration - 0.08 &&
          !hasAutoScrolled.current
        ) {
          hasAutoScrolled.current = true;
          if (window.innerWidth >= 768 && window.scrollY < window.innerHeight * 0.4) {
            scrollToNextSection();
          }
        }
      }
    };

    const handleEnded = () => {
      setProgress(1);
      if (!hasAutoScrolled.current) {
        hasAutoScrolled.current = true;
        if (window.innerWidth >= 768 && window.scrollY < window.innerHeight * 0.4) {
          scrollToNextSection();
        }
      }
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleLoadedData);
    };
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #FCE8E5 0%, #FAE6E3 50%, #F9E4E2 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── 1. Desktop Autoplay Looping Background Video (Desktop Only: >= 768px) ── */}
      <div
        className="hero-desktop-video-container"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted
          playsInline
          preload="none"
          className="hero-media-bg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            pointerEvents: 'none',
            opacity: 1,
          }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* ── 2. Desktop Ambient Left-to-Right Soft Gradient ── */}
      <div
        className="hero-desktop-gradient"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(252, 232, 229, 0.95) 0%, rgba(250, 230, 227, 0.85) 45%, rgba(249, 228, 226, 0.20) 75%, transparent 100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* ── 3. Mobile Dedicated Full-Bleed Background Image (Mobile Only: < 768px) ── */}
      <img
        src="/assets/hero/hero-mobile-bg.webp"
        alt="Gold N Glow Royal Bangle Box"
        className="hero-mobile-image"
        fetchPriority="high"
        loading="eager"
        decoding="sync"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center bottom',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── 4. Left-Side Editorial Composition ── */}
      <div
        className="hero-content-wrapper"
        style={{
          position: 'relative',
          zIndex: 10,
          width: 'min(100% - 32px, 1440px)',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(12px, 3vw, 48px)',
        }}
      >
        <div
          className="hero-text-col"
          style={{
            maxWidth: '560px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* 1. Side-by-Side Brand Emblem & Typography */}
          <div
            className="hero-brand-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px, 2vw, 24px)',
              marginBottom: 'clamp(14px, 3vh, 26px)',
              flexWrap: 'nowrap',
            }}
          >
            {/* Logo Emblem with Ambient Luxury Halo */}
            <div
              className="hero-emblem-halo"
              style={{
                position: 'relative',
                padding: '4px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(216, 127, 107, 0.12) 60%, transparent 100%)',
                boxShadow:
                  '0 8px 24px -4px rgba(212, 122, 106, 0.22), 0 2px 10px rgba(212, 175, 55, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <GoldNGlowEmblemMark size={64} />
            </div>

            {/* Brand Typography with Distinct Fonts & Dual Gold / Rose Pink Tones */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 'clamp(6px, 1.1vw, 12px)',
                  margin: 0,
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                {/* GOLD: Imperial Luxury Serif in Rich Antique Gold */}
                <span
                  style={{
                    fontFamily: "'Cinzel', 'Marcellus', Georgia, serif",
                    fontSize: 'clamp(28px, 3.4vw, 44px)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#9E6B15',
                    display: 'inline-block',
                  }}
                >
                  GOLD
                </span>

                {/* n: Graceful Calligraphy Script in Rich Rose Pink */}
                <span
                  style={{
                    fontFamily: "'Alex Brush', 'Pinyon Script', 'Caveat', cursive",
                    fontSize: 'clamp(36px, 4.4vw, 54px)',
                    fontWeight: 400,
                    color: '#B83A4E',
                    display: 'inline-block',
                    padding: '0 4px',
                    lineHeight: 0.8,
                  }}
                >
                  n
                </span>

                {/* GLOW: Modern Luxury Display Serif in Rich Rose Copper */}
                <span
                  style={{
                    fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', serif",
                    fontSize: 'clamp(28px, 3.4vw, 44px)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#8A2E20',
                    display: 'inline-block',
                  }}
                >
                  GLOW
                </span>
              </h1>

              {/* Sub-descriptor with Crisp Dark Neutral Tone */}
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 'clamp(9px, 0.85vw, 11px)',
                  fontWeight: 700,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#4A3428',
                  marginTop: '6px',
                }}
              >
                HAUTE HYDERABADI BANGLES • EST. 2002
              </span>
            </div>
          </div>

          {/* 2. Refined Short Tagline */}
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(32px, 4.4vw, 56px)',
                fontWeight: 600,
                lineHeight: 1.08,
                color: '#120A06',
                letterSpacing: '-0.01em',
              }}
            >
              {taglineLine1}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(30px, 4.2vw, 52px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.12,
                color: '#8A2E20',
              }}
            >
              {taglineLine2}
            </div>
          </div>

          {/* 3. Refined Architectural Hairline Accent */}
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, marginBottom: '20px' }} />

          {/* 4. Supporting Description */}
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 'clamp(14px, 1.15vw, 16px)',
              fontWeight: 450,
              lineHeight: 1.75,
              color: '#3B2921',
              margin: 0,
              marginBottom: '26px',
              maxWidth: '480px',
            }}
          >
            {description}
          </p>

          {/* 5. CTA Action Buttons */}
          <div className="hero-actions-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Desktop: Interactive Sliding Pill Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('collections');
                } else {
                  scrollToNextSection();
                }
              }}
              className="button-sliding-pill hero-desktop-btn"
              style={{
                height: '46px',
                paddingLeft: '24px',
                paddingRight: '12px',
                backgroundColor: '#9E6B15',
              }}
            >
              <span>EXPLORE COLLECTIONS</span>
              <div className="button__icon-wrapper">
                <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width="10" height="10">
                  <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.28.024z" fill="currentColor"></path>
                </svg>
                <svg viewBox="0 0 14 15" fill="none" width="10" height="10" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
                  <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.28.024z" fill="currentColor"></path>
                </svg>
              </div>
            </button>

            {/* Mobile: Clean Unified Luxury Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('collections');
                } else {
                  scrollToNextSection();
                }
              }}
              className="btn btn-gold hero-mobile-btn"
              style={{
                height: '46px',
                padding: '0 22px',
                borderRadius: '5px',
                fontSize: '11px',
                letterSpacing: '0.14em',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('bridal');
                } else {
                  const target = document.getElementById('bridal');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn btn-outline"
              style={{
                height: '46px',
                padding: '0 24px',
                borderRadius: '5px',
                fontSize: '11px',
                letterSpacing: '0.14em',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>BRIDAL HERITAGE</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 5. Scroll Indicator / Clickable Button to Next Section ── */}
      <div
        onClick={scrollToNextSection}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '9.5px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#8A5D43',
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <div
          style={{
            width: '1px',
            height: '14px',
            backgroundColor: '#C0846A',
            opacity: 0.6,
          }}
          className="animate-pulse"
        />
      </div>

      {/* ── 6. Luxury 5-Second Video Unveiling Progress Bar ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: 'rgba(210, 195, 185, 0.3)',
          zIndex: 15,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(to right, #9E6B15, #B57358)',
            transition: 'width 0.1s linear',
            willChange: 'width',
          }}
        />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-desktop-video-container {
            display: block !important;
          }
          .hero-desktop-gradient {
            display: block !important;
          }
          .hero-mobile-image {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .hero-desktop-video-container {
            display: none !important;
          }
          .hero-desktop-gradient {
            display: none !important;
          }
          .hero-mobile-image {
            display: block !important;
          }
        }
        @media (max-width: 1023px) {
          .hero-section {
            align-items: flex-start !important;
            padding-top: clamp(24px, 3.5vh, 44px) !important;
          }
          .hero-content-wrapper {
            width: 100% !important;
            padding: 0 clamp(16px, 4vw, 24px) !important;
          }
          .hero-text-col {
            max-width: 100% !important;
          }
        }
        @media (max-width: 640px) {
          .hero-brand-header {
            gap: 10px !important;
            margin-bottom: 12px !important;
          }
          .hero-emblem-halo {
            transform: scale(0.78);
            transform-origin: left center;
          }
          .hero-actions-group {
            flex-direction: row !important;
            width: 100% !important;
            gap: 10px !important;
          }
          .hero-actions-group > * {
            flex: 1 !important;
            padding: 0 12px !important;
            height: 42px !important;
            font-size: 10.5px !important;
            justify-content: center !important;
            white-space: nowrap !important;
          }
        }
      `}</style>
    </section>
  );
};
