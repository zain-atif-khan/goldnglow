import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { FounderPick } from '../lib/database.types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FoundersPicksProps {
  picks: FounderPick[];
  onSelectPick?: (pick: FounderPick) => void;
  onNavigate?: (page: string) => void;
  whatsapp?: string;
}

export const FoundersPicks: React.FC<FoundersPicksProps> = ({
  picks,
  onSelectPick,
  onNavigate,
  whatsapp = '919014761009',
}) => {
  const activePicks = picks.filter((p) => p.active);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(max-width: 768px)', () => {
        const getDistance = () => {
          const paddingRight = 24;
          return Math.max(0, grid.scrollWidth - window.innerWidth + paddingRight);
        };

        const scrollDistance = () => Math.max(getDistance() * 2.2, 1200);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            start: 'top top',
            end: () => `+=${scrollDistance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // 1. Scrub cards across horizontally
        tl.to(grid, {
          x: () => -getDistance(),
          ease: 'none',
          duration: 0.8,
        });

        // 2. Hold at final card so it rests fully in view before unpinning
        tl.to({}, { duration: 0.2 });

        return () => {
          if (tl.scrollTrigger) tl.scrollTrigger.kill();
          tl.kill();
        };
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [activePicks.length]);

  return (
    <section
      id="founders-picks"
      ref={sectionRef}
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #F3D4D8 0%, #F1D2D2 50%, #EBC7CA 100%)',
        padding: '90px 0 100px',
      }}
    >
      <div
        className="founders-picks-container"
        style={{
          maxWidth: '1440px',
          width: 'min(100% - 48px, 1440px)',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div
          className="founders-picks-header"
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
          ref={gridRef}
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
                borderRadius: '16px',
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
                  className="founder-pick-img-wrap"
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 3.2',
                    overflow: 'hidden',
                    backgroundColor: '#FAF5F0',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
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
                <div className="founder-pick-body" style={{ padding: '22px 24px 16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  {/* Terracotta Number Badge */}
                  <div
                    className="founder-pick-badge"
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
                      className="founder-pick-title"
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
                      className="founder-pick-desc"
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
              <div className="founder-pick-bottom" style={{ padding: '0 24px 22px' }}>
                <div
                  className="founder-pick-bottom-inner"
                  style={{
                    paddingTop: '14px',
                    borderTop: '1px solid #F0E6DE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNavigate) {
                        onNavigate('collections');
                      } else {
                        window.location.hash = 'collections';
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s ease',
                    }}
                    className="founder-pick-action founder-pick-explore-btn"
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#C0846A')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#1E1610')}
                  >
                    <span className="founder-pick-explore-text-desktop">EXPLORE THIS SET</span>
                    <span className="founder-pick-explore-text-mobile">EXPLORE</span>
                    <ArrowRight size={12} className="founder-pick-explore-icon" style={{ color: '#C0846A' }} />
                  </button>

                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello Gold N Glow! I would like to inquire about "${pick.title}" from your Founder Selection.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="founder-pick-inquire-btn"
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#25D366',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#1EBE5D';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#25D366';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    }}
                  >
                    <MessageCircle size={12} className="founder-pick-inquire-icon" style={{ color: '#25D366' }} />
                    <span className="founder-pick-inquire-text-desktop">INQUIRE →</span>
                    <span className="founder-pick-inquire-text-mobile">INQUIRE</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all curation CTA with Randdose Dual-Bubble Expand Animation */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              if (onNavigate) {
                onNavigate('collections');
              } else {
                const target = document.getElementById('collections');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
                else if (onSelectPick && activePicks.length > 0) onSelectPick(activePicks[0]);
              }
            }}
            className="button-bubble-expand"
            style={{
              height: '46px',
              padding: '0 32px',
            }}
          >
            <span>VIEW FULL CURATION</span>
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
        .founder-pick-explore-text-mobile {
          display: none;
        }
        .founder-pick-inquire-text-mobile {
          display: none;
        }
        .founder-pick-explore-text-desktop {
          display: inline;
        }
        .founder-pick-inquire-text-desktop {
          display: inline;
        }
        @media (max-width: 1024px) {
          .founders-picks-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          #founders-picks {
            height: 100vh !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            max-height: 100dvh !important;
            overflow: hidden !important;
            padding: 72px 0 20px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
          }
          .founders-picks-container {
            width: 100% !important;
            max-width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            flex: 1 !important;
          }
          .founders-picks-header {
            padding-left: 20px !important;
            padding-right: 20px !important;
            margin-bottom: 12px !important;
          }
          .founders-picks-header h2 {
            font-size: 24px !important;
            margin-bottom: 4px !important;
          }
          .founders-picks-header p {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
          .founders-picks-grid {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            width: max-content !important;
            gap: 16px !important;
            padding-left: 20px !important;
            padding-right: 32px !important;
            padding-bottom: 6px !important;
            margin-bottom: 12px !important;
            will-change: transform;
            overflow: visible !important;
          }
          .founders-picks-grid::-webkit-scrollbar {
            display: none !important;
          }
          .founders-picks-grid::after {
            content: '';
            flex: 0 0 8px;
          }
          .founder-pick-card {
            flex: 0 0 80vw !important;
            width: 80vw !important;
            max-width: 315px !important;
            min-width: 260px !important;
            border-radius: 16px !important;
            border: 1px solid #E8DDD4 !important;
            box-shadow: 0 8px 24px -4px rgba(45, 30, 20, 0.08) !important;
            overflow: hidden !important;
          }
          .founder-pick-img-wrap {
            aspect-ratio: 16 / 10 !important;
            border-top-left-radius: 16px !important;
            border-top-right-radius: 16px !important;
          }
          .founder-pick-body {
            padding: 12px 14px 8px !important;
            gap: 10px !important;
          }
          .founder-pick-badge {
            width: 26px !important;
            height: 26px !important;
            font-size: 10.5px !important;
            border-radius: 4px !important;
            flex-shrink: 0 !important;
          }
          .founder-pick-title {
            font-size: 17px !important;
            line-height: 1.25 !important;
            font-weight: 600 !important;
            margin-bottom: 3px !important;
          }
          .type-editorial-tag {
            font-size: 9.5px !important;
            margin-bottom: 2px !important;
          }
          .founder-pick-desc {
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            font-size: 11.5px !important;
            line-height: 1.4 !important;
            color: #5C4A3E !important;
            margin-top: 2px !important;
          }
          .founder-pick-bottom {
            padding: 0 14px 14px !important;
          }
          .founder-pick-bottom-inner {
            padding-top: 10px !important;
            border-top: 1px solid #F0E6DE !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 8px !important;
          }
          .founder-pick-explore-text-desktop {
            display: none !important;
          }
          .founder-pick-inquire-text-desktop {
            display: none !important;
          }
          .founder-pick-explore-text-mobile {
            display: inline !important;
          }
          .founder-pick-inquire-text-mobile {
            display: inline !important;
          }
          .founder-pick-explore-btn {
            flex: 1 !important;
            height: 38px !important;
            padding: 0 8px !important;
            border-radius: 8px !important;
            background: #C0846A !important;
            border: none !important;
            color: #FFFFFF !important;
            font-size: 10.5px !important;
            font-weight: 700 !important;
            letter-spacing: 0.08em !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 5px !important;
            text-transform: uppercase !important;
            box-shadow: 0 3px 10px rgba(192, 132, 106, 0.28) !important;
            box-sizing: border-box !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
          }
          .founder-pick-explore-btn:active {
            transform: scale(0.98) !important;
            background: #A36449 !important;
          }
          .founder-pick-explore-btn .founder-pick-explore-icon {
            color: #FFFFFF !important;
            width: 12px !important;
            height: 12px !important;
          }
          .founder-pick-inquire-btn {
            flex: 1 !important;
            height: 38px !important;
            padding: 0 8px !important;
            border-radius: 8px !important;
            background: #25D366 !important;
            border: none !important;
            color: #FFFFFF !important;
            font-size: 10.5px !important;
            font-weight: 700 !important;
            letter-spacing: 0.08em !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 5px !important;
            text-transform: uppercase !important;
            text-decoration: none !important;
            box-shadow: 0 3px 10px rgba(37, 211, 102, 0.28) !important;
            box-sizing: border-box !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
          }
          .founder-pick-inquire-btn:active {
            transform: scale(0.98) !important;
            background: #1EBE5D !important;
          }
          .founder-pick-inquire-btn .founder-pick-inquire-icon {
            color: #FFFFFF !important;
            width: 13px !important;
            height: 13px !important;
          }
        }
      `}</style>
    </section>
  );
};
