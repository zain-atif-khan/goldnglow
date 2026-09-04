import React, { useState } from 'react';
import { Settings, Save, Check } from 'lucide-react';
import { SiteSettings } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';

interface AdminStoreSettingsProps {
  settings: SiteSettings;
  onSaved: () => void;
}

export const AdminStoreSettings: React.FC<AdminStoreSettingsProps> = ({
  settings,
  onSaved,
}) => {
  const [form, setForm] = useState<SiteSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await DataService.updateSiteSettings(form);
      setSavedSuccess(true);
      onSaved();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating store settings:', err);
      alert('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C0846A', display: 'block', marginBottom: '4px' }}>
            STORE INFORMATION &amp; CONTACT
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            Store Details, WhatsApp &amp; Social Links
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', marginTop: '4px', margin: 0 }}>
            Configure phone, WhatsApp direct ordering link, showroom timings, address, and Google Maps.
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
        {/* Brand Name & Tagline */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              Brand Name
            </label>
            <input
              type="text"
              value={form.brand_name}
              onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              Brand Tagline
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Contact Numbers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              Display Phone Number
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              WhatsApp Number (with Country Code)
            </label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Store Timings & Address */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              Store Timings
            </label>
            <input
              type="text"
              value={form.store_timings}
              onChange={(e) => setForm({ ...form, store_timings: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              Working Days
            </label>
            <input
              type="text"
              value={form.store_days}
              onChange={(e) => setForm({ ...form, store_days: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              Address Line 1
            </label>
            <input
              type="text"
              value={form.address_line1}
              onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
              Address Line 2 (City &amp; Pincode)
            </label>
            <input
              type="text"
              value={form.address_line2}
              onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
              style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Google Maps & Social Links */}
        <div>
          <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '8px' }}>
            Google Maps Link
          </label>
          <input
            type="text"
            value={form.google_maps_url}
            onChange={(e) => setForm({ ...form, google_maps_url: e.target.value })}
            style={{ width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1.5px solid #EDE4DC', backgroundColor: '#FAF8F5', color: '#1E1610', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
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
            <span>{isSaving ? 'Saving Changes...' : 'Save Store Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
