import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Edit3, Check } from 'lucide-react';
import { JournalPost } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';
import { ImageUploadWidget } from './ImageUploadWidget';

interface AdminJournalProps {
  posts: JournalPost[];
  onSaved: () => void;
}

export const AdminJournal: React.FC<AdminJournalProps> = ({ posts, onSaved }) => {
  const [list, setList] = useState<JournalPost[]>([...posts]);
  const [editingPost, setEditingPost] = useState<JournalPost | null>(null);

  React.useEffect(() => {
    setList([...posts]);
  }, [posts]);

  const handleSavePost = async (post: JournalPost) => {
    await DataService.saveJournalPost(post);
    const updated = await DataService.getJournalPosts();
    setList(updated);
    setEditingPost(null);
    onSaved();
  };

  const handleAddNew = () => {
    const newPost: JournalPost = {
      id: `post-${Date.now()}`,
      title: 'New Bangle Style Guide',
      slug: `guide-${Date.now()}`,
      category: 'BANGLE GUIDE',
      excerpt: 'Comprehensive advice on curating designer and bridal bangles.',
      content: 'Write the complete article content here...',
      cover_image_url: '/assets/journal/journal-how-to-choose.png',
      author: 'Syed Owais Ahmed',
      published_date: new Date().toISOString().split('T')[0],
      published: true,
      display_order: list.length + 1,
    };
    setEditingPost(newPost);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    await DataService.deleteJournalPost(id);
    const updated = await DataService.getJournalPosts();
    setList(updated);
    if (editingPost?.id === id) setEditingPost(null);
    onSaved();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C0846A', display: 'block', marginBottom: '4px' }}>
            JOURNAL &amp; BLOG CMS
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 600, color: '#1E1610', margin: 0 }}>
            10. The Gold N Glow Journal Articles
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', marginTop: '4px', margin: 0 }}>
            Publish style guides, styling advice, and heritage craft narratives.
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
          <span>Write New Article</span>
        </button>
      </div>

      {/* Articles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
        {list.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #EDE4DC',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(45, 30, 20, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#FAF6F3', overflow: 'hidden' }}>
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '24px 24px 16px' }}>
                <span style={{ display: 'inline-block', fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9E6B15', backgroundColor: '#FDF5E6', padding: '3px 8px', borderRadius: '4px', border: '1px solid #E5C483' }}>
                  {post.category}
                </span>

                <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#1E1610', margin: '10px 0 6px', lineHeight: 1.3 }}>
                  {post.title}
                </h3>

                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6356', lineHeight: 1.6, margin: 0 }} className="line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div style={{ padding: '14px 24px', borderTop: '1px solid #F0E6DE', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAF8F5' }}>
              <span style={{ fontSize: '11.5px', color: post.published ? '#2E7D32' : '#8C827A', fontWeight: 600 }}>
                {post.published ? '● Published' : '○ Draft'} • {post.published_date}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setEditingPost(post)}
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
                  onClick={() => handleDelete(post.id)}
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
        ))}
      </div>

      {/* EDIT POST MODAL */}
      {editingPost && (
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
          onClick={() => setEditingPost(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
              border: '1.5px solid #EDE4DC',
              maxHeight: '90vh',
              overflowY: 'auto',
              margin: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', fontWeight: 600, color: '#1E1610', margin: '0 0 20px' }}>
              Edit Article: {editingPost.title}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  Article Headline / Title
                </label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  style={{ width: '100%', height: '44px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', border: '1.5px solid #EDE4DC', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    Category Badge
                  </label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    style={{ width: '100%', height: '44px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', border: '1.5px solid #EDE4DC', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    style={{ width: '100%', height: '44px', padding: '0 14px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', border: '1.5px solid #EDE4DC', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', border: '1.5px solid #EDE4DC', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#1E1610', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  Full Article Body Content
                </label>
                <textarea
                  rows={6}
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', border: '1.5px solid #EDE4DC', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
                />
              </div>

              <div style={{ paddingTop: '8px', borderTop: '1px solid #EDE4DC' }}>
                <ImageUploadWidget
                  label="Article Cover Image"
                  category="journal"
                  aspectRatio="aspect-[16/9]"
                  currentImageUrl={editingPost.cover_image_url}
                  onImageUploaded={(url) => setEditingPost({ ...editingPost, cover_image_url: url })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid #EDE4DC' }}>
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
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
                  onClick={() => handleSavePost(editingPost)}
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
                  Save Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
