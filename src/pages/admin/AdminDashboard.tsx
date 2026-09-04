import React, { useState } from 'react';
import {
  Layers,
  MessageSquare,
  BookOpen,
  Image as ImageIcon,
  ArrowRight,
  RotateCcw,
  Check,
  Phone,
} from 'lucide-react';
import { AdminTab } from './AdminLayout';
import { CollectionItem, JournalPost, TestimonialItem, EnquiryItem, MediaAsset } from '../../lib/database.types';

interface AdminDashboardProps {
  onNavigate: (tab: AdminTab) => void;
  collections: CollectionItem[];
  posts: JournalPost[];
  testimonials: TestimonialItem[];
  enquiries: EnquiryItem[];
  mediaAssets: MediaAsset[];
  onResetDefaults: () => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  collections,
  posts,
  testimonials,
  enquiries,
  mediaAssets,
  onResetDefaults,
}) => {
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all content to pristine default states?')) return;
    setResetting(true);
    await onResetDefaults();
    setResetting(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  const metrics = [
    {
      tab: 'collections' as AdminTab,
      label: 'COLLECTIONS',
      title: 'Active Bangle Sets',
      count: collections.length,
      icon: <Layers size={20} />,
    },
    {
      tab: 'journal' as AdminTab,
      label: 'JOURNAL',
      title: 'Published Articles & Guides',
      count: posts.length,
      icon: <BookOpen size={20} />,
    },
    {
      tab: 'testimonials' as AdminTab,
      label: 'REVIEWS',
      title: 'Customer Reviews',
      count: testimonials.length,
      icon: <MessageSquare size={20} />,
    },
    {
      tab: 'media' as AdminTab,
      label: 'MEDIA',
      title: 'High-Res Bangle Assets',
      count: mediaAssets.length,
      icon: <ImageIcon size={20} />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* HEADER BAR */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #F2EBE5' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#C37871', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', display: 'block', marginBottom: '6px' }}>
            GOLD N GLOW STORE COMMAND CENTER
          </span>
          <h1 style={{ fontSize: '32px', fontFamily: 'Playfair Display, serif', color: '#2B2320', fontWeight: 500, margin: 0 }}>
            Store Content Management
          </h1>
          <p style={{ fontSize: '13px', color: '#6E635D', marginTop: '6px', maxWidth: '600px', lineHeight: 1.6 }}>
            Realtime database connected. Any changes made here reflect instantly across the public website.
          </p>
        </div>

        <button
          onClick={handleReset}
          disabled={resetting}
          className="btn-outline"
          style={{ fontSize: '12px', padding: '12px 24px', borderRadius: '10px' }}
        >
          {resetDone ? (
            <>
              <Check size={16} color="#2E7D32" />
              <span style={{ color: '#2E7D32' }}>Reset Done!</span>
            </>
          ) : (
            <>
              <RotateCcw size={16} className={resetting ? 'animate-spin' : ''} />
              <span>{resetting ? 'Resetting...' : 'Restore Defaults'}</span>
            </>
          )}
        </button>
      </div>

      {/* METRIC OVERVIEW CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
        {metrics.map((m) => (
          <div
            key={m.tab}
            onClick={() => onNavigate(m.tab)}
            style={{
              backgroundColor: '#FAF8F5',
              borderRadius: '20px',
              border: '1px solid #ECE2DA',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '150px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: '#C37871', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', display: 'inline-flex' }}>
                {m.icon}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A27068', backgroundColor: '#FAF3F0', padding: '4px 10px', borderRadius: '999px', border: '1px solid #E8D0C9' }}>
                {m.label}
              </span>
            </div>
            <div>
              <div style={{ fontSize: '34px', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#2B2320', lineHeight: 1, marginBottom: '6px' }}>
                {m.count}
              </div>
              <span style={{ fontSize: '12px', color: '#7A6F69', fontWeight: 500 }}>
                {m.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK SECTION MANAGEMENT SHORTCUTS */}
      <div>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontFamily: 'Playfair Display, serif', color: '#2B2320', fontWeight: 500, margin: 0 }}>
            Edit Website Sections
          </h2>
          <p style={{ fontSize: '12px', color: '#7A6F69', marginTop: '4px' }}>Select any module to modify live content and imagery</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            { tab: 'hero' as AdminTab, title: 'Hero Section', desc: 'Bangle showcase banner, headlines, and buttons' },
            { tab: 'collections' as AdminTab, title: 'Collections Strip & Sets', desc: 'Bangle cards, wrist sizes, and categories' },
            { tab: 'founder' as AdminTab, title: 'Founder Story & Bio', desc: 'Syed Owais Ahmed bio, quote, and portrait' },
            { tab: 'picks' as AdminTab, title: "Founder's Curated Picks", desc: 'Emerald, Bridal, and Diamond feature picks' },
            { tab: 'whyus' as AdminTab, title: 'Why Us & Promises', desc: '5 value pills and 4 store customer promises' },
            { tab: 'experience' as AdminTab, title: 'Store Experience', desc: 'Hyderabad showroom video tour & mosaic photos' },
            { tab: 'testimonials' as AdminTab, title: 'Customer Reviews', desc: '5-star reviews, customer quotes, and photos' },
            { tab: 'journal' as AdminTab, title: 'Journal Articles', desc: 'Care guides, sizing advice, and bridal tips' },
            { tab: 'store' as AdminTab, title: 'Store Settings & Timings', desc: 'WhatsApp number, phone, address, and hours' },
          ].map((s) => (
            <div
              key={s.tab}
              onClick={() => onNavigate(s.tab)}
              style={{
                padding: '20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #ECE2DA',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ paddingRight: '12px' }}>
                <h3 style={{ fontSize: '14px', fontFamily: 'Playfair Display, serif', fontWeight: 600, color: '#2B2320', margin: 0 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '11px', color: '#7A6F69', marginTop: '4px', margin: 0, lineHeight: 1.4 }}>
                  {s.desc}
                </p>
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FAF3F0', color: '#C37871', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOMER INQUIRIES & LEADS TABLE */}
      <div>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontFamily: 'Playfair Display, serif', color: '#2B2320', fontWeight: 500, margin: 0 }}>
            Recent Customer Inquiries ({enquiries.length})
          </h2>
          <p style={{ fontSize: '12px', color: '#7A6F69', marginTop: '4px' }}>Leads submitted from the Contact page and Catalogue Lookbook</p>
        </div>

        {enquiries.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#FAF8F5', borderRadius: '16px', border: '1px solid #ECE2DA', fontSize: '13px', color: '#7A6F69' }}>
            No customer inquiries yet. New inquiries submitted through the contact form or catalogue lookbook will appear here in real-time.
          </div>
        ) : (
          <div style={{ overflowX: 'auto', border: '1px solid #ECE2DA', borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <table style={{ width: '100%', textAlign: 'left', fontSize: '12px', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#FAF3F0', color: '#A27068', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}>
                <tr>
                  <th style={{ padding: '16px 20px' }}>Customer Name</th>
                  <th style={{ padding: '16px 20px' }}>Phone / WhatsApp</th>
                  <th style={{ padding: '16px 20px' }}>Interest</th>
                  <th style={{ padding: '16px 20px' }}>Message</th>
                  <th style={{ padding: '16px 20px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id} style={{ borderTop: '1px solid #F2EBE5' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600, color: '#2B2320' }}>{enq.name}</td>
                    <td style={{ padding: '16px 20px', color: '#C37871', fontWeight: 500 }}>
                      <a href={`tel:${enq.phone}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={13} /> {enq.phone}
                      </a>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', backgroundColor: '#FAF3F0', color: '#A27068', fontWeight: 700, fontSize: '9px', border: '1px solid #E8D0C9' }}>
                        {enq.interest || 'General'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#6E635D', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{enq.message || '—'}</td>
                    <td style={{ padding: '16px 20px', color: '#9B8E87' }}>{enq.created_at ? new Date(enq.created_at).toLocaleDateString() : 'Today'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
