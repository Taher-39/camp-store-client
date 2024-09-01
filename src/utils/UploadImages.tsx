import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
/*
Cloud name = do0ujomfx
API key = 399985111359692
API secret = SzBw57xKF-PCb0tItLZXCNezbeQ
API environment variable = CLOUDINARY_URL=cloudinary://399985111359692:SzBw57xKF-PCb0tItLZXCNezbeQ@do0ujomfx

*/ 
const UploadImages = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "do0ujomfx" } });

  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image("cld-sample-5")
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  return <AdvancedImage cldImg={img} />;
};

export default UploadImages;
