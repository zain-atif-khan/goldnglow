import React, { useState } from 'react';
import { CollectionItem } from '../lib/database.types';
import { ShoppingBag, MessageCircle, Check, X } from 'lucide-react';
import { BorderGlow } from '../components/BorderGlow';
import { BangleDetailModal } from '../components/BangleDetailModal';

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
  ];

  const filtered = collections.filter((c) => {
    if (!c.active) return false;
    // Exclude bridal items from collections page (they belong to dedicated bridal page)
    if (c.category === 'bridal') return false;
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'lac') return c.category === 'lac' || c.material === 'Lac';
    if (selectedCategory === 'glass') return c.category === 'glass' || c.material === 'Glass';
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
            Explore Hyderabad's premier showcase of authentic <strong>Handcrafted Lac</strong> and <strong>Artisan Glass</strong> bangles, created with timeless Tolichowki craftsmanship.
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
                  borderRadius: '5px',
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
                borderRadius: '5px',
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
              <span>Need Help Finding Your Size? Open Indian Wrist Sizing Guide (2.2 – 2.10)</span>
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
                        className="collection-card-img-wrap"
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
                      <div className="collection-card-body" style={{ padding: '24px 24px 16px' }}>
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
                            {item.badge_label || (item.category === 'lac' ? 'HANDCRAFTED LAC' : item.category === 'glass' ? 'ARTISAN GLASS' : 'BRIDAL SET')}
                          </span>
                          {item.material && (
                            <>
                              <span style={{ color: '#D5C7BC', fontSize: '10px' }}>•</span>
                              <span
                                className={
                                  item.material === 'Lac'
                                    ? 'type-editorial-tag type-editorial-tag-gold'
                                    : item.material === 'Glass'
                                    ? 'type-editorial-tag type-editorial-tag-muted'
                                    : 'type-editorial-tag type-editorial-tag-rose'
                                }
                              >
                                {item.material}
                              </span>
                            </>
                          )}
                        </div>

                        <h3
                          className="collection-card-title"
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
                            fontSize: '12.5px',
                            color: '#7A6356',
                            lineHeight: 1.5,
                            marginBottom: '16px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                          className="collection-card-desc"
                        >
                          {item.description || item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="collection-card-actions" style={{ padding: '0 24px 24px', display: 'flex', gap: '10px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(item);
                        }}
                        className={isAdded ? "btn btn-whatsapp" : "btn btn-rose"}
                        style={{
                          flex: 1,
                          height: '42px',
                          borderRadius: '5px',
                          fontSize: '11px',
                          letterSpacing: '0.12em',
                          gap: '6px',
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
                        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello Gold N Glow! I am interested in ${item.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '5px',
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid #E2D5CA',
                          color: '#25D366',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          flexShrink: 0,
                        }}
                        title="Inquire on WhatsApp"
                      >
                        <MessageCircle size={17} />
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
      <BangleDetailModal
        isOpen={!!activeModalItem}
        onClose={() => setActiveModalItem(null)}
        item={
          activeModalItem
            ? {
                id: activeModalItem.id,
                title: activeModalItem.title,
                description: activeModalItem.description || activeModalItem.subtitle,
                image: activeModalItem.image_url,
                tag:
                  activeModalItem.badge_label ||
                  (activeModalItem.category === 'lac'
                    ? 'HANDCRAFTED LAC'
                    : activeModalItem.category === 'glass'
                    ? 'ARTISAN GLASS'
                    : 'BRIDAL SET'),
                material: activeModalItem.material,
              }
            : null
        }
        onAddToCart={(modalItem, size) => {
          if (activeModalItem) {
            onAddToCart(activeModalItem, size || '2.6');
            setAddedItem(activeModalItem.id);
            setTimeout(() => setAddedItem(null), 2000);
            setActiveModalItem(null);
          }
        }}
        onOpenSizeGuide={onOpenSizeGuide}
        whatsapp={whatsapp}
        isAdded={activeModalItem ? addedItem === activeModalItem.id : false}
      />

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
          .collections-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 14px !important; }
        }
        @media (max-width: 768px) {
          .container {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
          .collections-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }
          .collection-card-img-wrap {
            aspect-ratio: 1 / 1 !important;
          }
          .collection-card-body {
            padding: 12px 10px 8px !important;
          }
          .collection-card-title {
            font-size: 14.5px !important;
            line-height: 1.25 !important;
            font-weight: 600 !important;
            margin-bottom: 4px !important;
            word-break: break-word !important;
            overflow: hidden !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
          }
          .collection-card-desc {
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            font-size: 11px !important;
            line-height: 1.4 !important;
            margin-bottom: 6px !important;
            color: #7A6356 !important;
          }
          .collection-card-actions {
            padding: 0 10px 12px !important;
            gap: 6px !important;
          }
          .collection-card-actions button {
            height: 36px !important;
            font-size: 9.5px !important;
            letter-spacing: 0.04em !important;
            padding: 0 6px !important;
          }
          .collection-card-actions a {
            width: 36px !important;
            height: 36px !important;
            flex-shrink: 0 !important;
          }
          .collection-modal-grid { grid-template-columns: 1fr !important; padding: 20px !important; }
        }
      `}</style>
    </div>
  );
};
