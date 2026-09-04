import React from 'react';
import { MapPin, Clock, Phone, ArrowRight, MessageCircle } from 'lucide-react';
import { ExperienceContent, SiteSettings } from '../lib/database.types';

interface ExperienceSectionProps {
  content?: ExperienceContent;
  settings: SiteSettings;
  onOpenStoreModal?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  settings,
  onOpenStoreModal,
}) => {
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Gold N Glow! I would like to schedule a visit to your Tolichowki showroom.'
  )}`;

  return (
    <section
      id="experience"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #D8B8B8 0%, #E8D2C4 50%, #E5CCBB 100%)',
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
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto 48px',
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
              HYDERABAD SHOWROOM
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
            The In-Store Experience
          </h2>

          <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, margin: '0 auto 16px' }} />

          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '14.5px',
              lineHeight: 1.7,
              color: '#5C4A3E',
            }}
          >
            Step inside our Tolichowki showroom. Test sizes, compare stone lusters, and find the perfect bangle stack for your special day.
          </p>
        </div>

        {/* 2-Column Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '56px',
            alignItems: 'center',
          }}
          className="experience-grid"
        >
          {/* Left: Store Details & CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 500,
                color: '#1E1610',
                lineHeight: 1.2,
                marginBottom: '14px',
              }}
            >
              Visit Us in Tolichowki, Hyderabad
            </h3>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '14px',
                color: '#5C4A3E',
                lineHeight: 1.7,
                marginBottom: '28px',
              }}
            >
              Located on Tolichowki Main Road, our showroom features dedicated bridal styling lounges, personalized stack styling, and precision wrist measurements.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    color: '#C0846A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid #EDE4DC',
                    boxShadow: '0 2px 8px rgba(30, 22, 16, 0.04)',
                  }}
                >
                  <MapPin size={16} />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      display: 'block',
                      marginBottom: '2px',
                    }}
                  >
                    Address
                  </span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5C4A3E' }}>
                    {settings.address_line1}, {settings.address_line2}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    color: '#C0846A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid #EDE4DC',
                    boxShadow: '0 2px 8px rgba(30, 22, 16, 0.04)',
                  }}
                >
                  <Clock size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      display: 'block',
                      marginBottom: '2px',
                    }}
                  >
                    Timings
                  </span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5C4A3E' }}>
                    {settings.store_timings} ({settings.store_days})
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    color: '#C0846A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid #EDE4DC',
                    boxShadow: '0 2px 8px rgba(30, 22, 16, 0.04)',
                  }}
                >
                  <Phone size={16} />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      display: 'block',
                      marginBottom: '2px',
                    }}
                  >
                    Phone Support
                  </span>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#C0846A',
                      textDecoration: 'none',
                    }}
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 24px',
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
                  boxShadow: '0 2px 8px rgba(192,132,106,0.2)',
                  transition: 'all 0.22s ease',
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
                <MessageCircle size={14} />
                <span>BOOK SHOWROOM VISIT</span>
              </a>

              {onOpenStoreModal && (
                <button
                  onClick={onOpenStoreModal}
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
                    border: '1px solid #C0846A',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
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
                  <MapPin size={14} />
                  <span>VIEW STORE DETAILS</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Showroom & Karigari Video Showcase */}
          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid #EDE4DC',
                aspectRatio: '16 / 10',
                backgroundColor: '#1E1610',
                boxShadow: '0 12px 36px rgba(45,30,20,0.08)',
              }}
            >
              <img
                src="/assets/store/store-interior-main.jpg"
                alt="Gold N Glow Hyderabad Showroom Craftsmanship Video"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
              {/* Dark luxury overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18,14,10,0.85) 0%, rgba(18,14,10,0.2) 60%, transparent 100%)',
                }}
              />
              {/* Floating Craftsmanship Video Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '999px',
                  padding: '5px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(192,132,106,0.3)',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C0846A' }} />
                <span
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#C0846A',
                  }}
                >
                  LIVE BOUTIQUE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .experience-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
