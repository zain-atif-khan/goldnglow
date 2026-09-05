import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, MessageCircle, Check, BookOpen } from 'lucide-react';
import { SiteSettings } from '../lib/database.types';
import { DataService } from '../lib/dataService';

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
}

export const CatalogueModal: React.FC<CatalogueModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Bridal Bangles');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    await DataService.submitEnquiry({
      name,
      phone,
      interest,
      message: `Requested Digital Lookbook for ${interest}`,
    });

    setSubmitted(true);
  };

  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Gold N Glow! My name is ${name || 'Customer'}. Please send me the 2025 Bangle Lookbook & Catalogue.`
  )}`;

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
          maxWidth: '520px',
          maxHeight: '90dvh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
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
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#C0846A';
              (e.currentTarget as HTMLElement).style.borderColor = '#C0846A';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#7A6356';
              (e.currentTarget as HTMLElement).style.borderColor = '#E2D5CA';
            }}
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#C0846A',
              marginBottom: '6px',
            }}
          >
            <BookOpen size={14} />
            <span
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              EXCLUSIVE LOOKBOOK
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
            Gold N Glow 2025 Bangle Catalogue
          </h3>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '13px',
              color: '#7A6356',
              marginTop: '4px',
              lineHeight: 1.5,
            }}
          >
            Browse our curated bridal heritage, royal jadau, and designer bangle creations.
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#F0E4DC',
                  color: '#C0846A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  border: '1px solid #E2D5CA',
                }}
              >
                <Check size={24} />
              </div>
              <h4
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#1E1610',
                  marginBottom: '6px',
                }}
              >
                Lookbook Unlocked!
              </h4>
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '13px',
                  color: '#7A6356',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                }}
              >
                Your request has been received. You can now download the high-definition catalogue or chat with our bangle consultant on WhatsApp.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href="/assets/hero/hero-bangles.png"
                  download="Gold-N-Glow-Lookbook.png"
                  className="btn btn-rose"
                  style={{
                    height: '46px',
                    borderRadius: '5px',
                    fontSize: '11.5px',
                    letterSpacing: '0.12em',
                    textDecoration: 'none',
                    gap: '8px',
                  }}
                >
                  <Download size={14} />
                  <span>DOWNLOAD LOOKBOOK (PDF/HQ)</span>
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{
                    height: '46px',
                    borderRadius: '5px',
                    fontSize: '11.5px',
                    letterSpacing: '0.12em',
                    textDecoration: 'none',
                    gap: '8px',
                  }}
                >
                  <MessageCircle size={15} />
                  <span>REQUEST ON WHATSAPP</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#1E1610',
                    marginBottom: '6px',
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 16px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2D5CA',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '14px',
                    color: '#1E1610',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#1E1610',
                    marginBottom: '6px',
                  }}
                >
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 16px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2D5CA',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '14px',
                    color: '#1E1610',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#1E1610',
                    marginBottom: '6px',
                  }}
                >
                  Primary Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 16px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2D5CA',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '14px',
                    color: '#1E1610',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  <option value="Handcrafted Lac Bangles">Handcrafted Lac Bangles (Raw Lac &amp; Mirror Work)</option>
                  <option value="Artisan Glass Bangles">Artisan Glass Bangles (Velvet Matte &amp; Shimmer Glass)</option>
                  <option value="Bridal Heritage Sets">Bridal Heritage Sets (Lac Churas &amp; Bridal Glass)</option>
                  <option value="Custom Sizing">Custom Wrist Sizing &amp; VIP Consultation</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-rose w-full justify-center"
                style={{
                  height: '46px',
                  borderRadius: '5px',
                  fontSize: '11.5px',
                  letterSpacing: '0.12em',
                  gap: '8px',
                  marginTop: '8px',
                }}
              >
                <Download size={14} />
                <span>REQUEST INSTANT LOOKBOOK</span>
              </button>

              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11px',
                  color: '#A08878',
                  textAlign: 'center',
                  marginTop: '4px',
                }}
              >
                We respect your privacy. No spam. Direct WhatsApp support only.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
