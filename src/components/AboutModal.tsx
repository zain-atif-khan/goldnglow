import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Award, Gem, Users, Heart } from 'lucide-react';
import { FounderContent } from '../lib/database.types';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  founder: FounderContent;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  founder,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('modal-open', 'bangle-modal-active');
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open', 'bangle-modal-active');
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.touchAction = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(30,22,16,0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overscrollBehavior: 'contain',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90dvh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2D5CA',
          boxShadow: '0 20px 60px rgba(30,22,16,0.18)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
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

        {/* Header Banner */}
        <div
          style={{
            backgroundColor: '#F7EEE8',
            padding: '28px 32px',
            borderBottom: '1px solid #E2D5CA',
          }}
        >
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C0846A',
            }}
          >
            OUR HERITAGE SINCE 2002
          </span>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '26px',
              fontWeight: 600,
              color: '#1E1610',
              marginTop: '4px',
            }}
          >
            The Story Behind Gold N Glow
          </h3>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '13px',
              color: '#7A6356',
              marginTop: '4px',
              maxWidth: '520px',
            }}
          >
            How a passion for artisan curation made us Hyderabad's premier destination for handcrafted bangles.
          </p>
        </div>

        {/* Body */}
        <div
          style={{
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: '5fr 7fr',
            gap: '32px',
            alignItems: 'start',
          }}
          className="about-modal-grid"
        >
          {/* Left: Founder photo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #E2D5CA',
                marginBottom: '12px',
                backgroundColor: '#F0E4DC',
              }}
            >
              <img
                src={founder.founder_image_url || '/assets/founder/syed-owais-ahmed.png'}
                alt={founder.founder_name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '20px',
                fontWeight: 600,
                color: '#C0846A',
                fontStyle: 'italic',
              }}
            >
              {founder.founder_name}
            </div>
            <span
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#7A6356',
                marginTop: '2px',
              }}
            >
              {founder.founder_role}
            </span>
          </div>

          {/* Right: Story details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.7 }}>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '18px',
                color: '#1E1610',
                fontStyle: 'italic',
                lineHeight: 1.5,
              }}
            >
              "{founder.founder_quote}"
            </p>

            <p>
              Founded in 2002 in Tolichowki, Hyderabad, Gold N Glow was established with a singular vision: to bring world-class variety, artisan craftsmanship, and personal curation to traditional and modern bangles.
            </p>

            <p>
              Over the last 22+ years, we have had the privilege of serving thousands of families — helping brides match kadas to wedding silks, assisting sisters choosing festive gifts, and shipping custom sets worldwide.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginTop: '8px',
                paddingTop: '16px',
                borderTop: '1px solid #E2D5CA',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={15} style={{ color: '#C0846A' }} />
                <span style={{ fontWeight: 600, color: '#1E1610', fontSize: '12px' }}>22+ Years in Tolichowki</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gem size={15} style={{ color: '#C0846A' }} />
                <span style={{ fontWeight: 600, color: '#1E1610', fontSize: '12px' }}>500+ Curated Styles</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={15} style={{ color: '#C0846A' }} />
                <span style={{ fontWeight: 600, color: '#1E1610', fontSize: '12px' }}>10,000+ Happy Brides</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={15} style={{ color: '#C0846A' }} />
                <span style={{ fontWeight: 600, color: '#1E1610', fontSize: '12px' }}>Custom Wrist Sizing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .about-modal-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};
