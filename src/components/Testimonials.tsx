import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { TestimonialItem } from '../lib/database.types';
import { BorderGlow } from './BorderGlow';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const activeTestimonials = testimonials.filter((t) => t.published);

  return (
    <section
      id="testimonials"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #EBD8BE 0%, #F0E1C9 50%, #E8D4B7 100%)',
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

        {/* 3 Testimonial Cards with BorderGlow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}
          className="testimonials-grid"
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
                  {/* 5-Star Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '20px' }}>
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="#C0846A" color="#C0846A" />
                    ))}
                  </div>

                  {/* Quote */}
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

                {/* Author Info */}
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
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};
