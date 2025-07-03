// import { useState } from 'react';
// import { Button } from '@/components/ui/button';

// interface CloudinaryUploadWidgetProps {
//   onUpload: (url: string) => void;
//   folder: string;
// }

// export function CloudinaryUploadWidget({ onUpload, folder }: CloudinaryUploadWidgetProps) {
//   const [isUploading, setIsUploading] = useState(false);

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     setIsUploading(true);

//     try {
//       for (let i = 0; i < files.length; i++) {
//         const formData = new FormData();
//         formData.append('file', files[i]);
//         formData.append('upload_preset', 'CampStore');
//         formData.append('folder', folder);

//         const response = await fetch(
//           `https://api.cloudinary.com/v1_1/do0ujomfx/image/upload`,
//           {
//             method: 'POST',
//             body: formData,
//           }
//         );

//         const data = await response.json();
//         if (data.secure_url) {
//           onUpload(data.secure_url);
//         }
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         id="review-images"
//         accept="image/*"
//         multiple
//         onChange={handleUpload}
//         className="hidden"
//       />
//       <Button
//         type="button"
//         variant="outline"
//         className="bg-white border-[#9EA647] text-[#9EA647] hover:bg-[#f5f7e8]"
//         disabled={isUploading}
//       >
//         <label htmlFor="review-images" className="cursor-pointer">
//           {isUploading ? 'Uploading...' : 'Upload Images'}
//         </label>
//       </Button>
//     </div>
//   );
// }


import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

interface CloudinaryUploadWidgetProps {
  onUpload: (url: string) => void;
  folder: string;
  maxFiles?: number;
  disabled?: boolean;
}

export function CloudinaryUploadWidget({ 
  onUpload, 
  folder, 
  maxFiles = 5,
  disabled = false
}: CloudinaryUploadWidgetProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check file count
    if (files.length > maxFiles) {
      toast.warning(`You can upload maximum ${maxFiles} files`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadPromises = Array.from(files).map((file) => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<void>( async (resolve, reject) => {
          try {
            const formData = new FormData();
            formData.append('file', file);
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
            resolve();
          } catch (error) {
            reject(error);
          } finally {
            setUploadProgress(prev => prev + (100 / files.length));
          }
        });
      });

      await Promise.all(uploadPromises);
      toast.success('Images uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Some images failed to upload');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        id="review-images"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
        disabled={isUploading || disabled}
      />
      
      <Button
        type="button"
        variant="outline"
        className={`relative bg-white border-[#9EA647] text-[#9EA647] hover:bg-[#f5f7e8] ${
          isUploading ? 'opacity-75' : ''
        }`}
        disabled={isUploading || disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading... ({Math.round(uploadProgress)}%)
          </>
        ) : (
          <>
            <ImagePlus className="mr-2 h-4 w-4" />
            Upload Images
          </>
        )}
      </Button>

      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[#9EA647] h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Supports JPG, PNG, WEBP (Max {maxFiles} images)
      </p>
    </div>
  );
}