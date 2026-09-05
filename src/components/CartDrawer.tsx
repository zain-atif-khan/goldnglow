import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageCircle, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteSettings } from '../lib/database.types';

export interface CartItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  size?: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  settings: SiteSettings;
  onNavigate?: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  settings,
  onNavigate,
}) => {
  // Lock scroll & handle Escape key
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

  const handleBrowseCollections = () => {
    onClose();
    if (onNavigate) {
      onNavigate('collections');
    }
  };

  const orderSummary = items
    .map((item) => `• ${item.title} (Qty: ${item.quantity}${item.size ? `, Size: ${item.size}` : ''})`)
    .join('\n');

  const whatsappCheckoutLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Gold N Glow! I would like to inquire about ordering these bangles from your online catalogue:\n\n${orderSummary}\n\nPlease share price, stone details, and delivery timeline.`
  )}`;

  return createPortal(
    <div
      className="cart-drawer-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(20, 14, 10, 0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'cartFadeIn 0.22s ease-out',
      }}
    >
      <div
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          height: '100%',
          boxShadow: '-8px 0 36px rgba(27, 18, 14, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: '1px solid #E2D5CA',
          animation: 'cartSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
        }}
      >
        {/* Header with clear Back and Close buttons */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2D5CA',
            backgroundColor: '#F7EEE8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2D5CA',
                color: '#5C4A3E',
                fontFamily: 'Jost, sans-serif',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Back to store"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F0E4DC';
                e.currentTarget.style.borderColor = '#C0846A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E2D5CA';
              }}
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <div>
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1E1610',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                My Bangle Shortlist
              </h3>
              <span
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11px',
                  color: '#C0846A',
                  fontWeight: 600,
                }}
              >
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2D5CA',
              color: '#7A6356',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            aria-label="Close Drawer"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FAF4F0';
              e.currentTarget.style.color = '#1E1610';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#7A6356';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Items List */}
        <div
          style={{
            padding: '20px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '64px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7A6356',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#F7EEE8',
                  color: '#C0846A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  border: '1px solid #E2D5CA',
                }}
              >
                <ShoppingBag size={26} />
              </div>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#1E1610',
                }}
              >
                Your Shortlist is Empty
              </p>
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '13px',
                  color: '#7A6356',
                  marginTop: '6px',
                  maxWidth: '260px',
                  lineHeight: 1.5,
                }}
              >
                Explore our collections to add handcrafted Lac &amp; Artisan Glass bangles to your shortlist.
              </p>
              <button
                type="button"
                onClick={handleBrowseCollections}
                className="btn btn-rose"
                style={{
                  marginTop: '20px',
                  padding: '0 24px',
                  height: '44px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  letterSpacing: '0.14em',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#F7EEE8',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #E2D5CA',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#F0E4DC',
                    flexShrink: 0,
                    border: '1px solid #E2D5CA',
                  }}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#1E1610',
                      lineHeight: 1.25,
                      marginBottom: '2px',
                    }}
                  >
                    {item.title}
                  </h4>
                  <div
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      color: '#7A6356',
                    }}
                  >
                    Qty: {item.quantity} {item.size && `• Size ${item.size}`}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  style={{
                    color: '#A08878',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#C0846A';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#A08878';
                  }}
                  aria-label="Remove item"
                  title="Remove from shortlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: '18px 20px',
              borderTop: '1px solid #E2D5CA',
              backgroundColor: '#F7EEE8',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {/* Direct WhatsApp Checkout Inquiry Button */}
            <a
              href={whatsappCheckoutLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full justify-center"
              style={{
                height: '46px',
                borderRadius: '6px',
                fontSize: '11.5px',
                letterSpacing: '0.12em',
                fontWeight: 700,
                textDecoration: 'none',
                gap: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MessageCircle size={17} />
              <span>SEND INQUIRY ON WHATSAPP</span>
            </a>

            {/* Button that takes to the Collections dedicated page */}
            <button
              type="button"
              onClick={handleBrowseCollections}
              style={{
                width: '100%',
                height: '42px',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #C0846A',
                color: '#C0846A',
                fontFamily: 'Jost, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FAF4F0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <span>+ ADD MORE BANGLES (COLLECTIONS)</span>
              <ArrowRight size={13} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <button
                type="button"
                onClick={onClearCart}
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11px',
                  color: '#A08878',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Clear Shortlist
              </button>
              <span
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '10.5px',
                  color: '#7A6356',
                }}
              >
                Direct WhatsApp Pricing &amp; Sizing
              </span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cartFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cartSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>,
    document.body
  );
};
