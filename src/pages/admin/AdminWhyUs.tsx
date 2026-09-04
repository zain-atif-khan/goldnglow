import React, { useState } from 'react';
import { ShieldCheck, Save, Check, Plus, Trash2 } from 'lucide-react';
import { WhyUsItem } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';

interface AdminWhyUsProps {
  items: WhyUsItem[];
  onSaved: () => void;
}

export const AdminWhyUs: React.FC<AdminWhyUsProps> = ({ items, onSaved }) => {
  const [list, setList] = useState<WhyUsItem[]>([...items]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    setList([...items]);
  }, [items]);

  const handleUpdateItem = async (index: number, updated: Partial<WhyUsItem>) => {
    const next = [...list];
    next[index] = { ...next[index], ...updated };
    setList(next);
    await DataService.saveWhyUsItems(next);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
    onSaved();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C0846A', display: 'block', marginBottom: '4px' }}>
            VALUE PROPOSITIONS CMS
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            07. Why Gold N Glow &amp; Promises
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', marginTop: '4px', margin: 0 }}>
            Manage the highlighted trust metrics, value pills, and brand guarantees displayed across the homepage.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div style={{ padding: '12px 18px', borderRadius: '8px', backgroundColor: '#F6FFED', border: '1px solid #B7EB8F', color: '#389E0D', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={16} />
          <span>Value propositions updated live!</span>
        </div>
      )}

      {/* 5 Value Pills */}
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
        <div style={{ borderBottom: '1px solid #F0E6DE', paddingBottom: '12px' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            Core Value Metric Pills
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {list
            .filter((i) => i.category === 'pill')
            .map((item) => {
              const realIndex = list.findIndex((x) => x.id === item.id);
              return (
                <div
                  key={item.id}
                  style={{
                    padding: '20px',
                    backgroundColor: '#FAF6F0',
                    borderRadius: '12px',
                    border: '1px solid #EDE4DC',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#9E6B15', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'Jost, sans-serif' }}>
                      Pill #{item.display_order} • Icon: {item.icon_name}
                    </span>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#5C4A3E', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={item.active}
                        onChange={(e) => handleUpdateItem(realIndex, { active: e.target.checked })}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Headline / Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateItem(realIndex, { title: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 14px',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: '#1E1610',
                        backgroundColor: '#FFFFFF',
                        border: '1.5px solid #EDE4DC',
                        borderRadius: '8px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Subtitle Copy
                    </label>
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => handleUpdateItem(realIndex, { subtitle: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 14px',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '13px',
                        color: '#5C4A3E',
                        backgroundColor: '#FFFFFF',
                        border: '1.5px solid #EDE4DC',
                        borderRadius: '8px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* The Gold N Glow Promise */}
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
        <div style={{ borderBottom: '1px solid #F0E6DE', paddingBottom: '12px' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            The Gold N Glow Promises
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {list
            .filter((i) => i.category === 'promise')
            .map((item) => {
              const realIndex = list.findIndex((x) => x.id === item.id);
              return (
                <div
                  key={item.id}
                  style={{
                    padding: '20px',
                    backgroundColor: '#FAF6F0',
                    borderRadius: '12px',
                    border: '1px solid #EDE4DC',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#C0846A', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'Jost, sans-serif' }}>
                      Promise Item • Icon: {item.icon_name}
                    </span>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#5C4A3E', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={item.active}
                        onChange={(e) => handleUpdateItem(realIndex, { active: e.target.checked })}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Promise Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateItem(realIndex, { title: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 14px',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: '#1E1610',
                        backgroundColor: '#FFFFFF',
                        border: '1.5px solid #EDE4DC',
                        borderRadius: '8px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Promise Details
                    </label>
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => handleUpdateItem(realIndex, { subtitle: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 14px',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '13px',
                        color: '#5C4A3E',
                        backgroundColor: '#FFFFFF',
                        border: '1.5px solid #EDE4DC',
                        borderRadius: '8px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
