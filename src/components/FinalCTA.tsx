import React from 'react';
import { ArrowRight, MessageCircle, MapPin, Store } from 'lucide-react';
import { SiteSettings } from '../lib/database.types';

interface FinalCTAProps {
  settings: SiteSettings;
  onOpenCatalogue: () => void;
  onOpenStoreModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  settings,
  onOpenCatalogue,
  onOpenStoreModal,
}) => {
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Gold N Glow! I would like to explore your bangle collections.'
  )}`;

  const mapsLink = `https://maps.google.com/?q=${encodeURIComponent('Gold N Glow Tolichowki Hyderabad')}`;

  return (
    <section
      id="cta"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #E8D4B7 0%, #E6CFAC 50%, #DCC19A 100%)',
        padding: 'clamp(50px, 6vw, 70px) 0',
      }}
    >
      {/* Floating Panoramic Banner matching Signature Showcase card borders & rounded corners */}
      <div
        className="final-cta-floating-banner"
        style={{
          maxWidth: '1440px',
          width: 'min(100% - 48px, 1440px)',
          margin: '0 auto',
          position: 'relative',
          minHeight: '520px',
          borderRadius: '28px 4px 28px 4px',
          overflow: 'hidden',
          border: '1px solid #EDE4DC',
          boxShadow: '0 12px 36px -8px rgba(30, 22, 16, 0.08)',
          backgroundColor: '#FAF5F0',
          display: 'flex',
          alignItems: 'center',
          padding: '60px clamp(24px, 5vw, 64px)',
          boxSizing: 'border-box',
        }}
      >
        {/* Background Responsive Photo (Desktop Only: /assets/hero/hero-exact-bg.webp) */}
        <picture className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">
          <source media="(min-width: 1024px)" srcSet="/assets/hero/hero-exact-bg.webp" />
          <img
            src="/assets/hero/hero-exact-bg.webp"
            alt="Gold N Glow Bangles"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center right' }}
          />
        </picture>

        {/* Soft Desktop Gradient Overlay for Optimal Text Legibility */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(250, 245, 240, 0.96) 0%, rgba(250, 245, 240, 0.88) 45%, rgba(250, 245, 240, 0.35) 75%, rgba(250, 245, 240, 0.05) 100%)',
          }}
        />

        {/* Banner Left Content Column */}
        <div
          className="final-cta-content-box relative z-10 flex flex-col items-start justify-center"
          style={{
            maxWidth: '560px',
          }}
        >
          {/* Headline */}
          <div style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(32px, 6.5vw, 50px)',
                fontWeight: 600,
                lineHeight: 1.06,
                color: '#120A06',
                marginBottom: '2px',
              }}
            >
              Your Perfect Pair
            </h2>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(28px, 5.5vw, 44px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.1,
                color: '#8A2E20',
              }}
            >
              Awaits You.
            </h3>
          </div>

          {/* Refined Hairline Divider */}
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, marginBottom: '20px' }} />

          {/* Description */}
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '14.5px',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#5C4A3E',
              marginBottom: '28px',
              maxWidth: '470px',
            }}
          >
            Discover timeless beauty in every bangle. Visit our Hyderabad store or connect with our bridal stylists online.
          </p>

          {/* 3 Quick Info Items */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-7 flex-wrap"
            style={{ marginBottom: '32px' }}
          >
            {/* Info 1: Store */}
            <button
              type="button"
              onClick={onOpenStoreModal}
              className="flex items-center gap-2.5 text-left group bg-transparent border-0 p-0 cursor-pointer"
            >
              <div className="text-[#C0846A] flex-shrink-0">
                <Store size={18} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h5 className="font-['Jost'] text-[10.5px] font-bold tracking-wider uppercase text-[#1E1610] whitespace-nowrap">
                  TOLICHOWKI STORE
                </h5>
                <p className="font-['Jost'] text-[12px] text-[#5C4A3E] leading-snug whitespace-nowrap">
                  Open Daily 10:30 AM
                </p>
              </div>
            </button>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-[1px] h-[34px] bg-[#EDE4DC]" />

            {/* Info 2: WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-left group text-decoration-none cursor-pointer"
            >
              <div className="text-[#25D366] flex-shrink-0">
                <MessageCircle size={18} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h5 className="font-['Jost'] text-[10.5px] font-bold tracking-wider uppercase text-[#1E1610] whitespace-nowrap">
                  CHAT ON WHATSAPP
                </h5>
                <p className="font-['Jost'] text-[12px] text-[#5C4A3E] leading-snug whitespace-nowrap">
                  Quick &amp; Personal
                </p>
              </div>
            </a>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-[1px] h-[34px] bg-[#EDE4DC]" />

            {/* Info 3: Directions */}
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-left group text-decoration-none cursor-pointer"
            >
              <div className="text-[#C0846A] flex-shrink-0">
                <MapPin size={18} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h5 className="font-['Jost'] text-[10.5px] font-bold tracking-wider uppercase text-[#1E1610] whitespace-nowrap">
                  GET DIRECTIONS
                </h5>
                <p className="font-['Jost'] text-[12px] text-[#5C4A3E] leading-snug whitespace-nowrap">
                  Find Us Easily
                </p>
              </div>
            </a>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary Filled Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenCatalogue) {
                  onOpenCatalogue();
                } else {
                  const target = document.getElementById('collections');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn btn-rose w-full sm:w-auto justify-center"
              style={{
                height: '44px',
                padding: '0 28px',
                borderRadius: '5px',
                fontSize: '11px',
                letterSpacing: '0.14em',
                gap: '8px',
              }}
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight size={12} />
            </button>

            {/* Secondary WhatsApp Outline Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:w-auto justify-center"
              style={{
                height: '44px',
                padding: '0 26px',
                borderRadius: '5px',
                fontSize: '11px',
                letterSpacing: '0.14em',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <span>CHAT WITH US</span>
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ctaFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 768px) {
          .final-cta-floating-banner {
            padding: 28px 18px !important;
            width: calc(100% - 24px) !important;
            min-height: auto !important;
            border-radius: 20px 4px 20px 4px !important;
            background: #FFFFFF !important;
            border: 1px solid #EDE4DC !important;
            box-shadow: 0 10px 32px -6px rgba(45, 30, 20, 0.1) !important;
          }
          .final-cta-content-box {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border-radius: 0 !important;
            border: none !important;
            padding: 0 !important;
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
          }
          .final-cta-content-box h2,
          .final-cta-content-box h3,
          .final-cta-content-box h4 {
            text-shadow: none !important;
            color: #120A06 !important;
          }
          .final-cta-content-box h3 {
            color: #8A2E20 !important;
          }
          .final-cta-content-box p,
          .final-cta-content-box h5 {
            text-shadow: none !important;
          }
        }
      `}</style>
    </section>
  );
};
