import React from 'react';
import { X, MessageCircle, Trash2, ShoppingBag } from 'lucide-react';
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
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  settings,
}) => {
  if (!isOpen) return null;

  const orderSummary = items
    .map((item) => `• ${item.title} (Qty: ${item.quantity}${item.size ? `, Size: ${item.size}` : ''})`)
    .join('\n');

  const whatsappCheckoutLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Gold N Glow! I would like to inquire about ordering these bangles from your online catalogue:\n\n${orderSummary}\n\nPlease share price, stone details, and delivery timeline.`
  )}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(30,22,16,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          height: '100%',
          boxShadow: '-8px 0 32px rgba(30,22,16,0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: '1px solid #E2D5CA',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #E2D5CA',
            backgroundColor: '#F7EEE8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#C0846A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #E2D5CA',
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1E1610',
                  lineHeight: 1.2,
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
            aria-label="Close Drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items List */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
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
                  fontSize: '20px',
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
                Explore our collections or founder picks to add designer bangles for direct WhatsApp pricing and customization.
              </p>
              <button
                onClick={onClose}
                className="btn btn-rose"
                style={{
                  marginTop: '20px',
                  padding: '0 24px',
                  height: '42px',
                  borderRadius: '5px',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                }}
              >
                <span>BROWSE COLLECTIONS</span>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  backgroundColor: '#F7EEE8',
                  padding: '14px',
                  borderRadius: '14px',
                  border: '1px solid #E2D5CA',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '10px',
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
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </h4>
                  <div
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      color: '#7A6356',
                      marginTop: '2px',
                    }}
                  >
                    Qty: {item.quantity} {item.size && `• Size ${item.size}`}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  style={{
                    color: '#A08878',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C0846A'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#A08878'; }}
                  aria-label="Remove item"
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
              padding: '20px 24px',
              borderTop: '1px solid #E2D5CA',
              backgroundColor: '#F7EEE8',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <a
              href={whatsappCheckoutLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full justify-center"
              style={{
                height: '48px',
                borderRadius: '5px',
                fontSize: '11.5px',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                gap: '8px',
              }}
            >
              <MessageCircle size={16} />
              <span>SEND INQUIRY ON WHATSAPP</span>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={onClearCart}
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11px',
                  color: '#A08878',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Clear Shortlist
              </button>
              <span
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11px',
                  color: '#7A6356',
                }}
              >
                Direct Pricing &amp; Sizing via WhatsApp
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
