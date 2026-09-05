import React from 'react';
import { Award, ShieldCheck, Gem, Users, Lock, CheckCircle2 } from 'lucide-react';
import { WhyUsItem } from '../lib/database.types';
import { CountUp } from './CountUp';

interface WhyGoldNGlowProps {
  items: WhyUsItem[];
}

export const WhyGoldNGlow: React.FC<WhyGoldNGlowProps> = ({ items }) => {
  const promiseItems = items.filter((i) => i.category === 'promise' && i.active);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Award':
      case 'Crown':
        return <Award size={16} strokeWidth={1.5} />;
      case 'Gem':
        return <Gem size={16} strokeWidth={1.5} />;
      case 'Sparkles':
        return <Gem size={16} strokeWidth={1.5} />;
      case 'ShieldCheck':
        return <ShieldCheck size={16} strokeWidth={1.5} />;
      case 'Users':
        return <Users size={16} strokeWidth={1.5} />;
      case 'Lock':
        return <Lock size={16} strokeWidth={1.5} />;
      default:
        return <Gem size={16} strokeWidth={1.5} />;
    }
  };

  const corePillars = [
    {
      icon: <Gem size={18} strokeWidth={1.5} />,
      titleNode: (
        <>
          <CountUp end={500} suffix="+" duration={2} /> UNIQUE DESIGNS
        </>
      ),
      desc: 'Master handcrafted Lac bangles, royal artisan glass stacks, and bridal heirloom sets under one roof.',
    },
    {
      icon: <Award size={18} strokeWidth={1.5} />,
      titleNode: (
        <>
          <CountUp end={22} suffix="+" duration={2} /> YEARS IN TOLICHOWKI
        </>
      ),
      desc: (
        <>
          Founded in 2002 by <strong>Syed Owais Ahmed</strong> with an unwavering commitment to craftsmanship and trust.
        </>
      ),
    },
    {
      icon: <Users size={18} strokeWidth={1.5} />,
      titleNode: (
        <>
          <CountUp end={10000} suffix="+" duration={2} /> HAPPY BRIDES
        </>
      ),
      desc: 'Generations of families across Hyderabad, Telangana, and the globe trust us for their most sacred celebrations.',
    },
    {
      icon: <ShieldCheck size={18} strokeWidth={1.5} />,
      titleNode: (
        <>
          <CountUp end={100} suffix="%" duration={2} /> ARTISAN CRAFTED
        </>
      ),
      desc: 'Direct sourcing and master finishing with zero middlemen markups for fair boutique pricing.',
    },
  ];

  return (
    <section
      id="why-us"
      className="w-full relative"
      style={{
        background: 'linear-gradient(180deg, #EBC7CA 0%, #E5C3C9 50%, #DEC0C8 100%)',
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
        {/* Top Split Layout: Left Editorial Copy, Center Showcase Photo, Right Promise Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1.05fr 1.15fr',
            gap: '32px',
            alignItems: 'center',
            marginBottom: '56px',
          }}
          className="why-top-grid"
        >
          {/* Left: Editorial Copy */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
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
                THE GOLD N GLOW STANDARD
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 600,
                color: '#120A06',
                lineHeight: 1.15,
                marginBottom: '14px',
              }}
            >
              Curated with Care.
              <br />
              <span style={{ fontStyle: 'italic', color: '#8A2E20', fontWeight: 500 }}>
                Loved for Generations.
              </span>
            </h2>

            <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, marginBottom: '20px' }} />

            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '14.5px',
                lineHeight: 1.7,
                color: '#5C4A3E',
                marginBottom: '24px',
              }}
            >
              For over two decades in Tolichowki, we've stayed true to one guiding principle — exceptional craftsmanship, fair boutique pricing, and an intimate shopping experience you'll cherish.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Handpicked stone settings with long-lasting polish luster',
                'Custom bridal wrist profiling for openable and slip-on kadas',
                'Personal curation with founder Syed Owais Ahmed',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={16} style={{ color: '#C0846A', flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '13px',
                      color: '#1E1610',
                      fontWeight: 500,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Showcase Image */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '340px',
                aspectRatio: '4 / 4.6',
                borderRadius: '32px 4px 32px 4px',
                overflow: 'hidden',
                isolation: 'isolate',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                maskImage: 'radial-gradient(white, black)',
                border: '1px solid #EDE4DC',
                backgroundColor: '#FAF5F0',
                boxShadow: '0 8px 28px rgba(30,22,16,0.06)',
              }}
            >
              <img
                src="/assets/why-us/why-bangle-banner.jpg"
                alt="Crafted with Trust - Gold N Glow Bangles"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: The Promise Box */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EDE4DC',
              borderRadius: '32px 4px 32px 4px',
              padding: '28px',
              boxShadow: '0 4px 16px rgba(30,22,16,0.04)',
            }}
          >
            <div
              style={{
                paddingBottom: '16px',
                borderBottom: '1px solid #EDE4DC',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C0846A',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                OUR COMMITMENT
              </span>
              <h3
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#1E1610',
                }}
              >
                THE GOLD N GLOW PROMISE
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {promiseItems.map((promise) => (
                <div key={promise.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#F7EEE8',
                      color: '#C0846A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid #EDE4DC',
                    }}
                  >
                    {getIcon(promise.icon_name)}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#1E1610',
                      }}
                    >
                      {promise.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '12px',
                        color: '#5C4A3E',
                        lineHeight: 1.4,
                        marginTop: '2px',
                      }}
                    >
                      {promise.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom 4 Core Pillars */}
        <div
          style={{
            paddingTop: '36px',
            borderTop: '1px solid #EDE4DC',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
            }}
            className="pillars-grid"
          >
            {corePillars.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EDE4DC',
                  borderRadius: '24px 4px 24px 4px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#C0846A';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(30,22,16,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#EDE4DC';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#F7EEE8',
                    color: '#C0846A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #EDE4DC',
                  }}
                >
                  {pillar.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      marginBottom: '4px',
                    }}
                  >
                    {pillar.titleNode}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '12.5px',
                      color: '#5C4A3E',
                      lineHeight: 1.5,
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .why-top-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .pillars-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 10px !important;
          }
          .pillars-grid > div {
            padding: 12px 10px !important;
            border-radius: 16px 2px 16px 2px !important;
          }
          .pillars-grid h4 {
            font-size: 10px !important;
            letter-spacing: 0.08em !important;
            line-height: 1.3 !important;
          }
          .pillars-grid p {
            font-size: 11px !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>
    </section>
  );
};
