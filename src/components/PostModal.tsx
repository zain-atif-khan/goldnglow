import React from 'react';
import { X, Calendar, User, ArrowLeft, MessageCircle } from 'lucide-react';
import { JournalPost, SiteSettings } from '../lib/database.types';

interface PostModalProps {
  post: JournalPost | null;
  onClose: () => void;
  settings: SiteSettings;
}

export const PostModal: React.FC<PostModalProps> = ({ post, onClose, settings }) => {
  if (!post) return null;

  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Gold N Glow! I read your article "${post.title}" and would like to ask some questions.`
  )}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(30,22,16,0.65)',
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
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2D5CA',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(30,22,16,0.18)',
        }}
      >
        {/* Header Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', backgroundColor: '#F0E4DC', overflow: 'hidden' }}>
          <img
            src={post.cover_image_url}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(30,22,16,0.85) 0%, rgba(30,22,16,0.2) 60%, transparent 100%)',
            }}
          />

          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10,
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(4px)',
              border: '1px solid #E2D5CA',
              color: '#1E1610',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>

          <div style={{ position: 'absolute', bottom: '24px', left: '28px', right: '28px', color: '#FFFFFF' }}>
            <span
              className="type-editorial-tag"
              style={{
                color: '#FFFFFF !important',
                fontSize: '10px',
                letterSpacing: '0.22em',
                marginBottom: '8px',
                display: 'inline-block',
              }}
            >
              {post.category}
            </span>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '26px',
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#FFFFFF',
              }}
            >
              {post.title}
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '10px',
                fontFamily: 'Jost, sans-serif',
                fontSize: '12px',
                color: '#E0C8B8',
              }}
            >
              <span>{post.author || 'Syed Owais Ahmed'}</span>
              <span>•</span>
              <span>{post.published_date || 'January 2025'}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px 28px' }}>
          <div
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '14.5px',
              lineHeight: 1.8,
              color: '#3B2921',
              whiteSpace: 'pre-line',
            }}
          >
            {post.content}
          </div>

          <div
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid #E2D5CA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <button
              onClick={onClose}
              className="btn btn-outline"
              style={{
                height: '42px',
                padding: '0 20px',
                borderRadius: '5px',
                fontSize: '11px',
                letterSpacing: '0.1em',
                gap: '6px',
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Articles</span>
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{
                height: '42px',
                padding: '0 20px',
                borderRadius: '5px',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                gap: '6px',
              }}
            >
              <MessageCircle size={15} />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
