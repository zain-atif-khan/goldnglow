import React, { useState } from 'react';
import { Heart, ArrowRight, Award, MessageCircle, Palette, ShoppingBag, Check } from 'lucide-react';
import { SiteSettings, CollectionItem } from '../lib/database.types';
import { BorderGlow } from '../components/BorderGlow';
import { BangleDetailModal } from '../components/BangleDetailModal';

interface BridalPageProps {
  settings: SiteSettings;
  onOpenCatalogue: () => void;
  onOpenSizeGuide?: () => void;
  onAddToCart?: (item: CollectionItem, size?: string) => void;
}

export const BridalPage: React.FC<BridalPageProps> = ({
  settings,
  onOpenCatalogue,
  onOpenSizeGuide,
  onAddToCart,
}) => {
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Gold N Glow! I would like to book a VIP Bridal Consultation.'
  )}`;

  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [activeModalSet, setActiveModalSet] = useState<(typeof bridalSets)[0] | null>(null);
  const [addedSetIds, setAddedSetIds] = useState<Set<string>>(new Set());

  const handleAddToCartSet = (set: (typeof bridalSets)[0], e?: React.MouseEvent, size: string = '2.6') => {
    if (e) e.stopPropagation();
    const item: CollectionItem = {
      id: set.id,
      title: set.title,
      subtitle: set.desc,
      description: set.desc,
      category: 'bridal',
      material: (set.material === 'Lac' ? 'Lac' : set.material === 'Glass' ? 'Glass' : 'Lac & Glass') as any,
      image_url: set.image,
      badge_label: set.tag,
      display_order: 1,
      featured: true,
      active: true,
    };
    if (onAddToCart) {
      onAddToCart(item, size);
    }
    setAddedSetIds((prev) => new Set(prev).add(set.id));
    setTimeout(() => {
      setAddedSetIds((prev) => {
        const next = new Set(prev);
        next.delete(set.id);
        return next;
      });
    }, 2500);
  };

  const bridalSets = [
    {
      id: 'bridal-1',
      title: 'Royal Nizami Kundan & Polki Bridal Kada Suite',
      material: 'Lac',
      tag: 'BRIDAL LAC',
      desc: 'Openable broad bridal kada on handcrafted raw Lac resin with green onyx drops, intricate uncut polki stones, and antique gold finish.',
      image: '/assets/collections/kundan-bridal-kada.jpg',
    },
    {
      id: 'bridal-2',
      title: 'Grand Jadau Pearl Lac Chooda Suite',
      material: 'Lac',
      tag: 'BRIDAL LAC',
      desc: 'Magnificent 8-piece bridal Lac stack combining heavy floral kadas with cascaded seed pearl latkans.',
      image: '/assets/collections/jadau-openable.webp',
    },
    {
      id: 'bridal-3',
      title: 'Maharani Grand Lac & Glass Bridal Ensemble',
      material: 'Lac & Glass',
      tag: 'BRIDAL LAC & GLASS',
      desc: 'The definitive Deccani wedding suite: centerpiece handcrafted Lac kadas flanked by 24 rich festive velvet glass bangles.',
      image: '/assets/collections/bridal-heritage.webp',
    },
    {
      id: 'bridal-4',
      title: 'Shehnai Ruby & Emerald Temple Glass Suite',
      material: 'Glass',
      tag: 'BRIDAL GLASS',
      desc: 'A traditional Deccani bridal ensemble featuring ruby stones and deep green glass cabochon accents on fine artisan glass.',
      image: '/assets/collections/ruby-emerald-temple.jpg',
    },
    {
      id: 'bridal-5',
      title: 'Begum Jaan Basra Pearl & Polki Glass Set',
      material: 'Glass',
      tag: 'BRIDAL GLASS',
      desc: 'An ethereal pearl bridal suite with multi-row faux pearls and radiant floral kundan clusters bordered on royal glass rims.',
      image: '/assets/collections/pearl-bangles-set.jpg',
    },
    {
      id: 'bridal-6',
      title: 'Rajputana Royal Navratan Lac Bridal Kada Pair',
      material: 'Lac',
      tag: 'BRIDAL LAC',
      desc: 'Heavy openable Lac kadas encrusted with nine vibrant stones to complement colorful wedding attire.',
      image: '/assets/collections/navratan-gemstone.jpg',
    },
    {
      id: 'bridal-7',
      title: 'Noor Mahal Velvet Glass & Kundan Chooda',
      material: 'Glass',
      tag: 'BRIDAL GLASS',
      desc: 'Plush bridal maroon velvet glass bangles bordered with heavy antique gold-finish side kadas.',
      image: '/assets/collections/velvet-silk-thread.webp',
    },
    {
      id: 'bridal-8',
      title: 'Jodha Floral Carved Brass & Lac Bridal Kadas',
      material: 'Lac',
      tag: 'BRIDAL LAC',
      desc: 'Deep antique finish on reinforced Lac foundation with intricate openwork floral jaali and comfortable inner contouring.',
      image: '/assets/collections/antique-filigree.jpg',
    },
    {
      id: 'bridal-9',
      title: 'Gulzar Pink Tourmaline & Crystal Glass Bridal Stack',
      material: 'Glass',
      tag: 'BRIDAL GLASS',
      desc: 'Modern bridal elegance designed for pastel pink, ivory, and blush designer wedding lehengas.',
      image: '/assets/collections/pink-tourmaline-cz.jpg',
    },
    {
      id: 'bridal-10',
      title: 'Tolichowki Heritage Lac Bridal Box (12 Pairs)',
      material: 'Lac',
      tag: 'BRIDAL LAC',
      desc: 'Heritage red and turquoise handcrafted lac bangles with genuine mirror work from Tolichowki’s master artisans.',
      image: '/assets/collections/hyderabadi-lac.jpg',
    },
  ];

  const filteredSets = bridalSets.filter((s) => {
    if (selectedMaterial === 'all') return true;
    if (selectedMaterial === 'lac') return s.material === 'Lac' || s.material === 'Lac & Glass';
    if (selectedMaterial === 'glass') return s.material === 'Glass' || s.material === 'Lac & Glass';
    if (selectedMaterial === 'combo') return s.material === 'Lac & Glass';
    return true;
  });

  return (
    <div style={{ width: '100%', background: 'linear-gradient(180deg, #FDF4F0 0%, #FAF3EC 35%, #F5EAE4 70%, #F1E3DD 100%)' }}>
      {/* 1. Bridal Hero */}
      <section
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          borderBottom: '1px solid #E2D5CA',
          padding: '80px 0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'center',
            }}
            className="bridal-hero-grid"
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(36px, 4.5vw, 56px)',
                  fontWeight: 600,
                  lineHeight: 1.12,
                  color: '#120A06',
                  marginBottom: '16px',
                }}
              >
                The Heritage Bridal Bangle Trousseau
              </h1>

              <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, marginBottom: '20px' }} />

              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: '#7A6356',
                  marginBottom: '32px',
                }}
              >
                Passed down through generations of Hyderabadi brides. Every designer bridal set is personally curated by Syed Owais Ahmed, ensuring bespoke color matching, exquisite stone settings, and custom comfort fitting on your most cherished day.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-rose"
                  style={{
                    height: '48px',
                    padding: '0 28px',
                    borderRadius: '5px',
                    fontSize: '11.5px',
                    letterSpacing: '0.14em',
                    textDecoration: 'none',
                    gap: '8px',
                  }}
                >
                  <MessageCircle size={15} />
                  <span>BOOK VIP BRIDAL APPOINTMENT</span>
                </a>

                <button
                  onClick={onOpenCatalogue}
                  className="btn btn-outline"
                  style={{
                    height: '48px',
                    padding: '0 24px',
                    borderRadius: '5px',
                    fontSize: '11.5px',
                    letterSpacing: '0.14em',
                    gap: '8px',
                  }}
                >
                  <span>VIEW BRIDAL LOOKBOOK</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Image */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3.8',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #E2D5CA',
                  backgroundColor: '#F0E4DC',
                  boxShadow: '0 12px 36px rgba(30,22,16,0.1)',
                }}
              >
                <img
                  src="/assets/collections/kundan-bridal-kada.jpg"
                  alt="Royal Hyderabad Bridal Bangles"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bridal Sets Showcase (10 Sets) */}
      <section style={{ width: '100%', backgroundColor: '#FFFFFF', padding: '96px 0', borderBottom: '1px solid #E2D5CA' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 64px' }}>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 44px)',
                fontWeight: 500,
                color: '#1E1610',
                lineHeight: 1.2,
                marginBottom: '16px',
              }}
            >
              10 Signature Trousseau Suites
            </h2>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C0846A', opacity: 0.5, margin: '0 auto 16px' }} />
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', lineHeight: 1.7, color: '#7A6356' }}>
              Explore our handcrafted wedding suites categorized by material — from authentic <strong>Raw Lac Churas</strong> to regal <strong>Artisan Velvet Glass Stacks</strong>.
            </p>

            {/* Material Filter Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                marginTop: '32px',
              }}
            >
              {[
                { id: 'all', label: 'All Bridal Sets' },
                { id: 'lac', label: 'Bridal Handcrafted Lac' },
                { id: 'glass', label: 'Bridal Artisan Glass' },
                { id: 'combo', label: 'Hybrid Lac & Glass' },
              ].map((tab) => {
                const isActive = selectedMaterial === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedMaterial(tab.id)}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '5px',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      border: isActive ? '1.5px solid #1E1610' : '1.5px solid #E2D5CA',
                      backgroundColor: isActive ? '#1E1610' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#5C4A3E',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 4px 12px rgba(30,22,16,0.12)' : 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Sizing Guide Button */}
            {onOpenSizeGuide && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                <button
                  onClick={onOpenSizeGuide}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '9px 22px',
                    borderRadius: '5px',
                    backgroundColor: '#FAF0F2',
                    border: '1.5px solid #E8B4BE',
                    color: '#9E3345',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(158,51,69,0.1)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F5E2E6';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FAF0F2';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Bridal Wrist Fit &amp; Size Guide (2.2 – 2.10)</span>
                </button>
              </div>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '28px',
            }}
            className="bridal-sets-grid"
          >
            {filteredSets.map((set) => (
              <div
                key={set.id}
                className="bridal-card-wrapper"
                style={{
                  position: 'relative',
                  height: '100%',
                }}
              >
                {/* Gradual Ambient Blur Halo behind card on hover */}
                <div
                  className="bridal-card-ambient-blur"
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
                        className="bridal-card-img-wrap"
                        style={{
                          width: '100%',
                          aspectRatio: '4 / 3',
                          overflow: 'hidden',
                          backgroundColor: '#F0E4DC',
                          borderTopLeftRadius: '16px',
                          borderTopRightRadius: '16px',
                          cursor: 'pointer',
                        }}
                        onClick={() => setActiveModalSet(set)}
                      >
                        <img
                          src={set.image}
                          alt={set.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div className="bridal-card-body" style={{ padding: '24px 24px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontFamily: 'Jost, sans-serif',
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '0.18em',
                              textTransform: 'uppercase',
                              color: '#C0846A',
                            }}
                          >
                            {set.tag}
                          </span>
                          {set.material && (
                            <>
                              <span style={{ color: '#D5C7BC', fontSize: '10px' }}>•</span>
                              <span
                                className={
                                  set.material === 'Lac'
                                    ? 'type-editorial-tag type-editorial-tag-gold'
                                    : set.material === 'Glass'
                                    ? 'type-editorial-tag type-editorial-tag-muted'
                                    : 'type-editorial-tag type-editorial-tag-rose'
                                }
                              >
                                {set.material}
                              </span>
                            </>
                          )}
                        </div>
                        <h3
                          className="bridal-card-title"
                          style={{
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: '22px',
                            fontWeight: 600,
                            color: '#1E1610',
                            lineHeight: 1.25,
                            marginBottom: '8px',
                            cursor: 'pointer',
                          }}
                          onClick={() => setActiveModalSet(set)}
                        >
                          {set.title}
                        </h3>
                        <p className="bridal-card-desc" style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.6 }}>
                          {set.desc}
                        </p>
                      </div>
                    </div>

                    <div className="bridal-card-actions" style={{ padding: '0 20px 20px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => handleAddToCartSet(set, e)}
                        className={addedSetIds.has(set.id) ? "btn btn-whatsapp" : "btn btn-rose"}
                        style={{
                          flex: 1,
                          height: '40px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          letterSpacing: '0.12em',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        {addedSetIds.has(set.id) ? (
                          <>
                            <Check size={14} />
                            <span>ADDED ✓</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} />
                            <span>SHORTLIST</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello Gold N Glow! I am interested in inquiring about "${set.title}" (${set.tag}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
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
                        <MessageCircle size={16} />
                      </a>
                    </div>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Guarantees */}
      <section style={{ width: '100%', backgroundColor: 'transparent', padding: '64px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              textAlign: 'center',
            }}
            className="bridal-pillars-grid"
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '36px 28px',
                borderRadius: '16px',
                border: '1px solid #E2D5CA',
              }}
            >
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
                }}
              >
                <Palette size={20} strokeWidth={1.5} />
              </div>
              <h4 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', fontWeight: 600, color: '#1E1610', marginBottom: '8px' }}>
                Bespoke Color Customization
              </h4>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.6 }}>
                Match your exact bridal lehenga shades with our custom velvet, stone, and thread dyeing options.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '36px 28px',
                borderRadius: '16px',
                border: '1px solid #E2D5CA',
              }}
            >
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
                }}
              >
                <Award size={20} />
              </div>
              <h4 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', fontWeight: 600, color: '#1E1610', marginBottom: '8px' }}>
                Comfort-Lock Fit
              </h4>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.6 }}>
                Every bridal kada features smooth inner contouring and secure screw-locking for effortless all-night wear.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '36px 28px',
                borderRadius: '16px',
                border: '1px solid #E2D5CA',
              }}
            >
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
                }}
              >
                <Heart size={20} />
              </div>
              <h4 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', fontWeight: 600, color: '#1E1610', marginBottom: '8px' }}>
                VIP Tolichowki Styling
              </h4>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.6 }}>
                Enjoy dedicated one-on-one bridal appointments with Syed Owais Ahmed at our flagship showroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        .bridal-card-wrapper {
          position: relative;
          border-radius: 16px;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.35s ease;
        }

        /* Desktop Only: Card scales up, highlights, and blooms gradual ambient blur */
        @media (min-width: 768px) {
          .bridal-card-wrapper:hover {
            transform: scale(1.035) translateY(-4px) !important;
            z-index: 10;
          }
          .bridal-card-wrapper:hover .border-glow-card {
            border-color: #C0846A !important;
            box-shadow: 0 20px 48px -10px rgba(192, 132, 106, 0.32), 0 0 28px 4px rgba(229, 196, 131, 0.35) !important;
          }
          .bridal-card-wrapper:hover .bridal-card-ambient-blur {
            opacity: 1 !important;
            transform: scale(1.08) !important;
          }
        }

        /* Mobile Only: No scaling/resizing, stable layout */
        @media (max-width: 767px) {
          .bridal-card-wrapper {
            transform: none !important;
          }
          .bridal-card-wrapper:hover {
            transform: none !important;
          }
        }

        @media (max-width: 1024px) {
          .bridal-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .bridal-sets-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
          }
          .bridal-pillars-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
        }
        @media (max-width: 768px) {
          .container {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
          .bridal-sets-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }
          .bridal-card-img-wrap {
            aspect-ratio: 1 / 1 !important;
          }
          .bridal-card-body {
            padding: 12px 10px 8px !important;
          }
          .bridal-card-title {
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
          .bridal-card-desc {
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            font-size: 11px !important;
            line-height: 1.4 !important;
            margin-bottom: 6px !important;
            color: #7A6356 !important;
          }
          .bridal-card-actions {
            padding: 0 10px 12px !important;
          }
          .bridal-card-actions a {
            height: 36px !important;
            font-size: 9.5px !important;
            padding: 0 6px !important;
            letter-spacing: 0.04em !important;
            gap: 6px !important;
          }
          .bridal-pillars-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }
          .bridal-pillars-grid > div {
            padding: 16px 10px !important;
          }
        }
      `}</style>

      {/* Product Detail Modal */}
      <BangleDetailModal
        isOpen={!!activeModalSet}
        onClose={() => setActiveModalSet(null)}
        item={
          activeModalSet
            ? {
                id: activeModalSet.id,
                title: activeModalSet.title,
                description: activeModalSet.desc,
                image: activeModalSet.image,
                tag: activeModalSet.tag,
                material: activeModalSet.material,
              }
            : null
        }
        onAddToCart={(modalItem, size) => {
          if (activeModalSet) {
            handleAddToCartSet(activeModalSet, undefined, size);
            setActiveModalSet(null);
          }
        }}
        onOpenSizeGuide={onOpenSizeGuide}
        whatsapp={settings.whatsapp}
        isAdded={activeModalSet ? addedSetIds.has(activeModalSet.id) : false}
      />
    </div>
  );
};
