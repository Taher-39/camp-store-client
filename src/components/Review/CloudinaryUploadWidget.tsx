import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CloudinaryUploadWidgetProps {
  onUpload: (url: string) => void;
  folder: string;
}

export function CloudinaryUploadWidget({ onUpload, folder }: CloudinaryUploadWidgetProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('upload_preset', 'CampStore');
        formData.append('folder', folder);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/do0ujomfx/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          onUpload(data.secure_url);
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="review-images"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        className="bg-white border-[#9EA647] text-[#9EA647] hover:bg-[#f5f7e8]"
        disabled={isUploading}
      >
        <label htmlFor="review-images" className="cursor-pointer">
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </label>
      </Button>
    </div>
  );
}