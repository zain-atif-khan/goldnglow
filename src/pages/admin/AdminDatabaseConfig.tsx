import React, { useState } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Globe, Key, Save, Copy } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { saveSupabaseConfig, getStoredSupabaseConfig } from '../../lib/supabase';

export const AdminDatabaseConfig: React.FC = () => {
  const currentConfig = getStoredSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url || '');
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey || '');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [sqlCopied, setSqlCopied] = useState(false);

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      if (!url.trim() || !anonKey.trim()) {
        setTestResult({
          success: false,
          message: 'Please enter both the Supabase Project URL and Anon/Public Key.',
        });
        return;
      }
      const testClient = createClient(url.trim(), anonKey.trim());
      const { error } = await testClient.from('site_settings').select('*').limit(1);
      if (!error) {
        setTestResult({
          success: true,
          message: 'Connection successful! Supabase PostgreSQL database is responsive and live.',
        });
      } else {
        setTestResult({
          success: false,
          message: `Connection note: ${error.message || 'Connected to client, please ensure database tables are created with the SQL snippet below.'}`,
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Error: ${err.message || 'Unable to connect to Supabase.'}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    saveSupabaseConfig({ url: url.trim(), anonKey: anonKey.trim() });
    alert('Supabase credentials saved successfully! Reloading connection...');
    window.location.reload();
  };

  const copySql = () => {
    const sqlScript = `-- Run this in your Supabase SQL Editor:
-- See the complete supabase_schema.sql in the root repository.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER PUBLICATION supabase_realtime ADD TABLE 
  public.site_settings,
  public.hero_sections,
  public.collections,
  public.founder_content,
  public.founder_picks,
  public.why_us_items,
  public.experience_content,
  public.testimonials,
  public.journal_posts,
  public.media_assets;
`;
    navigator.clipboard.writeText(sqlScript);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C0846A', display: 'block', marginBottom: '4px' }}>
            BACKEND &amp; REALTIME SYNC
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            Supabase PostgreSQL, Storage &amp; Realtime Config
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', marginTop: '4px', margin: 0 }}>
            Connect your live Supabase cloud database to enable instant multi-admin sync and cloud asset storage.
          </p>
        </div>
      </div>

      {/* Main Settings Card */}
      <div
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
        {/* Status Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingBottom: '18px', borderBottom: '1px solid #F0E6DE' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#FAF6F3', border: '1px solid #EDE4DC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0846A' }}>
              <Database size={20} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                CURRENT ENGINE STATUS
              </div>
              <div style={{ fontSize: '12.5px', color: '#7A6356', marginTop: '2px' }}>
                Operating in High-Performance Local-First Sync Engine (Offline / Instant)
              </div>
            </div>
          </div>

          <span style={{ padding: '6px 14px', borderRadius: '999px', backgroundColor: '#F6FFED', border: '1px solid #B7EB8F', color: '#389E0D', fontSize: '11.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#52C41A' }} />
            Active &amp; Responsive
          </span>
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
              Supabase Project URL (e.g. https://xyzcompany.supabase.co)
            </label>
            <div style={{ position: 'relative' }}>
              <Globe size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#A27068', pointerEvents: 'none' }} />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                style={{
                  width: '100%',
                  height: '46px',
                  padding: '0 16px 0 44px',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '13.5px',
                  color: '#1E1610',
                  backgroundColor: '#FAF8F5',
                  border: '1.5px solid #EDE4DC',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
              Supabase Anon / Public Key (eyJhbGciOi...)
            </label>
            <div style={{ position: 'relative' }}>
              <Key size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#A27068', pointerEvents: 'none' }} />
              <input
                type="password"
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOi..."
                style={{
                  width: '100%',
                  height: '46px',
                  padding: '0 16px 0 44px',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '13.5px',
                  color: '#1E1610',
                  backgroundColor: '#FAF8F5',
                  border: '1.5px solid #EDE4DC',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {testResult && (
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '8px',
                border: `1px solid ${testResult.success ? '#B7EB8F' : '#FFA39E'}`,
                backgroundColor: testResult.success ? '#F6FFED' : '#FFF1F0',
                color: testResult.success ? '#389E0D' : '#CF1322',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {testResult.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{testResult.message}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '14px', paddingTop: '16px', borderTop: '1px solid #EDE4DC' }}>
            <button
              type="button"
              onClick={handleTest}
              disabled={isTesting}
              style={{
                padding: '0 24px',
                height: '44px',
                borderRadius: '8px',
                border: '1.5px solid #EDE4DC',
                backgroundColor: '#FFFFFF',
                color: '#5C4A3E',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {isTesting ? 'Testing Connection...' : 'Test Connection'}
            </button>

            <button
              type="button"
              onClick={handleSave}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 28px',
                height: '44px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#C0846A',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(192, 132, 106, 0.25)',
              }}
            >
              <Save size={15} />
              <span>Save &amp; Connect Live</span>
            </button>
          </div>
        </div>
      </div>

      {/* SQL Setup Helper */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #EDE4DC',
          boxShadow: '0 4px 20px rgba(45, 30, 20, 0.03)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            Database Schema &amp; SQL Migrations
          </h3>
          <button
            type="button"
            onClick={copySql}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              color: sqlCopied ? '#2E7D32' : '#C0846A',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <Copy size={14} />
            <span>{sqlCopied ? 'Copied SQL!' : 'Copy DDL Snippet'}</span>
          </button>
        </div>

        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#7A6356', margin: '0 0 12px' }}>
          The full PostgreSQL script with all 10 tables, Row Level Security policies, storage bucket rules, and realtime replication is located in <code style={{ backgroundColor: '#FAF6F3', padding: '2px 6px', borderRadius: '4px', border: '1px solid #EDE4DC' }}>supabase_schema.sql</code>.
        </p>

        <pre
          style={{
            backgroundColor: '#FAF8F5',
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid #EDE4DC',
            fontSize: '11.5px',
            fontFamily: 'monospace',
            color: '#3A2E28',
            overflowX: 'auto',
            lineHeight: 1.5,
          }}
        >
{`-- Run this in your Supabase SQL Editor:
-- See the complete supabase_schema.sql in the root repository.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER PUBLICATION supabase_realtime ADD TABLE 
  public.site_settings,
  public.hero_sections,
  public.collections,
  public.founder_content,
  public.founder_picks,
  public.why_us_items,
  public.experience_content,
  public.testimonials,
  public.journal_posts,
  public.media_assets;`}
        </pre>
      </div>
    </div>
  );
};
