import { useState, useRef } from 'react';
import { uploadMedia } from '@/lib/media';
import { Button } from '@/components/ui-kit/button';
import { ImagePlus, X } from 'lucide-react';

interface ImageUploadProps {
  currentUrl: string;
  onUpload: (url: string) => void;
  label: string;
}

export default function ImageUpload({ currentUrl, onUpload, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    // Upload to Media Block
    setUploading(true);
    try {
      const url = await uploadMedia(file);
      if (url) {
        onUpload(url);
        setPreview(url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-start gap-4">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={label}
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <ImagePlus className="text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Choose Image'}
          </Button>
          {preview && (
            <p className="text-xs text-gray-500 mt-2 break-all">{preview}</p>
          )}
        </div>
      </div>
    </div>
  );
}
