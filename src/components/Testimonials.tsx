import React, { useState } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialItem } from '../lib/database.types';
import { BorderGlow } from './BorderGlow';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const activeTestimonials = testimonials.filter((t) => t.published);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handlePrev = () => {
    if (activeTestimonials.length <= 1) return;
    setMobileIndex((prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length);
  };

  const handleNext = () => {
    if (activeTestimonials.length <= 1) return;
    setMobileIndex((prev) => (prev + 1) % activeTestimonials.length);
  };

  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const currentMobileItem = activeTestimonials[mobileIndex] || activeTestimonials[0];

  return (
    <section
      id="testimonials"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #EBD8BE 0%, #F0E1C9 50%, #E8D4B7 100%)',
        padding: 'clamp(56px, 7vw, 90px) 0',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          width: 'min(100% - 32px, 1440px)',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto clamp(32px, 4.5vw, 48px)',
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
              CLIENT EXPERIENCES
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
            Loved Across Generations
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
            Real stories from local and NRI families who trust Gold N Glow for their grandest celebrations.
          </p>
        </div>

        {/* ── DESKTOP ONLY: 3-Column Grid with BorderGlow ── */}
        <div
          className="testimonials-desktop-grid"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}
        >
          {activeTestimonials.slice(0, 3).map((item) => (
            <BorderGlow
              key={item.id}
              borderRadius={16}
              glowColor="192 132 106"
              backgroundColor="#FFFFFF"
              edgeSensitivity={35}
              glowIntensity={1.2}
              coneSpread={30}
              style={{ border: '1px solid #EDE4DC', boxShadow: '0 6px 24px rgba(45,30,20,0.05)' }}
            >
              <div
                style={{
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '20px' }}>
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="#C0846A" color="#C0846A" />
                    ))}
                  </div>

                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '18px',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      color: '#1E1610',
                      marginBottom: '24px',
                    }}
                  >
                    “{item.testimonial}”
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid #EDE4DC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#1E1610',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {item.customer_name}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '11.5px',
                        color: '#C0846A',
                        fontWeight: 500,
                      }}
                    >
                      Verified Customer
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11.5px',
                      color: '#5C4A3E',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <MapPin size={12} style={{ color: '#C0846A' }} />
                    {item.customer_location}
                  </span>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>

        {/* ── MOBILE ONLY: 1 Card at a Time with Broader Layout & Arrow Navigation ── */}
        <div className="testimonials-mobile-slider w-full">
          {currentMobileItem && (
            <div
              key={currentMobileItem.id}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px 4px 20px 4px',
                border: '1px solid #EDE4DC',
                boxShadow: '0 12px 36px -8px rgba(45, 30, 20, 0.12)',
                padding: '28px 22px',
                boxSizing: 'border-box',
                animation: 'testimonialCardFade 0.3s ease-out forwards',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {[...Array(currentMobileItem.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="#C0846A" color="#C0846A" />
                  ))}
                </div>

                <span
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#C0846A',
                    backgroundColor: '#FAF5F0',
                    border: '1px solid rgba(192, 132, 106, 0.25)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  VERIFIED REVIEW
                </span>
              </div>

              <p
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(17px, 4.4vw, 19px)',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  color: '#1E1610',
                  marginBottom: '22px',
                }}
              >
                “{currentMobileItem.testimonial}”
              </p>

              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid #EDE4DC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <h4
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#1E1610',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '2px',
                    }}
                  >
                    {currentMobileItem.customer_name}
                  </h4>
                  <span
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      color: '#C0846A',
                      fontWeight: 500,
                    }}
                  >
                    Verified Customer
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11.5px',
                    color: '#5C4A3E',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={13} style={{ color: '#C0846A' }} />
                  {currentMobileItem.customer_location}
                </span>
              </div>
            </div>
          )}

          {activeTestimonials.length > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '18px',
                marginTop: '20px',
              }}
            >
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EDE4DC',
                  color: '#1E1610',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(45, 30, 20, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {activeTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMobileIndex(idx)}
                    style={{
                      height: '5px',
                      width: idx === mobileIndex ? '26px' : '8px',
                      borderRadius: '3px',
                      backgroundColor: idx === mobileIndex ? '#C0846A' : '#EDE4DC',
                      border: 'none',
                      padding: 0,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EDE4DC',
                  color: '#1E1610',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(45, 30, 20, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .testimonials-desktop-grid {
          display: grid;
        }
        .testimonials-mobile-slider {
          display: none;
        }
        @media (max-width: 1023px) {
          .testimonials-desktop-grid {
            display: none !important;
          }
          .testimonials-mobile-slider {
            display: block !important;
          }
        }
        @keyframes testimonialCardFade {
          from {
            opacity: 0.75;
            transform: translateY(4px);
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
