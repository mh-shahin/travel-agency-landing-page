// components/shared/ImageUpload.tsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.data.url);
      setPreview(data.data.url);
      toast.success('Image uploaded successfully!');
    } catch (error){
      console.error('Upload error:');
      toast.error('Failed to upload image');
      setPreview(value); // Revert to original
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        {preview ? (
          <div className="relative group">
            <Image
              src={preview}
              alt="Preview"
              width={400}
              height={256}
              className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
            />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClick}
                disabled={uploading}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
              >
                Remove
              </button>
            </div>

            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            disabled={uploading}
            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-sm text-gray-600">Uploading...</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPEG, PNG or WebP (max 5MB)
                  </p>
                </div>
                <Upload className="w-6 h-6 text-gray-400" />
              </>
            )}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
      </div>

      {!preview && (
        <p className="text-xs text-gray-500">
          Upload a high-quality image for best results
        </p>
      )}
    </div>
  );
}