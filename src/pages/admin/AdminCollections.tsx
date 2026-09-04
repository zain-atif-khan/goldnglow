import React, { useState } from 'react';
import { Plus, Trash2, Save, Check, Eye, EyeOff, X, Sparkles } from 'lucide-react';
import { CollectionItem } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';
import { ImageUploadWidget } from './ImageUploadWidget';

interface AdminCollectionsProps {
  collections: CollectionItem[];
  onSaved: () => void;
}

export const AdminCollections: React.FC<AdminCollectionsProps> = ({
  collections,
  onSaved,
}) => {
  const [items, setItems] = useState<CollectionItem[]>([...collections]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    setItems([...collections]);
  }, [collections]);

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory || (selectedCategory === 'lac' && item.material === 'Lac') || (selectedCategory === 'glass' && item.material === 'Glass');
  });

  const handleUpdateItem = async (updated: CollectionItem) => {
    const next = items.map((i) => (i.id === updated.id ? updated : i));
    if (!next.find((i) => i.id === updated.id)) {
      next.push(updated);
    }
    setItems(next);
    await DataService.updateCollectionItem(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
    onSaved();
  };

  const handleAddNew = () => {
    const defaultCat = (selectedCategory !== 'all' ? selectedCategory : 'lac') as any;
    const defaultMat = defaultCat === 'glass' ? 'Glass' : defaultCat === 'bridal' ? 'Lac & Glass' : 'Lac';
    const newItem: CollectionItem = {
      id: `col-${Date.now()}`,
      title: 'New Handcrafted Bangle Design',
      subtitle: 'Artisan Heritage Collection',
      description: 'Handcrafted with master karigari and premium stone settings for weddings and celebrations.',
      category: defaultCat,
      material: defaultMat,
      image_url: '/assets/collections/kundan-bridal-kada.jpg',
      badge_label: defaultMat === 'Lac' ? 'HANDCRAFTED LAC' : defaultMat === 'Glass' ? 'ARTISAN GLASS' : 'BRIDAL SET',
      link_url: '#collections',
      display_order: items.length + 1,
      featured: true,
      active: true,
    };
    setItems([...items, newItem]);
    setEditingItem(newItem);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection bangle item?')) return;
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    await DataService.deleteCollectionItem(id);
    if (editingItem?.id === id) setEditingItem(null);
    onSaved();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C0846A', display: 'block', marginBottom: '4px' }}>
            COLLECTIONS &amp; BANGLES CMS
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            Collections &amp; Bangle Cards Management
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5C4A3E', marginTop: '4px', margin: 0 }}>
            Manage the split-screen strip cards (Section 2), catalogue grid cards (Section 9), and dedicated bridal/festive catalogue pages.
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
          <span>Add New Bangle Card</span>
        </button>
      </div>

      {savedSuccess && (
        <div style={{ padding: '12px 16px', borderRadius: '6px', backgroundColor: '#F6FFED', border: '1px solid #B7EB8F', color: '#389E0D', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={16} />
          <span>Changes saved successfully and updated live on the public site!</span>
        </div>
      )}

      {/* Category Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', borderBottom: '1px solid #EDE4DC', paddingBottom: '12px' }}>
        {[
          { id: 'all', label: `All Items (${items.length})` },
          { id: 'lac', label: `Handcrafted Lac (${items.filter((i) => i.category === 'lac' || i.material === 'Lac').length})` },
          { id: 'glass', label: `Artisan Glass (${items.filter((i) => i.category === 'glass' || i.material === 'Glass').length})` },
          { id: 'bridal', label: `Bridal Heritage (${items.filter((i) => i.category === 'bridal').length})` },
        ].map((tab) => {
          const isSelected = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              style={{
                padding: '7px 14px',
                borderRadius: '6px',
                fontFamily: 'Jost, sans-serif',
                fontSize: '12px',
                fontWeight: isSelected ? 600 : 500,
                cursor: 'pointer',
                border: isSelected ? '1px solid #C0846A' : '1px solid transparent',
                backgroundColor: isSelected ? '#C0846A' : '#FAF5F0',
                color: isSelected ? '#FFFFFF' : '#5C4A3E',
                transition: 'all 0.18s ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Collections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: editingItem?.id === item.id ? '1.5px solid #C0846A' : '1px solid #EDE4DC',
              padding: '16px',
              boxShadow: '0 2px 10px rgba(45, 30, 20, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '84px',
                  height: '96px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#FAF5F0',
                  border: '1px solid #EDE4DC',
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#C0846A',
                      backgroundColor: '#FAF5F0',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid #EDE4DC',
                    }}
                  >
                    {item.category === 'strip' ? 'Strip (Sec 02)' : item.category === 'signature' ? 'Catalogue (Sec 09)' : item.category}
                  </span>
                  {item.badge_label && (
                    <span
                      style={{
                        fontSize: '9.5px',
                        fontWeight: 600,
                        color: '#5C4A3E',
                        backgroundColor: '#FAF5F0',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {item.badge_label}
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#1E1610',
                    margin: '0 0 4px',
                    lineHeight: 1.25,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '12px',
                    color: '#5C4A3E',
                    margin: 0,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.subtitle || item.description}
                </p>

                <span style={{ fontSize: '11px', color: '#C0846A', fontWeight: 600, display: 'block', marginTop: '6px' }}>
                  Display Order: #{item.display_order}
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: '14px',
                paddingTop: '12px',
                borderTop: '1px solid #EDE4DC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <button
                type="button"
                onClick={() => handleUpdateItem({ ...item, active: !item.active })}
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
                  title="Delete Bangle Item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL / DRAWER */}
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
              maxWidth: '640px',
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
                Edit Bangle Card: {editingItem.title}
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
              <div>
                <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                  Bangle Title
                </label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  style={{ width: '100%', height: '42px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                  Subtitle / Sub-Heading
                </label>
                <input
                  type="text"
                  value={editingItem.subtitle || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  style={{ width: '100%', height: '42px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                  Description Copy
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                    Category Type
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    style={{ width: '100%', height: '42px', padding: '0 10px', fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="lac">Handcrafted Lac Bangles</option>
                    <option value="glass">Artisan Glass Bangles</option>
                    <option value="bridal">Bridal Heritage Suite</option>
                    <option value="strip">Signature Showcase</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                    Material Specification
                  </label>
                  <select
                    value={editingItem.material || 'Lac'}
                    onChange={(e) => setEditingItem({ ...editingItem, material: e.target.value as any })}
                    style={{ width: '100%', height: '42px', padding: '0 10px', fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="Lac">100% Handcrafted Lac</option>
                    <option value="Glass">Premium Artisan Glass</option>
                    <option value="Lac & Glass">Hybrid Lac &amp; Glass Blend</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                  Badge Label (e.g. HANDCRAFTED LAC / VELVET GLASS)
                </label>
                <input
                  type="text"
                  value={editingItem.badge_label || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, badge_label: e.target.value })}
                  placeholder="HANDCRAFTED LAC"
                  style={{ width: '100%', height: '42px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E1610', marginBottom: '6px' }}>
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingItem.display_order}
                  onChange={(e) => setEditingItem({ ...editingItem, display_order: parseInt(e.target.value) || 0 })}
                  style={{ width: '100%', height: '42px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#1E1610', backgroundColor: '#FAF5F0', border: '1px solid #EDE4DC', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Image Upload Widget */}
              <div style={{ paddingTop: '12px', borderTop: '1px solid #EDE4DC' }}>
                <ImageUploadWidget
                  label="Bangle Photograph"
                  category="collections"
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
                    await handleUpdateItem(editingItem);
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
                  Save Bangle Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
