import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  UserCheck,
  Star,
  ShieldCheck,
  Building,
  MessageSquare,
  BookOpen,
  Image as ImageIcon,
  Settings,
  Database,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { GoldNGlowLogo } from '../../components/Icons';

export type AdminTab =
  | 'dashboard'
  | 'hero'
  | 'collections'
  | 'founder'
  | 'picks'
  | 'whyus'
  | 'experience'
  | 'testimonials'
  | 'journal'
  | 'media'
  | 'store'
  | 'database';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  onViewSite: () => void;
  adminEmail?: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  onViewSite,
  adminEmail,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'hero', label: 'Hero Showcase', icon: <Sparkles size={18} /> },
    { id: 'collections', label: 'Collections Strip & Sets', icon: <Layers size={18} /> },
    { id: 'founder', label: 'Founder Story & Bio', icon: <UserCheck size={18} /> },
    { id: 'picks', label: "Founder's Curated Picks", icon: <Star size={18} /> },
    { id: 'whyus', label: 'Why Us & Promises', icon: <ShieldCheck size={18} /> },
    { id: 'experience', label: 'Store Experience', icon: <Building size={18} /> },
    { id: 'testimonials', label: 'Customer Reviews', icon: <MessageSquare size={18} /> },
    { id: 'journal', label: 'Journal & Guides', icon: <BookOpen size={18} /> },
    { id: 'media', label: 'Media & Asset Library', icon: <ImageIcon size={18} /> },
    { id: 'store', label: 'Store Contact & Timings', icon: <Settings size={18} /> },
    { id: 'database', label: 'Supabase Realtime Sync', icon: <Database size={18} />, badge: 'LIVE' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F7F3EE',
        color: '#2B2320',
        position: 'relative',
      }}
    >
      {/* SIDEBAR (DESKTOP) — Guaranteed fixed width, cannot overlap */}
      <aside
        style={{
          width: '280px',
          minWidth: '280px',
          maxWidth: '280px',
          flexShrink: 0,
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E8E0D7',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px',
          minHeight: '100vh',
          boxShadow: '2px 0 10px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Logo Header */}
          <div style={{ paddingBottom: '16px', borderBottom: '1px solid #F2EBE5' }}>
            <GoldNGlowLogo variant="full" />
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#A27068',
                  backgroundColor: '#FAF3F0',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid #E8D0C9',
                }}
              >
                LUXURY CMS PORTAL
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#2E7D32', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2E7D32', display: 'inline-block' }} />
                <span>SYNC ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    border: isActive ? '1px solid #C37871' : '1px solid transparent',
                    backgroundColor: isActive ? '#C37871' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#5C504A',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: isActive ? '#FFFFFF' : '#A27068', display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#E8F5E9',
                        color: isActive ? '#FFFFFF' : '#2E7D32',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid #F2EBE5', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ padding: '4px 8px' }}>
            <span style={{ fontSize: '10px', color: '#9B8E87', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Logged In As
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2B2320', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {adminEmail || 'admin@goldnglow.in'}
            </span>
          </div>

          <button
            onClick={onViewSite}
            style={{
              width: '100%',
              padding: '10px 14px',
              backgroundColor: '#FAF3F0',
              color: '#C37871',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: '1px solid #E8D0C9',
              cursor: 'pointer',
            }}
          >
            <ExternalLink size={14} />
            <span>View Live Website</span>
          </button>

          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '8px 14px',
              backgroundColor: 'transparent',
              color: '#C62828',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: '36px 48px',
          overflowY: 'auto',
          backgroundColor: '#F8F5F1',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          {children}
        </div>
      </main>

    </div>
  );
};
