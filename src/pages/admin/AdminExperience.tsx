import React, { useState } from 'react';
import { Building, Save, Check } from 'lucide-react';
import { ExperienceContent } from '../../lib/database.types';
import { DataService } from '../../lib/dataService';
import { ImageUploadWidget } from './ImageUploadWidget';

interface AdminExperienceProps {
  initialContent: ExperienceContent;
  onSaved: () => void;
}

export const AdminExperience: React.FC<AdminExperienceProps> = ({
  initialContent,
  onSaved,
}) => {
  const [form, setForm] = useState<ExperienceContent>({ ...initialContent });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await DataService.updateExperienceContent(form);
      setSavedSuccess(true);
      onSaved();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving experience content:', err);
      alert('Failed to save experience content.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C37871]">
            STORE EXPERIENCE CMS
          </span>
          <h2 className="text-2xl font-serif text-[#2B2320]">
            08. Store Experience & Virtual Tour
          </h2>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ECE2DA] shadow-xs flex flex-col gap-6">
        
        {/* Headings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
              Heading Line 1
            </label>
            <input
              type="text"
              value={form.heading_line1}
              onChange={(e) => setForm({ ...form, heading_line1: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
              Heading Line 2 (Blush Italics)
            </label>
            <input
              type="text"
              value={form.heading_line2}
              onChange={(e) => setForm({ ...form, heading_line2: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
            Description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
          />
        </div>

        {/* Video Embed Link */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2320] mb-1.5 font-sans">
            Store Experience Video Embed URL (YouTube/MP4)
          </label>
          <input
            type="text"
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs border border-[#ECE2DA] rounded-md bg-[#FAF8F5]"
          />
        </div>

        {/* Store Images */}
        <div className="pt-4 border-t border-[#ECE2DA] flex flex-col gap-6">
          <ImageUploadWidget
            label="Main Store Interior Photo (With Play Button)"
            category="store"
            currentImageUrl={form.main_image_url}
            onImageUploaded={(url) => {
              setForm((prev) => ({ ...prev, main_image_url: url }));
              DataService.updateExperienceContent({ ...form, main_image_url: url });
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ImageUploadWidget
              label="Store Exterior"
              category="store"
              aspectRatio="aspect-[16/9]"
              currentImageUrl={form.exterior_image_url}
              onImageUploaded={(url) => {
                setForm((prev) => ({ ...prev, exterior_image_url: url }));
                DataService.updateExperienceContent({ ...form, exterior_image_url: url });
              }}
            />

            <ImageUploadWidget
              label="Showcase Display"
              category="store"
              aspectRatio="aspect-[1/1]"
              currentImageUrl={form.showcase_image_url}
              onImageUploaded={(url) => {
                setForm((prev) => ({ ...prev, showcase_image_url: url }));
                DataService.updateExperienceContent({ ...form, showcase_image_url: url });
              }}
            />

            <ImageUploadWidget
              label="Customers at Store"
              category="store"
              aspectRatio="aspect-[1/1]"
              currentImageUrl={form.customers_image_url}
              onImageUploaded={(url) => {
                setForm((prev) => ({ ...prev, customers_image_url: url }));
                DataService.updateExperienceContent({ ...form, customers_image_url: url });
              }}
            />
          </div>
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
            <span>{isSaving ? 'SAVING...' : 'SAVE STORE EXPERIENCE'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
