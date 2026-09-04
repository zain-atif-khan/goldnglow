import React, { useState } from 'react';
import { Sparkles, Save, Check } from 'lucide-react';
import { HeroContent } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';
import { ImageUploadWidget } from './ImageUploadWidget';

interface AdminHeroProps {
  initialContent: HeroContent;
  onSaved: () => void;
}

export const AdminHero: React.FC<AdminHeroProps> = ({
  initialContent,
  onSaved,
}) => {
  const [form, setForm] = useState<HeroContent>({ ...initialContent });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await DataService.updateHeroContent(form);
      setSavedSuccess(true);
      onSaved();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving hero content:', err);
      alert('Failed to save hero content.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C0846A', display: 'block', marginBottom: '4px' }}>
            HOMEPAGE CMS
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            01. Hero Section Management
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', marginTop: '4px', margin: 0 }}>
            Customize the main banner headline, dual-tone typography, descriptions, and background visuals.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #EDE4DC',
          boxShadow: '0 4px 20px rgba(45, 30, 20, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Top Tag */}
        <div>
          <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
            Top Badge / Tag Text
          </label>
          <input
            type="text"
            value={form.badge_text}
            onChange={(e) => setForm({ ...form, badge_text: e.target.value })}
            style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Headings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              Heading Line 1 (Dark Serif)
            </label>
            <input
              type="text"
              value={form.heading_line1}
              onChange={(e) => setForm({ ...form, heading_line1: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              Heading Line 2 (Blush Italics)
            </label>
            <input
              type="text"
              value={form.heading_line2}
              onChange={(e) => setForm({ ...form, heading_line2: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
            Hero Supporting Description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
          />
        </div>

        {/* Image Upload Widget */}
        <div style={{ paddingTop: '8px', borderTop: '1px solid #EDE4DC' }}>
          <ImageUploadWidget
            currentImageUrl={form.image_url}
            onImageUploaded={(url) => setForm({ ...form, image_url: url })}
            label="Hero Showcase Main Visual"
            category="hero"
          />
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '14px', paddingTop: '16px', borderTop: '1px solid #EDE4DC' }}>
          {savedSuccess && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2E7D32', fontSize: '13px', fontWeight: 600 }}>
              <Check size={16} /> Saved Live to Site!
            </span>
          )}
          <button
            type="submit"
            disabled={isSaving}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0 28px',
              height: '46px',
              borderRadius: '6px',
              backgroundColor: '#C0846A',
              color: '#FFFFFF',
              fontFamily: 'Jost, sans-serif',
              fontSize: '11.5px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(192, 132, 106, 0.25)',
              transition: 'background-color 0.2s ease',
            }}
          >
            <Save size={15} />
            <span>{isSaving ? 'Saving Changes...' : 'Save Hero Content'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
