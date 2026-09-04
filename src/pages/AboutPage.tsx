import React from 'react';
import { Award, Gem, Users, Heart, MessageCircle } from 'lucide-react';
import { FounderContent, SiteSettings } from '../lib/database.types';
import { CountUp } from '../components/CountUp';

interface AboutPageProps {
  founder: FounderContent;
  settings: SiteSettings;
}

export const AboutPage: React.FC<AboutPageProps> = ({ founder, settings }) => {
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Gold N Glow! I would like to connect with your team.'
  )}`;

  return (
    <div style={{ width: '100%', background: 'linear-gradient(180deg, #FDF4F0 0%, #FAF3EC 40%, #F5EAE4 100%)' }}>
      {/* 1. About Hero */}
      <section
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          borderBottom: '1px solid #E2D5CA',
          padding: '80px 0 96px',
        }}
      >
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              maxWidth: '680px',
              margin: '0 auto 56px',
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
              A LEGACY OF EXCELLENCE SINCE 2002
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
              About Gold N Glow
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
              Hyderabad's trusted destination for handcrafted bridal, festive, and designer bangles.
            </p>
          </div>

          {/* 2. Founder Story */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '5fr 7fr',
              gap: '64px',
              alignItems: 'center',
            }}
            className="about-grid"
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '420px',
                  aspectRatio: '4 / 4.8',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #E2D5CA',
                  backgroundColor: '#F0E4DC',
                  boxShadow: '0 12px 36px rgba(30,22,16,0.08)',
                }}
              >
                <img
                  src={founder.founder_image_url || '/assets/founder/syed-owais-ahmed.png'}
                  alt="Syed Owais Ahmed - Founder Gold N Glow"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C0846A',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                FOUNDER &amp; MASTER CURATOR
              </span>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 500,
                  color: '#1E1610',
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}
              >
                {founder.founder_name || 'Syed Owais Ahmed'}
              </h2>

              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '19px',
                  fontStyle: 'italic',
                  color: '#C0846A',
                  lineHeight: 1.5,
                  marginBottom: '20px',
                }}
              >
                {founder.founder_quote ||
                  '“Every bangle in our collection is handpicked with care. Only the best makes it to Gold N Glow.”'}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '14px',
                  color: '#7A6356',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                }}
              >
                <p>
                  In 2002, Syed Owais Ahmed established Gold N Glow in Tolichowki, Hyderabad with a singular conviction: bangles are not merely accessories, but an enduring symbol of celebration, family love, and festive joy.
                </p>
                <p>
                  Over the past 22+ years, Gold N Glow has grown into a landmark boutique revered across Telangana and the NRI diaspora for its unmatched dedication to variety, fair pricing, and personally curated bangle stacks.
                </p>
                <p>
                  Every single set is inspected for setting integrity, smooth hinge operation, and comfortable inner wrist contours before reaching the boutique showcase.
                </p>
              </div>

              <div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0 28px',
                    height: '50px',
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
                  <span>CONNECT WITH OUR FOUNDER</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 Core Values */}
      <section style={{ width: '100%', backgroundColor: '#FFFFFF', padding: '80px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
            }}
            className="about-values-grid"
          >
            {[
              {
                icon: <Award size={22} strokeWidth={1.5} />,
                titleNode: (
                  <>
                    <CountUp end={22} suffix="+" duration={2} /> YEARS IN TOLICHOWKI
                  </>
                ),
                desc: 'A proud Hyderabad heritage destination trusted across generations.',
              },
              {
                icon: <Gem size={22} strokeWidth={1.5} />,
                titleNode: (
                  <>
                    <CountUp end={500} suffix="+" duration={2} /> CURATED DESIGNS
                  </>
                ),
                desc: 'Exclusive handcrafted bangles, bridal kadas, and daily wear stacks.',
              },
              {
                icon: <Users size={22} strokeWidth={1.5} />,
                titleNode: (
                  <>
                    <CountUp end={10000} suffix="+" separator="," duration={2.2} /> HAPPY FAMILIES
                  </>
                ),
                desc: 'Loved by local brides and international clients worldwide.',
              },
              {
                icon: <Heart size={22} strokeWidth={1.5} />,
                titleNode: <>PASSION FOR PURITY</>,
                desc: 'Ethical craftsmanship, long-lasting polish, and fair boutique pricing.',
              },
            ].map((val, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#F7EEE8',
                  borderRadius: '16px',
                  border: '1px solid #E2D5CA',
                  padding: '32px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    color: '#C0846A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #E2D5CA',
                  }}
                >
                  {val.icon}
                </div>
                <h4
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#1E1610',
                  }}
                >
                  {val.titleNode}
                </h4>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.5 }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .about-values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
