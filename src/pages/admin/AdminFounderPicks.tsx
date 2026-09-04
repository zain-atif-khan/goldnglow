import React, { useState } from 'react';
import { Star, Save, Check, Plus, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { FounderPick } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';
import { ImageUploadWidget } from './ImageUploadWidget';

interface AdminFounderPicksProps {
  picks: FounderPick[];
  onSaved: () => void;
}

export const AdminFounderPicks: React.FC<AdminFounderPicksProps> = ({
  picks,
  onSaved,
}) => {
  const [items, setItems] = useState<FounderPick[]>([...picks]);
  const [editingItem, setEditingItem] = useState<FounderPick | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdate = async (updated: FounderPick) => {
    const next = items.map((i) => (i.id === updated.id ? updated : i));
    setItems(next);
    await DataService.saveFounderPicks(next);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
    onSaved();
  };

  const handleAddNew = () => {
    const num = items.length + 1;
    const newItem: FounderPick = {
      id: `pick-${Date.now()}`,
      pick_number: num < 10 ? `0${num}` : `${num}`,
      title: "New Curated Pick",
      tagline: 'Timeless Beauty & Royal Craftsmanship',
      description: 'Handcrafted masterwork designed for modern royal elegance.',
      image_url: '/assets/collections/kundan-bridal-kada.jpg',
      display_order: num,
      active: true,
    };
    setItems([...items, newItem]);
    setEditingItem(newItem);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Founder's Pick card?")) return;
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    await DataService.saveFounderPicks(next);
    if (editingItem?.id === id) setEditingItem(null);
    onSaved();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C0846A', display: 'block', marginBottom: '4px' }}>
            HOMEPAGE CURATION CMS
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            03. Founder's Picks (Homepage Section 3)
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5C4A3E', marginTop: '4px', margin: 0 }}>
            Curate and edit the master bangle highlights featured directly on the home page with custom number tags (01, 02, 03).
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 20px',
            height: '42px',
            borderRadius: '4px',
            backgroundColor: '#C0846A',
            color: '#FFFFFF',
            fontFamily: 'Jost, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(192, 132, 106, 0.25)',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#A06A50')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#C0846A')}
        >
          <Plus size={15} />
          <span>Add New Pick</span>
        </button>
      </div>

      {savedSuccess && (
        <div style={{ padding: '12px 16px', borderRadius: '6px', backgroundColor: '#F6FFED', border: '1px solid #B7EB8F', color: '#389E0D', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={16} />
          <span>Founder's Picks updated live on the homepage!</span>
        </div>
      )}

      {/* Grid of Picks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: editingItem?.id === item.id ? '1.5px solid #C0846A' : '1px solid #EDE4DC',
              padding: '20px',
              boxShadow: '0 4px 14px rgba(45, 30, 20, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
            }}
          >
            <div>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#FAF5F0',
                  border: '1px solid #EDE4DC',
                  marginBottom: '14px',
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '24px',
                    borderRadius: '3px',
                    backgroundColor: '#C0846A',
                    color: '#FFFFFF',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                >
                  {item.pick_number}
                </span>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '19px',
                    fontWeight: 600,
                    color: '#1E1610',
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
              </div>

              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '12.5px',
                  fontStyle: 'italic',
                  color: '#C0846A',
                  margin: '0 0 8px',
                }}
              >
                {item.tagline}
              </p>

              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '12.5px',
                  color: '#5C4A3E',
                  margin: 0,
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {item.description}
              </p>
            </div>

            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #EDE4DC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <button
                type="button"
                onClick={() => handleUpdate({ ...item, active: !item.active })}
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '11.5px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: item.active ? '#2E7D32' : '#8C8C8C',
                }}
              >
                {item.active ? <Eye size={14} /> : <EyeOff size={14} />}
                <span>{item.active ? 'Active' : 'Hidden'}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setEditingItem(item)}
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#C0846A',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  style={{
                    color: '#CF1322',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Delete Pick"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(30,22,16,0.65)',
            backdropFilter: 'blur(5px)',
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
              maxWidth: '600px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 20px 60px rgba(30,22,16,0.2)',
              border: '1px solid #EDE4DC',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #EDE4DC' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
                Edit Founder Pick: {editingItem.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#5C4A3E', display: 'flex' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                    Number
                  </label>
                  <input
                    type="text"
                    value={editingItem.pick_number}
                    onChange={(e) => setEditingItem({ ...editingItem, pick_number: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                    Pick Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                  Tagline / Characteristic
                </label>
                <input
                  type="text"
                  value={editingItem.tagline}
                  onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                  style={{ width: '100%', height: '42px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ paddingTop: '12px', borderTop: '1px solid #EDE4DC' }}>
                <ImageUploadWidget
                  label="Jewellery Photograph"
                  category="founder-picks"
                  currentImageUrl={editingItem.image_url}
                  onImageUploaded={(url) => setEditingItem({ ...editingItem, image_url: url })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid #EDE4DC' }}>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  style={{
                    padding: '0 20px',
                    height: '42px',
                    borderRadius: '4px',
                    backgroundColor: '#FAF5F0',
                    color: '#5C4A3E',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    border: '1px solid #EDE4DC',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await handleUpdate(editingItem);
                    setEditingItem(null);
                  }}
                  style={{
                    padding: '0 24px',
                    height: '42px',
                    borderRadius: '4px',
                    backgroundColor: '#C0846A',
                    color: '#FFFFFF',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(192, 132, 106, 0.25)',
                  }}
                >
                  Save Founder Pick
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
