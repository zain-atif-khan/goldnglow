import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingBag, MessageCircle, Check } from 'lucide-react';

export interface BangleDetailModalItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  tag?: string;
  material?: string;
}

interface BangleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BangleDetailModalItem | null;
  onAddToCart: (item: BangleDetailModalItem, size: string) => void;
  whatsapp: string;
  isAdded?: boolean;
  onOpenSizeGuide?: () => void;
}

export const BangleDetailModal: React.FC<BangleDetailModalProps> = ({
  isOpen,
  onClose,
  item,
  onAddToCart,
  whatsapp,
  isAdded = false,
  onOpenSizeGuide,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('2.6');

  // Reset selected size when a new item opens
  useEffect(() => {
    setSelectedSize('2.6');
  }, [item?.id]);

  // Lock scroll & hide navbar while modal is open
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('bangle-modal-active', 'modal-open');
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('bangle-modal-active', 'modal-open');
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.touchAction = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const cleanWa = (whatsapp || '919849012345').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    `Hello Gold N Glow! I am interested in inquiring about "${item.title}" (${item.tag || item.material || 'Bangle Suite'}, Size: ${selectedSize}).`
  )}`;

  return createPortal(
    <div
      className="bangle-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(20, 14, 10, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        animation: 'bangleModalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="bangle-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #EBE1D8',
          boxShadow: '0 25px 70px rgba(27, 18, 14, 0.25)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          animation: 'bangleModalScaleUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2D5CA',
            color: '#5C4A3E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FAF4F0';
            e.currentTarget.style.borderColor = '#C0846A';
            e.currentTarget.style.color = '#1E1610';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = '#E2D5CA';
            e.currentTarget.style.color = '#5C4A3E';
          }}
        >
          <X size={16} />
        </button>

        {/* Left: Image */}
        <div
          className="bangle-modal-img-wrap"
          style={{
            width: '100%',
            height: '100%',
            minHeight: '340px',
            backgroundColor: '#F5ECE6',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Right: Content */}
        <div
          className="bangle-modal-content"
          style={{
            padding: '32px 32px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* Eyebrow Tag */}
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B57761',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            {item.tag || (item.material ? `${item.material} BANGLE` : 'SIGNATURE PIECE')}
          </span>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '23px',
              fontWeight: 600,
              color: '#1E1610',
              lineHeight: 1.2,
              marginBottom: '10px',
            }}
          >
            {item.title}
          </h3>

          {/* Description */}
          {item.description && (
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '13px',
                color: '#7A6356',
                lineHeight: 1.55,
                marginBottom: '18px',
              }}
            >
              {item.description}
            </p>
          )}

          {/* Wrist Size Selector & Indian Size Guide inside Popup */}
          <div
            style={{
              marginBottom: '18px',
              padding: '12px 14px',
              backgroundColor: '#FAF5F0',
              borderRadius: '10px',
              border: '1px solid #EDE4DC',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#1E1610',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Size:
                </span>
                <span
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#C0846A',
                  }}
                >
                  {selectedSize} ({selectedSize === '2.6' ? 'Standard' : selectedSize === '2.4' ? 'Small' : selectedSize === '2.8' ? 'Medium-Large' : selectedSize === '2.2' ? 'Petite' : 'Broad'})
                </span>
              </div>

              {onOpenSizeGuide && (
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9E6B15',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Wrist Size Guide (2.2 – 2.10)</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['2.2', '2.4', '2.6', '2.8', '2.10'].map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      flex: 1,
                      minWidth: '44px',
                      height: '32px',
                      borderRadius: '6px',
                      border: isSelected ? '1.5px solid #C0846A' : '1px solid #E2D5CA',
                      backgroundColor: isSelected ? '#FDF5E6' : '#FFFFFF',
                      color: isSelected ? '#8C4D15' : '#5C4A3E',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 2px 6px rgba(192, 132, 106, 0.2)' : 'none',
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              onClick={() => onAddToCart(item, selectedSize)}
              style={{
                height: '46px',
                width: '100%',
                borderRadius: '8px',
                backgroundColor: isAdded ? '#1E8E3E' : '#B57761',
                border: 'none',
                color: '#FFFFFF',
                fontFamily: 'Jost, sans-serif',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: isAdded
                  ? '0 4px 14px rgba(30, 142, 62, 0.25)'
                  : '0 4px 14px rgba(181, 119, 97, 0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isAdded) e.currentTarget.style.backgroundColor = '#A36652';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                if (!isAdded) e.currentTarget.style.backgroundColor = '#B57761';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isAdded ? (
                <>
                  <Check size={16} />
                  <span>ADDED TO SHORTLIST ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={15} />
                  <span>ADD TO SHORTLIST</span>
                </>
              )}
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: '46px',
                width: '100%',
                borderRadius: '8px',
                backgroundColor: '#25D366',
                border: 'none',
                color: '#FFFFFF',
                fontFamily: 'Jost, sans-serif',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#20BD5A';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#25D366';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MessageCircle size={16} />
              <span>INQUIRE ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bangleModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bangleModalScaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 767px) {
          .bangle-modal-card {
            grid-template-columns: 1fr !important;
            max-width: 92vw !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
            border-radius: 18px !important;
          }
          .bangle-modal-img-wrap {
            min-height: unset !important;
            aspect-ratio: 4 / 3 !important;
          }
          .bangle-modal-content {
            padding: 24px 20px 24px !important;
          }
          .bangle-modal-content h3 {
            font-size: 20px !important;
            margin-bottom: 8px !important;
          }
          .bangle-modal-content p {
            font-size: 12.5px !important;
            margin-bottom: 16px !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};
