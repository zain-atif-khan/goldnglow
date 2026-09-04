import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FounderPick } from '../lib/database.types';

interface FoundersPicksProps {
  picks: FounderPick[];
  onSelectPick?: (pick: FounderPick) => void;
}

export const FoundersPicks: React.FC<FoundersPicksProps> = ({
  picks,
  onSelectPick,
}) => {
  const activePicks = picks.filter((p) => p.active);

  return (
    <section
      id="founders-picks"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #F3D4D8 0%, #F1D2D2 50%, #EBC7CA 100%)',
        padding: '90px 0 100px',
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
            margin: '0 auto 56px',
          }}
        >
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(32px, 4.2vw, 48px)',
              fontWeight: 600,
              color: '#120A06',
              lineHeight: 1.15,
              marginBottom: '14px',
            }}
          >
            Chosen by Experience.
          </h2>

          <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, margin: '0 auto 16px' }} />

          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '14.5px',
              lineHeight: 1.7,
              color: '#5C4A3E',
              fontStyle: 'italic',
            }}
          >
            “Every bangle in our collection is handpicked with care. Only the best makes it to Gold N Glow.”
          </p>
        </div>

        {/* 3 Master Curated Cards with Terracotta Numbered Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
            marginBottom: '48px',
          }}
          className="founders-picks-grid"
        >
          {activePicks.slice(0, 3).map((pick, idx) => (
            <div
              key={pick.id}
              onClick={() => onSelectPick && onSelectPick(pick)}
              className="founder-pick-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '32px 4px 32px 4px',
                border: '1px solid #EDE4DC',
                overflow: 'hidden',
                boxShadow: '0 6px 24px rgba(45, 30, 20, 0.05)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                {/* Image */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 3.2',
                    overflow: 'hidden',
                    backgroundColor: '#FAF5F0',
                    borderTopLeftRadius: '32px',
                    borderTopRightRadius: '4px',
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                    position: 'relative',
                  }}
                >
                  <img
                    src={pick.image_url}
                    alt={pick.title}
                    className="founder-pick-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Body Content with Terracotta Number Box */}
                <div style={{ padding: '22px 24px 16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  {/* Terracotta Number Badge */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      backgroundColor: '#C0846A',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    0{idx + 1}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      className="type-editorial-tag type-editorial-tag-rose"
                      style={{ marginBottom: '4px' }}
                    >
                      FOUNDER SELECTION
                    </span>

                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#1E1610',
                        lineHeight: 1.2,
                        marginBottom: '6px',
                      }}
                    >
                      {pick.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '12.5px',
                        color: '#5C4A3E',
                        lineHeight: 1.55,
                      }}
                    >
                      {pick.description || pick.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div style={{ padding: '0 24px 22px' }}>
                <div
                  style={{
                    paddingTop: '14px',
                    borderTop: '1px solid #F0E6DE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    className="founder-pick-action"
                  >
                    <span>EXPLORE THIS SET</span>
                    <ArrowRight size={12} style={{ color: '#C0846A' }} />
                  </span>

                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#C0846A',
                    }}
                  >
                    INQUIRE →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all curation CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              const target = document.getElementById('collections');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              } else if (onSelectPick && activePicks.length > 0) {
                onSelectPick(activePicks[0]);
              }
            }}
            className="btn btn-outline"
            style={{
              height: '44px',
              padding: '0 28px',
              borderRadius: '5px',
              fontSize: '11px',
              letterSpacing: '0.14em',
              gap: '8px',
            }}
          >
            <span>VIEW FULL CURATION</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Scoped hover CSS */}
      <style>{`
        .founder-pick-card:hover {
          border-color: #C0846A !important;
          box-shadow: 0 16px 36px rgba(192, 132, 106, 0.15) !important;
          transform: translateY(-3px);
        }
        .founder-pick-card:hover .founder-pick-img {
          transform: scale(1.04);
        }
        .founder-pick-card:hover .founder-pick-action {
          color: #C0846A !important;
        }
        @media (max-width: 1024px) {
          .founders-picks-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};
