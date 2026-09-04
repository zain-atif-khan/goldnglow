import React from 'react';

/* ─── Rosette / Ornament ─────────────────────────────── */
export const RosetteIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 14,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`inline-block ${className}`}
    style={{ verticalAlign: 'middle' }}
    aria-hidden="true"
  >
    <path d="M12 2C12.5 4.5 14 6 16.5 6.5C14 7 12.5 8.5 12 11C11.5 8.5 10 7 7.5 6.5C10 6 11.5 4.5 12 2Z" />
    <path d="M12 13C12.5 15.5 14 17 16.5 17.5C14 18 12.5 19.5 12 22C11.5 19.5 10 18 7.5 17.5C10 17 11.5 15.5 12 13Z" />
    <path d="M2 12C4.5 11.5 6 10 6.5 7.5C7 10 8.5 11.5 11 12C8.5 12.5 7 14 6.5 16.5C6 14 4.5 12.5 2 12Z" />
    <path d="M13 12C15.5 11.5 17 10 17.5 7.5C18 10 19.5 11.5 22 12C19.5 12.5 18 14 17.5 16.5C17 14 15.5 12.5 13 12Z" />
    <circle cx="12" cy="12" r="1.8" />
  </svg>
);

/* ─── Social Icons ───────────────────────────────────── */
export const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const FacebookIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const YoutubeIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

/* ─── Gold N Glow Exact Logo (Emblem + Typography Lockup) ─── */
export const GoldNGlowEmblemMark: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => (
  <div
    className={`relative flex items-center justify-center flex-shrink-0 ${className}`}
    style={{ width: size, height: size }}
  >
    <svg
      viewBox="0 0 120 120"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gng-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B37B1E" />
          <stop offset="50%" stopColor="#87570E" />
          <stop offset="100%" stopColor="#5E3905" />
        </linearGradient>
        <linearGradient id="gng-rose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B53A4D" />
          <stop offset="55%" stopColor="#8E2838" />
          <stop offset="100%" stopColor="#681825" />
        </linearGradient>
        <radialGradient id="gng-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E8D8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FAF1E8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle radial center backing */}
      <circle cx="60" cy="60" r="46" fill="url(#gng-center-glow)" />

      {/* Outer 8-pointed / 16-faceted geometric star mandala wireframe */}
      {/* 0° Square - Deep Gold */}
      <rect
        x="21"
        y="21"
        width="78"
        height="78"
        stroke="url(#gng-gold-grad)"
        strokeWidth="1.4"
        transform="rotate(0 60 60)"
      />
      {/* 45° Square - Deep Rose */}
      <rect
        x="21"
        y="21"
        width="78"
        height="78"
        stroke="url(#gng-rose-grad)"
        strokeWidth="1.4"
        transform="rotate(45 60 60)"
      />
      {/* Intersecting secondary facet squares at 22.5° and 67.5° */}
      <rect
        x="23.5"
        y="23.5"
        width="73"
        height="73"
        stroke="#9E6B15"
        strokeWidth="0.95"
        strokeOpacity="0.85"
        transform="rotate(22.5 60 60)"
      />
      <rect
        x="23.5"
        y="23.5"
        width="73"
        height="73"
        stroke="#9E3345"
        strokeWidth="0.95"
        strokeOpacity="0.85"
        transform="rotate(67.5 60 60)"
      />

      {/* Outer petal vertex facets */}
      <path
        d="M60 5 L76 21 L60 33 L44 21 Z"
        stroke="url(#gng-gold-grad)"
        strokeWidth="1.2"
      />
      <path
        d="M60 115 L76 99 L60 87 L44 99 Z"
        stroke="url(#gng-gold-grad)"
        strokeWidth="1.2"
      />
      <path
        d="M5 60 L21 76 L33 60 L21 44 Z"
        stroke="url(#gng-rose-grad)"
        strokeWidth="1.2"
      />
      <path
        d="M115 60 L99 76 L87 60 L99 44 Z"
        stroke="url(#gng-rose-grad)"
        strokeWidth="1.2"
      />

      {/* Diagonal corner vertex facets */}
      <path
        d="M21.1 21.1 L37 23 L33 39 L19 33 Z"
        stroke="url(#gng-gold-grad)"
        strokeWidth="1"
      />
      <path
        d="M98.9 21.1 L83 23 L87 39 L101 33 Z"
        stroke="url(#gng-rose-grad)"
        strokeWidth="1"
      />
      <path
        d="M21.1 98.9 L37 97 L33 81 L19 87 Z"
        stroke="url(#gng-rose-grad)"
        strokeWidth="1"
      />
      <path
        d="M98.9 98.9 L83 97 L87 81 L101 87 Z"
        stroke="url(#gng-gold-grad)"
        strokeWidth="1"
      />

      {/* Concentric inner circles enclosing the lettermark */}
      <circle cx="60" cy="60" r="27.5" stroke="url(#gng-gold-grad)" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="24.5" stroke="url(#gng-rose-grad)" strokeWidth="0.9" strokeDasharray="2 1.5" />

      {/* Center 'G' Serif Lettermark with Deep Gold tone */}
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="'Cinzel', 'Cormorant Garamond', Georgia, serif"
        fontSize="34"
        fontWeight="800"
        fill="url(#gng-gold-grad)"
        filter="drop-shadow(0 1px 1px rgba(94, 57, 5, 0.4))"
      >
        G
      </text>
    </svg>
  </div>
);

export const GoldNGlowLogo: React.FC<{
  className?: string;
  variant?: 'full' | 'emblem';
  size?: number;
}> = ({ className = '', variant = 'full', size = 46 }) => {
  if (variant === 'emblem') {
    return <GoldNGlowEmblemMark size={size} className={className} />;
  }

  return (
    <div
      className={`gold-n-glow-logo-wrap flex items-center gap-2 lg:gap-3.5 ${className}`}
      style={{ flexShrink: 0 }}
    >
      {/* Emblem mark */}
      <div className="logo-emblem-wrap" style={{ flexShrink: 0 }}>
        <GoldNGlowEmblemMark size={size} />
      </div>

      {/* Brand typography lockup with Deep Gold, Wine Script N, and Deep Rose Gold GLOW */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', lineHeight: 1 }}>
        <div
          className="logo-title-row"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
            lineHeight: 1.05,
          }}
        >
          {/* GOLD in Luxury Serif */}
          <span
            className="logo-gold-text"
            style={{
              fontFamily: "'Cinzel', 'Marcellus', Georgia, serif",
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#9E6B15',
            }}
          >
            GOLD
          </span>

          {/* n in Calligraphy Script */}
          <span
            className="logo-n-text"
            style={{
              fontFamily: "'Alex Brush', 'Pinyon Script', 'Caveat', cursive",
              fontSize: '22px',
              fontWeight: 400,
              color: '#B83A4E',
              lineHeight: 0.8,
              padding: '0 2px',
            }}
          >
            n
          </span>

          {/* GLOW in Deep Rose Gold Display Serif */}
          <span
            className="logo-glow-text"
            style={{
              fontFamily: "'Playfair Display', 'Bodoni Moda', serif",
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#8A2E20',
            }}
          >
            GLOW
          </span>
        </div>

        <span
          className="logo-sub-text"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '8px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#4A3428',
            lineHeight: 1.2,
          }}
        >
          TIMELESS BEAUTY, TRUSTED SINCE 2002
        </span>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .logo-emblem-wrap svg {
            width: 30px !important;
            height: 30px !important;
          }
          .logo-gold-text {
            font-size: 14px !important;
          }
          .logo-n-text {
            font-size: 17px !important;
          }
          .logo-glow-text {
            font-size: 14px !important;
          }
          .logo-sub-text {
            font-size: 6.5px !important;
            letter-spacing: 0.1em !important;
          }
        }
      `}</style>
    </div>
  );
};

/* ─── WhatsApp Icon ──────────────────────────────────── */
export const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);
