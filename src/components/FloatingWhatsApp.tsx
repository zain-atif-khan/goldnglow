import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SiteSettings } from '../lib/database.types';

interface FloatingWhatsAppProps {
  settings: SiteSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Gold N Glow! I would like to inquire about your bangle collections.'
  )}`;

  return (
    <div
      className="hidden lg:flex"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 40,
        alignItems: 'center',
      }}
    >
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: 'clamp(46px, 6vw, 54px)',
          height: 'clamp(46px, 6vw, 54px)',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(37,211,102,0.4)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 26px rgba(37,211,102,0.5)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(37,211,102,0.4)';
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" />
      </a>
    </div>
  );
};
