import React, { useState } from 'react';
import { CollectionItem } from '../lib/database.types';
import { ShoppingBag, MessageCircle, Check, X, Ruler } from 'lucide-react';
import { BorderGlow } from '../components/BorderGlow';

interface CollectionsPageProps {
  collections: CollectionItem[];
  onAddToCart: (item: CollectionItem, size: string) => void;
  onOpenCatalogue: () => void;
  onOpenSizeGuide?: () => void;
  whatsapp: string;
  initialCategory?: string;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  collections,
  onAddToCart,
  onOpenSizeGuide,
  whatsapp,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<{ [id: string]: string }>({});
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [activeModalItem, setActiveModalItem] = useState<CollectionItem | null>(null);

  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = [
    { id: 'all', label: 'All Bangles' },
    { id: 'lac', label: 'Handcrafted Lac' },
    { id: 'glass', label: 'Artisan Glass' },
    { id: 'bridal', label: 'Bridal Heritage (Lac & Glass)' },
  ];

  const filtered = collections.filter((c) => {
    if (!c.active) return false;
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'lac') return c.category === 'lac' || c.material === 'Lac' || c.material === 'Lac & Glass';
    if (selectedCategory === 'glass') return c.category === 'glass' || c.material === 'Glass' || c.material === 'Lac & Glass';
    if (selectedCategory === 'bridal') return c.category === 'bridal' || c.material === 'Lac & Glass';
    return c.category === selectedCategory;
  });

  const handleSizeChange = (id: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleAdd = (item: CollectionItem) => {
    const size = selectedSizes[item.id] || '2.6';
    onAddToCart(item, size);
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <div style={{ width: '100%', background: 'linear-gradient(180deg, #FDF4F0 0%, #FAF3EC 30%, #F8EFE5 70%, #F5EBE0 100%)', padding: '130px 0 100px' }}>
      <div className="container">
        {/* Page Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto 48px',
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
              display: 'block',
              marginBottom: '8px',
            }}
          >
            CURATED MASTERPIECES
          </span>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 600,
              color: '#120A06',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            Handcrafted Lac &amp; Artisan Glass Collections
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, margin: '0 auto 16px' }} />
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#7A6356',
            }}
          >
            Explore Hyderabad's premier showcase of authentic <strong>Handcrafted Lac</strong> and <strong>Artisan Glass</strong> bangles, alongside royal bridal heirloom churas.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: isActive ? '1.5px solid #1E1610' : '1.5px solid #E2D5CA',
                  backgroundColor: isActive ? '#1E1610' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#5C4A3E',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(30,22,16,0.15)' : 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Indian Sizing Guide Callout Banner */}
        {onOpenSizeGuide && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <button
              onClick={onOpenSizeGuide}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '999px',
                backgroundColor: '#FDF5E6',
                border: '1.5px solid #E5C483',
                color: '#9E6B15',
                fontFamily: 'Jost, sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(158,107,21,0.12)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8E9CD';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FDF5E6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Ruler size={15} />
              <span>📐 Need Help Finding Your Size? Open Indian Wrist Sizing Guide (2.2 – 2.10)</span>
            </button>
          </div>
        )}

        {/* Collections Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}
          className="collections-grid"
        >
          {filtered.map((item) => {
            const currentSize = selectedSizes[item.id] || '2.6';
            const isAdded = addedItem === item.id;
            const waLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `Hello Gold N Glow! I am interested in inquiring about "${item.title}" (Material: ${item.material || 'Standard'}, Size: ${currentSize}).`
            )}`;

            return (
              <div
                key={item.id}
                className="collection-card-wrapper"
                style={{
                  position: 'relative',
                  height: '100%',
                }}
              >
                {/* Gradual Ambient Blur Halo behind card on hover */}
                <div
                  className="collection-card-ambient-blur"
                  style={{
                    position: 'absolute',
                    inset: '-8px',
                    borderRadius: '24px',
                    background:
                      'radial-gradient(ellipse at center, rgba(229, 196, 131, 0.5) 0%, rgba(192, 132, 106, 0.38) 50%, transparent 75%)',
                    filter: 'blur(16px)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />

                <BorderGlow
                  borderRadius={16}
                  glowColor="35 75 58"
                  backgroundColor="rgba(255, 255, 255, 0.96)"
                  edgeSensitivity={35}
                  glowIntensity={1.4}
                  coneSpread={35}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    border: '1.5px solid #EBE1D8',
                    boxShadow: '0 6px 24px rgba(45,30,20,0.05)',
                    height: '100%',
                    backdropFilter: 'blur(10px)',
                    transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <div>
                      {/* Image */}
                      <div
                        style={{
                          width: '100%',
                          aspectRatio: '4 / 3.2',
                          overflow: 'hidden',
                          backgroundColor: '#F0E4DC',
                          cursor: 'pointer',
                          borderTopLeftRadius: '16px',
                          borderTopRightRadius: '16px',
                        }}
                        onClick={() => setActiveModalItem(item)}
                      >
                        <img
                          src={item.image_url}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                          loading="lazy"
                        />
                      </div>

                      {/* Body */}
                      <div style={{ padding: '24px 24px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontFamily: 'Jost, sans-serif',
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '0.16em',
                              textTransform: 'uppercase',
                              color: '#C0846A',
                            }}
                          >
                            {item.badge_label || item.category.toUpperCase()}
                          </span>
                          {item.material && (
                            <span
                              style={{
                                fontFamily: 'Jost, sans-serif',
                                fontSize: '9px',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                backgroundColor: item.material === 'Lac' ? '#FDF5E6' : item.material === 'Glass' ? '#EEF6FB' : '#FAF0F2',
                                color: item.material === 'Lac' ? '#9E6B15' : item.material === 'Glass' ? '#2A6F97' : '#9E3345',
                                border: `1px solid ${item.material === 'Lac' ? '#E5C483' : item.material === 'Glass' ? '#B8D8EA' : '#E8B4BE'}`,
                                padding: '2px 8px',
                                borderRadius: '999px',
                              }}
                            >
                              Material: {item.material}
                            </span>
                          )}
                        </div>

                        <h3
                          style={{
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#1E1610',
                            lineHeight: 1.25,
                            marginBottom: '6px',
                            cursor: 'pointer',
                          }}
                          onClick={() => setActiveModalItem(item)}
                        >
                          {item.title}
                        </h3>

                        <p
                          style={{
                            fontFamily: 'Jost, sans-serif',
                            fontSize: '13px',
                            color: '#7A6356',
                            lineHeight: 1.55,
                            marginBottom: '16px',
                          }}
                          className="line-clamp-2"
                        >
                          {item.description || item.subtitle}
                        </p>

                        {/* Size Selector */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span
                              style={{
                                fontFamily: 'Jost, sans-serif',
                                fontSize: '11px',
                                fontWeight: 700,
                                color: '#1E1610',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                              }}
                            >
                              Size:
                            </span>
                            {onOpenSizeGuide && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenSizeGuide();
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#9E6B15',
                                  fontFamily: 'Jost, sans-serif',
                                  fontSize: '10.5px',
                                  fontWeight: 600,
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  padding: 0,
                                }}
                              >
                                (📏 Size Guide)
                              </button>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {['2.2', '2.4', '2.6', '2.8', '2.10'].map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSizeChange(item.id, size);
                                }}
                                style={{
                                  padding: '2px 7px',
                                  borderRadius: '6px',
                                  border: currentSize === size ? '1.5px solid #9E6B15' : '1px solid #E2D5CA',
                                  backgroundColor: currentSize === size ? '#FDF5E6' : '#FFFFFF',
                                  color: currentSize === size ? '#9E6B15' : '#7A6356',
                                  fontFamily: 'Jost, sans-serif',
                                  fontSize: '10.5px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div style={{ padding: '0 24px 24px', display: 'flex', gap: '10px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(item);
                        }}
                        style={{
                          flex: 1,
                          height: '42px',
                          borderRadius: '999px',
                          backgroundColor: isAdded ? '#25D366' : '#C0846A',
                          color: '#FFFFFF',
                          border: 'none',
                          fontFamily: 'Jost, sans-serif',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} />
                            <span>SHORTLIST</span>
                          </>
                        )}
                      </button>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid #E2D5CA',
                          color: '#25D366',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          flexShrink: 0,
                        }}
                        aria-label="Inquire on WhatsApp"
                      >
                        <MessageCircle size={18} />
                      </a>
                    </div>
                  </div>
                </BorderGlow>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      {activeModalItem && (
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
              maxWidth: '680px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2D5CA',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(30,22,16,0.18)',
            }}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                border: '1px solid #E2D5CA',
                color: '#1E1610',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                alignItems: 'center',
              }}
              className="collection-modal-grid"
            >
              <div style={{ width: '100%', aspectRatio: '1 / 1', backgroundColor: '#F0E4DC', overflow: 'hidden' }}>
                <img
                  src={activeModalItem.image_url}
                  alt={activeModalItem.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '32px 32px 32px 0' }}>
                <span
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#C0846A',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {activeModalItem.badge_label || activeModalItem.category.toUpperCase()}
                </span>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#1E1610',
                    lineHeight: 1.2,
                    marginBottom: '12px',
                  }}
                >
                  {activeModalItem.title}
                </h3>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.6, marginBottom: '20px' }}>
                  {activeModalItem.description || activeModalItem.subtitle}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => {
                      handleAdd(activeModalItem);
                      setActiveModalItem(null);
                    }}
                    style={{
                      height: '46px',
                      borderRadius: '999px',
                      backgroundColor: '#C0846A',
                      color: '#FFFFFF',
                      border: 'none',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <ShoppingBag size={15} />
                    <span>ADD TO SHORTLIST</span>
                  </button>

                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello Gold N Glow! I want to inquire about ${activeModalItem.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      height: '46px',
                      borderRadius: '999px',
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <MessageCircle size={15} />
                    <span>INQUIRE ON WHATSAPP</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .collection-card-wrapper {
          position: relative;
          border-radius: 16px;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.35s ease;
        }

        /* Desktop Only: Card scales up, highlights, and blooms gradual ambient blur */
        @media (min-width: 768px) {
          .collection-card-wrapper:hover {
            transform: scale(1.035) translateY(-4px) !important;
            z-index: 10;
          }
          .collection-card-wrapper:hover .border-glow-card {
            border-color: #C0846A !important;
            box-shadow: 0 20px 48px -10px rgba(192, 132, 106, 0.32), 0 0 28px 4px rgba(229, 196, 131, 0.35) !important;
          }
          .collection-card-wrapper:hover .collection-card-ambient-blur {
            opacity: 1 !important;
            transform: scale(1.08) !important;
          }
        }

        /* Mobile Only: No scaling/resizing, stable layout */
        @media (max-width: 767px) {
          .collection-card-wrapper {
            transform: none !important;
          }
          .collection-card-wrapper:hover {
            transform: none !important;
          }
        }

        @media (max-width: 1024px) {
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .collections-grid { grid-template-columns: 1fr !important; }
          .collection-modal-grid { grid-template-columns: 1fr !important; padding: 20px !important; }
        }
      `}</style>
    </div>
  );
};
