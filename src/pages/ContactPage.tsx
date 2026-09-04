import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Send, Check } from 'lucide-react';
import { SiteSettings } from '../lib/database.types';
import { DataService } from '../lib/dataService';

interface ContactPageProps {
  settings: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Bridal Bangles');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    await DataService.submitEnquiry({
      name,
      phone,
      email,
      interest,
      message,
    });

    setSent(true);
  };

  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Gold N Glow! I would like to contact your Tolichowki boutique team.'
  )}`;

  return (
    <div style={{ width: '100%', background: 'linear-gradient(180deg, #FDF4F0 0%, #FAF3EC 40%, #F5EAE4 100%)', padding: '80px 0 96px' }}>
      <div className="container">
        {/* Page Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto 56px',
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
            WE WOULD LOVE TO ASSIST YOU
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
            Contact Gold N Glow
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
            Visit our boutique showroom in Tolichowki, Hyderabad or message us directly on WhatsApp for instant assistance.
          </p>
        </div>

        {/* 2-Columns: Contact Info & Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 7fr',
            gap: '40px',
            alignItems: 'start',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
          className="contact-grid"
        >
          {/* Left Column: Store Details */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2D5CA',
              padding: '36px',
              boxShadow: '0 4px 16px rgba(30,22,16,0.04)',
            }}
          >
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#1E1610',
                marginBottom: '24px',
              }}
            >
              Hyderabad Boutique Showroom
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#F7EEE8',
                    color: '#C0846A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #E2D5CA',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={17} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      marginBottom: '2px',
                    }}
                  >
                    ADDRESS
                  </h4>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.4 }}>
                    {settings.address_line1}
                  </p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.4 }}>
                    {settings.address_line2}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#F7EEE8',
                    color: '#C0846A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #E2D5CA',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={17} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      marginBottom: '2px',
                    }}
                  >
                    STORE HOURS
                  </h4>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356' }}>
                    {settings.store_timings}
                  </p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#C0846A', fontWeight: 600, marginTop: '2px' }}>
                    {settings.store_days}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#F7EEE8',
                    color: '#C0846A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #E2D5CA',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={17} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      marginBottom: '2px',
                    }}
                  >
                    PHONE SUPPORT
                  </h4>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#C0846A', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #E2D5CA' }}>
              <a
                href={whatsappLink}
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
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2D5CA',
              padding: '36px',
              boxShadow: '0 4px 16px rgba(30,22,16,0.04)',
            }}
          >
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#1E1610',
                marginBottom: '8px',
              }}
            >
              Send Concierge Inquiry
            </h3>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '13px',
                color: '#7A6356',
                marginBottom: '24px',
              }}
            >
              Fill out the details below and our team will get back to you with photos and pricing.
            </p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
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
                    border: '1px solid #E2D5CA',
                  }}
                >
                  <Check size={24} />
                </div>
                <h4
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#1E1610',
                    marginBottom: '6px',
                  }}
                >
                  Message Sent Successfully!
                </h4>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356' }}>
                  Our team will contact you shortly via WhatsApp or Phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      marginBottom: '6px',
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Siddiqua"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #E2D5CA',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '14px',
                      color: '#1E1610',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#1E1610',
                        marginBottom: '6px',
                      }}
                    >
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98490 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 16px',
                        borderRadius: '10px',
                        border: '1.5px solid #E2D5CA',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '14px',
                        color: '#1E1610',
                        outline: 'none',
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#1E1610',
                        marginBottom: '6px',
                      }}
                    >
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="ayesha@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 16px',
                        borderRadius: '10px',
                        border: '1.5px solid #E2D5CA',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '14px',
                        color: '#1E1610',
                        outline: 'none',
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      marginBottom: '6px',
                    }}
                  >
                    Bangle Interest
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #E2D5CA',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '14px',
                      color: '#1E1610',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Bridal Bangles">Bridal Bangles &amp; Churas</option>
                    <option value="Festive Jadau">Festive Jadau &amp; Navratan</option>
                    <option value="Daily Wear">Everyday &amp; Office Wear</option>
                    <option value="Antique Matte">Antique Matte Finish Kadas</option>
                    <option value="Custom Sizing">Custom Wrist Sizing Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1E1610',
                      marginBottom: '6px',
                    }}
                  >
                    Message / Special Requests
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your wedding date, lehenga colors, or wrist size..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #E2D5CA',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '14px',
                      color: '#1E1610',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      resize: 'vertical',
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-rose w-full justify-center"
                  style={{
                    height: '48px',
                    borderRadius: '5px',
                    fontSize: '11.5px',
                    letterSpacing: '0.14em',
                    gap: '8px',
                    marginTop: '6px',
                  }}
                >
                  <Send size={14} />
                  <span>SEND ENQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
};
