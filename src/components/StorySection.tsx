import React from 'react';
import { ArrowRight, ShieldCheck, Gem, Award, Users } from 'lucide-react';
import { FounderContent } from '../lib/database.types';

interface StorySectionProps {
  content: FounderContent;
  onOpenAboutModal?: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ content, onOpenAboutModal }) => {
  const trustPillars = [
    {
      icon: <ShieldCheck size={24} strokeWidth={1.4} />,
      title: '22+ YEARS',
      desc: 'Of Trust & Excellence',
    },
    {
      icon: <Gem size={24} strokeWidth={1.4} />,
      title: 'PERSONALLY CURATED',
      desc: 'By Our Founder',
    },
    {
      icon: <Award size={24} strokeWidth={1.4} />,
      title: 'PREMIUM QUALITY',
      desc: 'Assured & Certified',
    },
    {
      icon: <Users size={24} strokeWidth={1.4} />,
      title: 'THOUSANDS OF FAMILIES',
      desc: 'Who Trust Us Every Day',
    },
  ];

  return (
    <section
      id="story"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #DEC0C8 0%, #DFC1C1 50%, #D8B8B8 100%)',
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
        {/* 3-Column Grid Matching Reference Screenshot */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1.35fr 0.95fr',
            gap: '40px',
            alignItems: 'center',
          }}
          className="story-3col-grid"
        >
          {/* ── Column 1: Story Text & Signature ────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
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
                OUR JOURNEY SINCE 2002
              </span>
            </div>

            {/* Heading with italic accent */}
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(30px, 3.4vw, 44px)',
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                color: '#120A06',
                marginBottom: '18px',
              }}
            >
              A Legacy Built on{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  fontWeight: 500,
                  color: '#8A2E20',
                }}
              >
                Trust,
              </span>
              <br />
              Passion &amp; Perfection.
            </h2>

            {/* Paragraph */}
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '14.5px',
                fontWeight: 400,
                lineHeight: 1.7,
                color: '#5C4A3E',
                marginBottom: '24px',
              }}
            >
              {content.story_p1 ||
                "What started in 2002 as a small dream has today become Hyderabad's most trusted name in bangles. Our promise remains the same — exceptional quality, honest value, and a shopping experience you'll always cherish."}
            </p>

            {/* Founder Signature & Title */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontFamily: '"Caveat", "Brush Script MT", "Great Vibes", cursive',
                  fontSize: '32px',
                  fontWeight: 600,
                  color: '#C0846A',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                  marginBottom: '4px',
                }}
              >
                Syed Owais Ahmed
              </div>
              <div
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#1E1610',
                }}
              >
                FOUNDER, GOLD N GLOW
              </div>
            </div>

            {/* Meet Founder Button */}
            <div>
              <button
                onClick={onOpenAboutModal}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 24px',
                  height: '42px',
                  borderRadius: '4px',
                  backgroundColor: '#FFFFFF',
                  color: '#C0846A',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #C0846A',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  whiteSpace: 'nowrap',
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
                <span>MEET OUR FOUNDER</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* ── Column 2: Founder Photo in Showroom ─────────── */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(45, 30, 20, 0.08)',
              border: '1px solid #EDE4DC',
              aspectRatio: '4 / 3.4',
              backgroundColor: '#FAF5F0',
            }}
          >
            <img
              src={content.founder_image_url || '/assets/founder/syed-owais-ahmed.png'}
              alt="Syed Owais Ahmed curating bangles in Gold N Glow Tolichowki showroom"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
              loading="lazy"
            />
          </div>

          {/* ── Column 3: 4 Trust Pillars with Icons ────────── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              paddingLeft: '12px',
            }}
          >
            {trustPillars.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    color: '#C0846A',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '12.5px',
                      color: '#5C4A3E',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 1024px) {
          .story-3col-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
