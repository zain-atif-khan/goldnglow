import React, { useState, useRef } from 'react';
import { Upload, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { DataService } from '../../lib/dataService';

interface ImageUploadWidgetProps {
  currentImageUrl: string;
  onImageUploaded: (url: string) => void;
  label?: string;
  category?: string;
  aspectRatio?: string;
}

export const ImageUploadWidget: React.FC<ImageUploadWidgetProps> = ({
  currentImageUrl,
  onImageUploaded,
  label = 'Upload Image',
  category = 'general',
  aspectRatio = 'aspect-[4/3]',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
      alert('Please upload a valid JPG, PNG, or WebP image.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);
    setUploadSuccess(false);

    // Immediate local preview
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          return prev + 15;
        });
      }, 100);

      const finalUrl = await DataService.uploadFile(file, category);
      clearInterval(progressTimer);
      setUploadProgress(100);
      setPreviewUrl(finalUrl);
      onImageUploaded(finalUrl);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-bold tracking-wider uppercase text-[#2B2320]">
          {label}
        </label>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Preview Thumbnail */}
        <div className={`w-32 sm:w-40 ${aspectRatio} rounded-lg overflow-hidden border border-[#ECE2DA] bg-[#FAF6F3] relative shrink-0 shadow-2xs`}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#A27068]">
              <ImageIcon size={24} />
              <span className="text-[10px] mt-1">No Image</span>
            </div>
          )}

          {uploadSuccess && (
            <div className="absolute inset-0 bg-green-900/60 flex items-center justify-center text-white text-xs font-semibold gap-1">
              <Check size={16} /> Saved!
            </div>
          )}
        </div>

        {/* Upload Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-grow w-full border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#C37871] bg-[#FAF0EC]'
              : 'border-[#ECE2DA] hover:border-[#C37871] bg-white'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 size={24} className="animate-spin text-[#C37871]" />
              <span className="text-xs text-[#2B2320] font-medium">
                Uploading to Storage... {uploadProgress}%
              </span>
              <div className="w-48 h-1.5 bg-[#F2EBE5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C37871] transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <div className="p-2.5 rounded-full bg-[#FAF4F0] text-[#C37871]">
                <Upload size={18} />
              </div>
              <p className="text-xs font-semibold text-[#2B2320]">
                Click to Choose from Device or Drag & Drop
              </p>
              <p className="text-[11px] text-[#7A6F69]">
                Supports JPG, JPEG, PNG or WebP (Max 15MB)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
