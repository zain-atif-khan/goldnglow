import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation } from 'lucide-react';
import { ExperienceContent, SiteSettings } from '../lib/database.types';

interface ExperiencePageProps {
  content: ExperienceContent;
  settings: SiteSettings;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ settings }) => {
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Gold N Glow! I would like to visit your boutique in Tolichowki, Hyderabad.'
  )}`;

  return (
    <div style={{ width: '100%', background: 'linear-gradient(180deg, #FDF4F0 0%, #FAF3EC 40%, #F6EAE1 100%)', padding: '80px 0 96px' }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto 48px',
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
              display: 'block',
              marginBottom: '8px',
            }}
          >
            TOLICHOWKI HYDERABAD SHOWROOM
          </span>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 600,
              color: '#120A06',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            The In-Store Experience
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, margin: '0 auto 16px' }} />
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#7A6356',
            }}
          >
            Step inside Hyderabad's favorite bangle showroom. Test different sizes, match shades to your lehenga, and discover your signature stack.
          </p>
        </div>

        {/* Big Showroom Showcase */}
        <div
          style={{
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto 56px',
            aspectRatio: '16 / 9',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid #E2D5CA',
            backgroundColor: '#F0E4DC',
            boxShadow: '0 16px 48px rgba(30,22,16,0.08)',
          }}
        >
          <img
            src="/assets/store/store-interior-main.jpg"
            alt="Gold N Glow Store Interior Tolichowki Hyderabad"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* 2-Column Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '56px',
            alignItems: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
          className="experience-page-grid"
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '32px',
                fontWeight: 500,
                color: '#1E1610',
                lineHeight: 1.2,
                marginBottom: '16px',
              }}
            >
              Visit Us in Tolichowki, Hyderabad
            </h2>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '14px',
                color: '#7A6356',
                lineHeight: 1.7,
                marginBottom: '28px',
              }}
            >
              Located conveniently on Tolichowki Main Road, Gold N Glow offers comfortable air-conditioned private consultation seating, expert stylists, and precision sizing tools.
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
                    border: '1px solid #E2D5CA',
                    flexShrink: 0,
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
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356' }}>
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
                    border: '1px solid #E2D5CA',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={16} />
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
                    Store Timings
                  </span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356' }}>
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
                    border: '1px solid #E2D5CA',
                    flexShrink: 0,
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
                    Phone &amp; Support
                  </span>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '13px',
                      color: '#C0846A',
                      fontWeight: 600,
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
                  padding: '0 28px',
                  height: '48px',
                  borderRadius: '999px',
                  backgroundColor: '#C0846A',
                  color: '#FFFFFF',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1.5px solid #C0846A',
                  boxShadow: '0 4px 16px rgba(192,132,106,0.28)',
                }}
              >
                <MessageCircle size={15} />
                <span>BOOK PRIVATE VIEWING</span>
              </a>

              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 24px',
                  height: '48px',
                  borderRadius: '999px',
                  backgroundColor: '#FFFFFF',
                  color: '#1E1610',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #E2D5CA',
                  textDecoration: 'none',
                }}
              >
                <Navigation size={14} />
                <span>GET DIRECTIONS</span>
              </a>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2D5CA',
              padding: '32px',
              boxShadow: '0 8px 24px rgba(30,22,16,0.04)',
            }}
          >
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '22px',
                fontWeight: 600,
                color: '#1E1610',
                marginBottom: '12px',
              }}
            >
              Why Visit in Person?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.6 }}>
              <p>• <strong>Exact Wrist Profiling:</strong> Our sizing experts measure knuckle-to-wrist clearance for maximum slip-on ease and secure fit.</p>
              <p>• <strong>Silk &amp; Lehenga Matching:</strong> Bring your bridal fabrics or swatches to match stone tones and antique polish luster under studio lighting.</p>
              <p>• <strong>500+ Exclusive Pieces:</strong> Browse physical styles unavailable in our digital catalogue.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .experience-page-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
};
