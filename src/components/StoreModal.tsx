import React from 'react';
import { X, MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import { SiteSettings } from '../lib/database.types';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
}

export const StoreModal: React.FC<StoreModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  if (!isOpen) return null;

  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Gold N Glow! I would like to schedule a visit to your Tolichowki showroom.'
  )}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(30,22,16,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90dvh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2D5CA',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(30,22,16,0.18)',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#F7EEE8',
            padding: '28px 32px',
            borderBottom: '1px solid #E2D5CA',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2D5CA',
              color: '#7A6356',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#C0846A',
              marginBottom: '6px',
            }}
          >
            <MapPin size={14} />
            <span
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              HYDERABAD FLAGSHIP SHOWROOM
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '24px',
              fontWeight: 600,
              color: '#1E1610',
              lineHeight: 1.2,
            }}
          >
            Visit Gold N Glow Boutique
          </h3>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '13px',
              color: '#7A6356',
              marginTop: '4px',
            }}
          >
            Experience our full collection of over 500+ handcrafted bangle styles in person.
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '28px 32px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            alignItems: 'center',
          }}
          className="store-modal-grid"
        >
          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <MapPin size={16} style={{ color: '#C0846A', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <h4
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#1E1610',
                    marginBottom: '2px',
                  }}
                >
                  Address
                </h4>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.4 }}>
                  {settings.address_line1}
                </p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.4 }}>
                  {settings.address_line2}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Clock size={16} style={{ color: '#C0846A', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <h4
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#1E1610',
                    marginBottom: '2px',
                  }}
                >
                  Store Timings
                </h4>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356' }}>
                  {settings.store_timings}
                </p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#C0846A', fontWeight: 600, marginTop: '2px' }}>
                  {settings.store_days}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Phone size={16} style={{ color: '#C0846A', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <h4
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#1E1610',
                    marginBottom: '2px',
                  }}
                >
                  Direct Phone
                </h4>
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#C0846A', fontWeight: 600, textDecoration: 'none' }}
                >
                  {settings.phone}
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-rose"
                style={{
                  height: '44px',
                  borderRadius: '5px',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  gap: '8px',
                }}
              >
                <Navigation size={13} />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{
                  height: '44px',
                  borderRadius: '5px',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  gap: '8px',
                }}
              >
                <MessageCircle size={14} />
                <span>CHAT WITH STORE TEAM</span>
              </a>
            </div>
          </div>

          {/* Photo */}
          <div
            style={{
              width: '100%',
              aspectRatio: '4 / 3.6',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid #E2D5CA',
              backgroundColor: '#F0E4DC',
            }}
          >
            <img
              src="/assets/store/store-interior-main.jpg"
              alt="Tolichowki Showroom"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .store-modal-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
