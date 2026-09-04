import React, { useState } from 'react';
import { Image as ImageIcon, Trash2, Copy, Check, Plus, Upload } from 'lucide-react';
import { MediaAsset } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';
import { ImageUploadWidget } from './ImageUploadWidget';

interface AdminMediaLibraryProps {
  assets: MediaAsset[];
  onSaved: () => void;
}

export const AdminMediaLibrary: React.FC<AdminMediaLibraryProps> = ({
  assets,
  onSaved,
}) => {
  const [list, setList] = useState<MediaAsset[]>([...assets]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  React.useEffect(() => {
    setList([...assets]);
  }, [assets]);

  const categories = ['all', 'hero', 'collections', 'founder', 'founder-picks', 'store', 'testimonials', 'journal', 'cta'];

  const filtered = list.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media asset?')) return;
    await DataService.deleteMediaAsset(id);
    const updated = await DataService.getMediaAssets();
    setList(updated);
    onSaved();
  };

  const handleNewUpload = async () => {
    const updated = await DataService.getMediaAssets();
    setList(updated);
    onSaved();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C0846A', display: 'block', marginBottom: '4px' }}>
            ASSET MANAGEMENT
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            Central Media Library
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', marginTop: '4px', margin: 0 }}>
            Upload, browse, categorize, and copy public URLs for bangle photos and brand assets.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #EDE4DC',
          boxShadow: '0 4px 20px rgba(45, 30, 20, 0.03)',
        }}
      >
        <ImageUploadWidget
          label="Upload New Media to Storage &amp; Library"
          category={filter === 'all' ? 'general' : filter}
          currentImageUrl=""
          onImageUploaded={handleNewUpload}
        />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingBottom: '8px', borderBottom: '1px solid #EDE4DC' }}>
        {categories.map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '7px 18px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: isActive ? '1.5px solid #1E1610' : '1px solid #E2D5CA',
                backgroundColor: isActive ? '#1E1610' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#5C4A3E',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #EDE4DC',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(45, 30, 20, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', backgroundColor: '#FAF6F3', overflow: 'hidden' }}>
              <img
                src={item.file_url}
                alt={item.file_name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'rgba(0,0,0,0.65)', color: '#FFFFFF', fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                {item.category}
              </span>
            </div>

            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#1E1610', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '8px' }}>
                {item.file_name}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  onClick={() => handleCopyUrl(item.file_url, item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: copiedId === item.id ? '#2E7D32' : '#C0846A',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {copiedId === item.id ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedId === item.id ? 'Copied!' : 'Copy URL'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#D32F2F',
                    cursor: 'pointer',
                    padding: '2px',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
