import React, { useState } from 'react';
import { Save, Check, UserCheck } from 'lucide-react';
import { FounderContent } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';
import { ImageUploadWidget } from './ImageUploadWidget';

interface AdminFounderProps {
  initialContent: FounderContent;
  onSaved: () => void;
}

export const AdminFounder: React.FC<AdminFounderProps> = ({
  initialContent,
  onSaved,
}) => {
  const [form, setForm] = useState<FounderContent>({ ...initialContent });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await DataService.updateFounderContent(form);
      setSavedSuccess(true);
      onSaved();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving founder content:', err);
      alert('Failed to save founder content.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C37871]">
            STORY & FOUNDER CMS
          </span>
          <h2 className="text-2xl font-serif text-[#2B2320]">
            04. Founder Story & Biography Management
          </h2>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ECE2DA] shadow-xs flex flex-col gap-6">
        
        {/* Founder Name & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
              Founder Full Name
            </label>
            <input
              type="text"
              value={form.founder_name}
              onChange={(e) => setForm({ ...form, founder_name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5] text-[#2B2320]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
              Founder Designation / Role
            </label>
            <input
              type="text"
              value={form.founder_role}
              onChange={(e) => setForm({ ...form, founder_role: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5] text-[#2B2320]"
            />
          </div>
        </div>

        {/* Section Heading Parts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
              Heading Part 1
            </label>
            <input
              type="text"
              value={form.heading_part1}
              onChange={(e) => setForm({ ...form, heading_part1: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
              Heading Accent Word (Blush)
            </label>
            <input
              type="text"
              value={form.heading_accent}
              onChange={(e) => setForm({ ...form, heading_accent: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
              Heading Part 2
            </label>
            <input
              type="text"
              value={form.heading_part2}
              onChange={(e) => setForm({ ...form, heading_part2: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
            />
          </div>
        </div>

        {/* Story Paragraphs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
              Story Paragraph 1
            </label>
            <textarea
              rows={3}
              value={form.story_p1}
              onChange={(e) => setForm({ ...form, story_p1: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
              Story Paragraph 2
            </label>
            <textarea
              rows={3}
              value={form.story_p2}
              onChange={(e) => setForm({ ...form, story_p2: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
            />
          </div>
        </div>

        {/* Founder Quote */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
            Founder Curatorial Quote
          </label>
          <input
            type="text"
            value={form.founder_quote}
            onChange={(e) => setForm({ ...form, founder_quote: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
          />
        </div>

        {/* Founder Photo Uploader */}
        <div className="pt-4 border-t border-[#ECE2DA]">
          <ImageUploadWidget
            label="Founder Photograph (Syed Owais Ahmed)"
            category="founder"
            aspectRatio="aspect-[4/5]"
            currentImageUrl={form.founder_image_url}
            onImageUploaded={(url) => {
              setForm((prev) => ({ ...prev, founder_image_url: url }));
              DataService.updateFounderContent({ ...form, founder_image_url: url });
            }}
          />
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-[#ECE2DA] flex items-center justify-end gap-3">
          {savedSuccess && (
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <Check size={16} /> Saved!
            </span>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary py-2.5 px-6 text-xs flex items-center gap-2"
          >
            <Save size={14} />
            <span>{isSaving ? 'SAVING...' : 'SAVE STORY CHANGES'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
