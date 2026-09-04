import React, { useState } from 'react';
import { MessageSquare, Plus, Trash2, Star, Check, User } from 'lucide-react';
import { TestimonialItem } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';
import { ImageUploadWidget } from './ImageUploadWidget';

interface AdminTestimonialsProps {
  testimonials: TestimonialItem[];
  onSaved: () => void;
}

export const AdminTestimonials: React.FC<AdminTestimonialsProps> = ({
  testimonials,
  onSaved,
}) => {
  const [list, setList] = useState<TestimonialItem[]>([...testimonials]);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  React.useEffect(() => {
    setList([...testimonials]);
  }, [testimonials]);

  const handleUpdateItem = async (updated: TestimonialItem) => {
    const next = list.map((t) => (t.id === updated.id ? updated : t));
    setList(next);
    await DataService.saveTestimonials(next);
    onSaved();
  };

  const handleAddNew = () => {
    const newItem: TestimonialItem = {
      id: `test-${Date.now()}`,
      customer_name: 'Customer Name',
      customer_location: 'Hyderabad',
      rating: 5,
      testimonial: '“Outstanding service, authentic purity and the best bangle designs in Hyderabad.”',
      photo_url: '',
      display_order: list.length + 1,
      published: true,
    };
    setList([...list, newItem]);
    setEditingItem(newItem);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    const next = list.filter((t) => t.id !== id);
    setList(next);
    await DataService.deleteTestimonial(id);
    if (editingItem?.id === id) setEditingItem(null);
    onSaved();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C0846A', display: 'block', marginBottom: '4px' }}>
            TESTIMONIALS CMS
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            09. Customer Testimonials &amp; Reviews
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', marginTop: '4px', margin: 0 }}>
            Manage client reviews, wedding buyer stories, star ratings, and profile avatars.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 24px',
            height: '44px',
            borderRadius: '8px',
            backgroundColor: '#C0846A',
            color: '#FFFFFF',
            fontFamily: 'Jost, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(192, 132, 106, 0.25)',
          }}
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {list.map((item) => {
          const initials = item.customer_name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase() || 'GG';

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #EDE4DC',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(45, 30, 20, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  {item.photo_url && item.photo_url.trim() !== '' ? (
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#FAF6F3', border: '1.5px solid #EDE4DC', flexShrink: 0 }}>
                      <img
                        src={item.photo_url}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          // Hide broken image and let parent show fallback
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#F0E4DC', border: '1.5px solid #E2D5CA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0846A', fontFamily: 'Jost, sans-serif', fontSize: '15px', fontWeight: 700, flexShrink: 0 }}>
                      {initials}
                    </div>
                  )}

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#1E1610', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.customer_name}
                    </h4>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '11.5px', color: '#A27068', display: 'block', marginTop: '2px' }}>
                      {item.customer_location}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#D4AF37', marginTop: '4px', gap: '2px' }}>
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5C4A3E', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  {item.testimonial}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #F0E6DE' }}>
                <button
                  type="button"
                  onClick={() => handleUpdateItem({ ...item, published: !item.published })}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: item.published ? '#2E7D32' : '#8C827A',
                  }}
                >
                  {item.published ? '● Published' : '○ Draft'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setEditingItem(item)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#C0846A',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D32F2F',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(30,22,16,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            overflowY: 'auto',
          }}
          onClick={() => setEditingItem(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
              border: '1.5px solid #EDE4DC',
              margin: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', fontWeight: 600, color: '#1E1610', margin: '0 0 20px' }}>
              Edit Review: {editingItem.customer_name}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.customer_name}
                    onChange={(e) => setEditingItem({ ...editingItem, customer_name: e.target.value })}
                    style={{ width: '100%', height: '44px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', border: '1.5px solid #EDE4DC', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    Location (e.g. Banjara Hills, Hyderabad)
                  </label>
                  <input
                    type="text"
                    value={editingItem.customer_location}
                    onChange={(e) => setEditingItem({ ...editingItem, customer_location: e.target.value })}
                    style={{ width: '100%', height: '44px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', border: '1.5px solid #EDE4DC', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  Star Rating (1 to 5 Stars)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editingItem.rating}
                  onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                  style={{ width: '100%', height: '44px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', border: '1.5px solid #EDE4DC', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  Review Text
                </label>
                <textarea
                  rows={3}
                  value={editingItem.testimonial}
                  onChange={(e) => setEditingItem({ ...editingItem, testimonial: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', border: '1.5px solid #EDE4DC', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
                />
              </div>

              <div style={{ paddingTop: '8px', borderTop: '1px solid #EDE4DC' }}>
                <ImageUploadWidget
                  label="Customer Photo (Optional)"
                  category="testimonials"
                  aspectRatio="aspect-[1/1]"
                  currentImageUrl={editingItem.photo_url}
                  onImageUploaded={(url) => setEditingItem({ ...editingItem, photo_url: url })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid #EDE4DC' }}>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  style={{
                    padding: '0 20px',
                    height: '42px',
                    borderRadius: '8px',
                    border: '1.5px solid #EDE4DC',
                    backgroundColor: '#FFFFFF',
                    color: '#5C4A3E',
                    fontSize: '12px',
                    fontWeight: 600,
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
                  Save Testimonial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
