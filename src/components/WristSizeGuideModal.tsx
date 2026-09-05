import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, MessageCircle, HelpCircle, Check, ArrowRight } from 'lucide-react';

interface WristSizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsapp?: string;
}

interface BangleSizeInfo {
  size: string;
  diameterMm: number;
  diameterInches: string;
  circumferenceMm: number;
  fitDescription: string;
  recommendedFor: string;
  badge?: string;
}

const BANGLE_SIZES: BangleSizeInfo[] = [
  {
    size: '2.2',
    diameterMm: 54.0,
    diameterInches: '2.125"',
    circumferenceMm: 169.6,
    fitDescription: 'Extra Small / Petite Wrist',
    recommendedFor: 'Slender wrists, teenagers, or snug single kada fit.',
  },
  {
    size: '2.4',
    diameterMm: 57.2,
    diameterInches: '2.25"',
    circumferenceMm: 179.6,
    fitDescription: 'Small Wrist Fit',
    recommendedFor: 'Slim to average wrists. Ideal for glass bangles.',
  },
  {
    size: '2.6',
    diameterMm: 60.3,
    diameterInches: '2.375"',
    circumferenceMm: 189.4,
    fitDescription: 'Standard Women’s Fit (Most Popular)',
    recommendedFor: 'The universal Indian size fitting ~65% of customers.',
    badge: 'MOST POPULAR',
  },
  {
    size: '2.8',
    diameterMm: 63.5,
    diameterInches: '2.50"',
    circumferenceMm: 199.4,
    fitDescription: 'Medium-Large Comfort Fit',
    recommendedFor: 'Slightly broader wrists or relaxed bridal stack stacking.',
  },
  {
    size: '2.10',
    diameterMm: 66.7,
    diameterInches: '2.625"',
    circumferenceMm: 209.5,
    fitDescription: 'Large / Broad Wrist Fit',
    recommendedFor: 'Comfortable slide-over fit for heavier bridal lac sets.',
  },
];

export const WristSizeGuideModal: React.FC<WristSizeGuideModalProps> = ({
  isOpen,
  onClose,
  whatsapp = '919014761009',
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(2); // Default to 2.6
  const [activeTab, setActiveTab] = useState<'visual' | 'measure'>('visual');

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

  const currentSize = BANGLE_SIZES[selectedSizeIndex];
  const ringScale = (currentSize.diameterMm / 66.7) * 100; // Relative visual scale

  const whatsappLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Gold N Glow! I used the Wrist Sizing Guide and my size is ${currentSize.size} (${currentSize.diameterMm}mm). Can you recommend matching Lac & Glass bangles in this size?`
  )}`;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(30,22,16,0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        animation: 'fadeIn 0.25s ease-out',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1.5px solid #E8DDD2',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div
          style={{
            backgroundColor: '#FAF6F0',
            padding: '24px 32px 20px',
            borderBottom: '1px solid #EDE4DC',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ marginBottom: '6px' }}>
              <span
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#8C4D15',
                }}
              >
                BESPOKE WRIST SIZING GUIDE
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '28px',
                fontWeight: 600,
                color: '#1E1610',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Find Your Perfect Indian Bangle Size
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EDE4DC',
              color: '#5C4A3E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FAF0F2';
              e.currentTarget.style.borderColor = '#E8B4BE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#EDE4DC';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid #EDE4DC', backgroundColor: '#FFFFFF' }}>
          <button
            onClick={() => setActiveTab('visual')}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontFamily: 'Jost, sans-serif',
              fontSize: '12px',
              fontWeight: activeTab === 'visual' ? 700 : 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: activeTab === 'visual' ? '#9E6B15' : '#7A6356',
              borderBottom: activeTab === 'visual' ? '2.5px solid #9E6B15' : '2.5px solid transparent',
              backgroundColor: activeTab === 'visual' ? '#FAF8F5' : '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Visual Ring Scale &amp; Sizer
          </button>
          <button
            onClick={() => setActiveTab('measure')}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontFamily: 'Jost, sans-serif',
              fontSize: '12px',
              fontWeight: activeTab === 'measure' ? 700 : 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: activeTab === 'measure' ? '#9E6B15' : '#7A6356',
              borderBottom: activeTab === 'measure' ? '2.5px solid #9E6B15' : '2.5px solid transparent',
              backgroundColor: activeTab === 'measure' ? '#FAF8F5' : '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            How to Measure (2-Min Guide)
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'visual' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Size Selector Buttons */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#1E1610',
                    marginBottom: '10px',
                  }}
                >
                  Select Indian Bangle Size
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                  {BANGLE_SIZES.map((item, idx) => {
                    const isSelected = selectedSizeIndex === idx;
                    return (
                      <button
                        key={item.size}
                        onClick={() => setSelectedSizeIndex(idx)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '12px 6px',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid #9E6B15' : '1px solid #EDE4DC',
                          backgroundColor: isSelected ? '#FAF5E8' : '#FAF6F0',
                          color: isSelected ? '#9E6B15' : '#1E1610',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {item.badge && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              fontSize: '8px',
                              fontWeight: 700,
                              backgroundColor: '#9E6B15',
                              color: '#FFFFFF',
                              padding: '1px 5px',
                              borderRadius: '2px',
                              letterSpacing: '0.05em',
                            }}
                          >
                            POPULAR
                          </span>
                        )}
                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>
                          {item.size}
                        </span>
                        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '10.5px', color: '#7A6356', marginTop: '4px' }}>
                          {item.diameterMm} mm
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visual Ring Representation Box */}
              <div
                style={{
                  backgroundColor: '#FAF6F0',
                  borderRadius: '18px',
                  border: '1px solid #EDE4DC',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Visual Scale Ring */}
                <div
                  style={{
                    width: '150px',
                    height: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    margin: '0 auto',
                  }}
                >
                  <div
                    style={{
                      width: `${ringScale}%`,
                      height: `${ringScale}%`,
                      maxWidth: '140px',
                      maxHeight: '140px',
                      borderRadius: '50%',
                      border: '3.5px dashed #9E6B15',
                      boxShadow: '0 0 16px rgba(158, 107, 21, 0.2), inset 0 0 12px rgba(158, 107, 21, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      backgroundColor: 'rgba(255,255,255,0.75)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#9E6B15' }}>
                      Size {currentSize.size}
                    </span>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', color: '#7A6356' }}>
                      Ø {currentSize.diameterMm} mm
                    </span>
                  </div>
                </div>

                {/* Size Specifications Breakdown */}
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9E6B15' }}>
                      {currentSize.fitDescription}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, color: '#1E1610', margin: '0 0 8px 0' }}>
                    Inner Diameter: {currentSize.diameterMm} mm ({currentSize.diameterInches})
                  </h4>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5C4A3E', lineHeight: 1.55, margin: '0 0 12px 0' }}>
                    {currentSize.recommendedFor}
                  </p>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '11.5px', fontFamily: 'Jost, sans-serif', color: '#7A6356' }}>
                    <div><strong>Circumference:</strong> ~{currentSize.circumferenceMm} mm</div>
                    <div><strong>US Equivalent:</strong> ~{currentSize.diameterInches}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Measure Instructions Tab */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#FAF6F0', border: '1px solid #EDE4DC' }}>
                <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '19px', fontWeight: 600, color: '#1E1610', margin: '0 0 6px 0' }}>
                  Method 1: Measure an Existing Bangle (Easiest)
                </h4>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5C4A3E', lineHeight: 1.6, margin: 0 }}>
                  Take a bangle that fits you perfectly. Place it flat on a ruler and measure the <strong>inside diameter</strong> in millimetres (excluding the outer rim). Match it to the sizes above.
                </p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#FAF6F0', border: '1px solid #EDE4DC' }}>
                <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '19px', fontWeight: 600, color: '#1E1610', margin: '0 0 6px 0' }}>
                  Method 2: Hand Knuckle Measurement
                </h4>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5C4A3E', lineHeight: 1.6, margin: 0 }}>
                  Bring your thumb and pinky finger together as if putting on a bangle. Wrap a string or measuring tape around the widest part of your hand across the knuckles. Measure that length in mm against our circumference table.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div
          style={{
            padding: '18px 32px',
            backgroundColor: '#FAF6F0',
            borderTop: '1px solid #EDE4DC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#7A6356', fontFamily: 'Jost, sans-serif' }}>
              Unsure? Our bangle stylists confirm sizes live via WhatsApp video call.
            </span>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{
              height: '42px',
              padding: '0 22px',
              borderRadius: '5px',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              gap: '8px',
            }}
          >
            <MessageCircle size={15} />
            <span>Confirm Size with Stylist</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};
