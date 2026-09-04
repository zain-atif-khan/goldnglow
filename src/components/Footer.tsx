import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { GoldNGlowLogo, InstagramIcon, FacebookIcon, YoutubeIcon } from './Icons';
import { SiteSettings } from '../lib/database.types';

interface FooterProps {
  settings: SiteSettings;
  onOpenCatalogue?: () => void;
  onOpenPolicyModal: (policyName: string) => void;
  onOpenStoreModal?: () => void;
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenCatalogue,
  onOpenPolicyModal,
  onOpenStoreModal,
  onNavigate,
}) => {
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Gold N Glow! I have an inquiry about your bangle collections.'
  )}`;

  const handleNav = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate(page);
    else window.location.hash = page === 'home' ? '' : page;
  };

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, #241815 0%, #17100E 100%)',
        borderTop: '1px solid #40332D',
        paddingTop: '64px',
        paddingBottom: '36px',
        color: '#F5E9E1',
        boxSizing: 'border-box',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* 5-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '4fr 2fr 2fr 2fr 2.2fr',
            gap: '36px',
            paddingBottom: '40px',
            borderBottom: '1px solid #40332D',
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand & Heritage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a
              href="#"
              onClick={(e) => handleNav('home', e)}
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            >
              <GoldNGlowLogo />
            </a>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '13.5px',
                lineHeight: 1.7,
                color: '#CDB9AE',
                maxWidth: '330px',
              }}
            >
              Hyderabad's celebrated destination for handcrafted bridal churas, Nizam-inspired kadas, and designer daily bangles since 2002.
            </p>
            <div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '0 22px',
                  height: '42px',
                  borderRadius: '999px',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(37,211,102,0.45)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(37,211,102,0.3)';
                }}
              >
                <MessageCircle size={15} />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C9A46A',
                marginBottom: '6px',
              }}
            >
              COLLECTIONS
            </h4>
            <a
              href="#bridal"
              onClick={(e) => handleNav('bridal', e)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#F5E9E1', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Bridal Heritage
            </a>
            <a
              href="#collections"
              onClick={(e) => handleNav('collections', e)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#F5E9E1', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Festive Jadau Edits
            </a>
            <a
              href="#collections"
              onClick={(e) => handleNav('collections', e)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#F5E9E1', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Cubic Zirconia Pavé
            </a>
            <a
              href="#collections"
              onClick={(e) => handleNav('collections', e)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#F5E9E1', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Antique Matte Sets
            </a>
            <a
              href="#collections"
              onClick={(e) => handleNav('collections', e)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#F5E9E1', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Velvet &amp; Stone Stacks
            </a>
            {onOpenCatalogue && (
              <button
                onClick={onOpenCatalogue}
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '13.5px',
                  color: '#C9A46A',
                  fontWeight: 600,
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  marginTop: '4px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A46A'; }}
              >
                Download Lookbook →
              </button>
            )}
          </div>

          {/* Column 3: The Maison */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C9A46A',
                marginBottom: '6px',
              }}
            >
              THE MAISON
            </h4>
            <a
              href="#about"
              onClick={(e) => handleNav('about', e)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#F5E9E1', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Our 2002 Heritage
            </a>
            <a
              href="#experience"
              onClick={(e) => handleNav('experience', e)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#F5E9E1', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Tolichowki Showroom
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav('contact', e)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#F5E9E1', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Contact Concierge
            </a>
            <a
              href="#admin"
              onClick={(e) => handleNav('admin', e)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#C9A46A', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A46A'; }}
            >
              Admin Portal
            </a>
          </div>

          {/* Column 4: Client Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C9A46A',
                marginBottom: '6px',
              }}
            >
              CLIENT SERVICES
            </h4>
            <button
              onClick={() => onOpenPolicyModal('Wrist Sizing & Measurement Guide')}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '13.5px',
                color: '#F5E9E1',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Wrist Sizing Guide
            </button>
            <button
              onClick={() => onOpenPolicyModal('Bespoke Bridal Customization')}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '13.5px',
                color: '#F5E9E1',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Bridal Stacking Advice
            </button>
            <button
              onClick={() => onOpenPolicyModal('Shipping & Delivery')}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '13.5px',
                color: '#F5E9E1',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Worldwide Shipping
            </button>
            <button
              onClick={() => onOpenPolicyModal('Care Instructions')}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '13.5px',
                color: '#F5E9E1',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              Bangle Care Guide
            </button>
            <button
              onClick={() => onOpenPolicyModal('Frequently Asked Questions')}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '13.5px',
                color: '#F5E9E1',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5E9E1'; }}
            >
              FAQs &amp; Help
            </button>
          </div>

          {/* Column 5: Store Hours & Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C9A46A',
                marginBottom: '6px',
              }}
            >
              VISIT BOUTIQUE
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: '#F5E9E1' }}>
              <MapPin size={14} style={{ color: '#C9A46A', flexShrink: 0, marginTop: '3px' }} />
              <span>Tolichowki, Hyderabad</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: '#F5E9E1' }}>
              <Clock size={14} style={{ color: '#C9A46A', flexShrink: 0, marginTop: '3px' }} />
              <span>{settings.store_timings}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px' }}>
              <Phone size={14} style={{ color: '#C9A46A', flexShrink: 0, marginTop: '3px' }} />
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                style={{ color: '#C9A46A', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A46A'; }}
              >
                {settings.phone}
              </a>
            </div>
            {onOpenStoreModal && (
              <button
                onClick={onOpenStoreModal}
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '12.5px',
                  color: '#C9A46A',
                  fontWeight: 600,
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  marginTop: '4px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A46A'; }}
              >
                Directions &amp; Map →
              </button>
            )}
          </div>
        </div>

        {/* 3D EMBOSSED "GOLD N GLOW" ARCHITECTURAL STATEMENT IN THE MIDDLE SECTION */}
        <div
          style={{
            padding: '36px 0 24px 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.4rem, 8.2vw, 7.6rem)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              whiteSpace: 'nowrap',
              display: 'inline-block',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F3E4DF 35%, #C9A46A 75%, #8B6928 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.75)) drop-shadow(0 8px 30px rgba(201, 164, 106, 0.20))',
            }}
          >
            GOLD N GLOW
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '14px',
              fontFamily: 'Jost, sans-serif',
              fontSize: 'clamp(9px, 1.1vw, 12px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C9A46A',
              textAlign: 'center',
              flexWrap: 'wrap',
            }}
          >
            <span className="hidden sm:inline-block" style={{ height: '1px', width: '32px', backgroundColor: '#40332D' }} />
            <span>THE ROYAL HYDERABAD BANGLE ARCHIVE • EST. 2002</span>
            <span className="hidden sm:inline-block" style={{ height: '1px', width: '32px', backgroundColor: '#40332D' }} />
          </div>
        </div>

        {/* Sub-footer */}
        <div
          style={{
            borderTop: '1px solid #40332D',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontFamily: 'Jost, sans-serif',
            fontSize: '12px',
            color: '#CDB9AE',
          }}
        >
          <p>© 2002–2025 Gold N Glow Bangles. All rights reserved. Tolichowki, Hyderabad.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {settings.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#CDB9AE', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#CDB9AE'; }}
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
            )}
            {settings.facebook_url && (
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#CDB9AE', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#CDB9AE'; }}
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
            )}
            {settings.youtube_url && (
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#CDB9AE', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C88A70'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#CDB9AE'; }}
                aria-label="YouTube"
              >
                <YoutubeIcon size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-section {
            padding-bottom: 84px !important;
          }
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-section {
            padding-bottom: 92px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </footer>
  );
};
