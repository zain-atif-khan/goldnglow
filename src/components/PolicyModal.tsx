import React from 'react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  title: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ title, onClose }) => {
  if (!title) return null;

  const getContent = () => {
    switch (title) {
      case 'Complete Bangle Sizing Guide':
      case 'Wrist Sizing & Measurement Guide':
      case 'Size Guide':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.7 }}>
            <p>To measure your correct bangle size at home:</p>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Close your fingers together</strong> as if you are slipping on a bangle (bring thumb towards your pinky).</li>
              <li><strong>Take a flexible measuring tape</strong> or string and wrap it around the widest point of your hand (across the knuckles and thumb base).</li>
              <li><strong>Check the circumference measurement</strong> in inches and compare with standard Indian sizes:
                <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Size 2.2 = 6.75 inches inner circumference</li>
                  <li>Size 2.4 = 7.00 inches inner circumference</li>
                  <li>Size 2.6 = 7.50 inches inner circumference</li>
                  <li>Size 2.8 = 8.00 inches inner circumference</li>
                  <li>Size 2.10 = 8.50 inches inner circumference</li>
                </ul>
              </li>
            </ol>
            <p>Our Tolichowki showroom specialists can also provide bespoke size alterations for screw-lock kadas and openable cuffs.</p>
          </div>
        );

      case 'Frequently Asked Questions':
      case 'FAQs':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Jost, sans-serif' }}>
            <div style={{ padding: '16px', backgroundColor: '#F7EEE8', borderRadius: '12px', border: '1px solid #E2D5CA' }}>
              <h5 style={{ fontWeight: 700, color: '#1E1610', fontSize: '14px', marginBottom: '4px' }}>What types of bangles do you specialize in?</h5>
              <p style={{ fontSize: '13px', color: '#7A6356', lineHeight: 1.6 }}>We specialize in handcrafted bridal kadas, uncut polki jadau sets, cubic zirconia pavé, antique temple-finish stacks, velvet bangles, and everyday designer pieces.</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#F7EEE8', borderRadius: '12px', border: '1px solid #E2D5CA' }}>
              <h5 style={{ fontWeight: 700, color: '#1E1610', fontSize: '14px', marginBottom: '4px' }}>Do you offer custom designs and bridal sizing?</h5>
              <p style={{ fontSize: '13px', color: '#7A6356', lineHeight: 1.6 }}>Yes! Our stylists can customize bangle stack combinations, color themes to match your wedding lehenga, and custom inner oval/round fits.</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#F7EEE8', borderRadius: '12px', border: '1px solid #E2D5CA' }}>
              <h5 style={{ fontWeight: 700, color: '#1E1610', fontSize: '14px', marginBottom: '4px' }}>Can I book a video consultation before visiting?</h5>
              <p style={{ fontSize: '13px', color: '#7A6356', lineHeight: 1.6 }}>Absolutely. Message us on WhatsApp (+91 98490 12345) to schedule a live video showcase with our founder or jewellery stylist.</p>
            </div>
          </div>
        );

      case 'Shipping & Insured Delivery':
      case 'Shipping & Delivery':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.7 }}>
            <p>We provide secure pan-India express courier delivery and international tracked shipping.</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Local Hyderabad Delivery:</strong> Same-day secure courier or private store pickup.</li>
              <li><strong>Pan-India:</strong> 2 to 4 business days via express insured logistics.</li>
              <li><strong>Packaging:</strong> Tamper-proof luxury signature velvet gift boxes with tracking IDs.</li>
            </ul>
          </div>
        );

      case 'Care Instructions':
      case 'Jewellery Care Instructions':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.7 }}>
            <p>Maintain your designer bangles’ brilliant luster with these simple practices:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Keep away from direct perfumes, hairsprays, water, and harsh chemicals.</li>
              <li>Store each pair individually in soft velvet rolls or airtight cushioned pouches to prevent surface abrasions.</li>
              <li>Gently wipe with a clean microfibre cloth after each wear.</li>
            </ul>
          </div>
        );

      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.7 }}>
            <p>Gold N Glow is committed to providing outstanding curation, transparent pricing, and the highest standards of customer service.</p>
            <p>For inquiries regarding our products or custom orders, please contact us at concierge@goldnglow.in or visit our Tolichowki, Hyderabad store.</p>
          </div>
        );
    }
  };

  return (
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
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2D5CA',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(30,22,16,0.18)',
        }}
      >
        <div
          style={{
            backgroundColor: '#F7EEE8',
            padding: '24px 28px',
            borderBottom: '1px solid #E2D5CA',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
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
            }}
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>

          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C0846A',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            GOLD N GLOW INFORMATION
          </span>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '22px',
              fontWeight: 600,
              color: '#1E1610',
            }}
          >
            {title}
          </h3>
        </div>

        <div style={{ padding: '28px' }}>
          {getContent()}
        </div>
      </div>
    </div>
  );
};
