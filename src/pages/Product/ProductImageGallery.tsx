// import { useState, useRef, useEffect } from 'react';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// interface ProductImageGalleryProps {
//   images: string[];
//   productName: string;
// }

// interface Position {
//   x: number;
//   y: number;
// }

// const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
//   const [activeImage, setActiveImage] = useState<number>(0);
//   const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
//   const [isZoomed, setIsZoomed] = useState<boolean>(false);
//   const [zoomLevel, setZoomLevel] = useState<number>(1);
//   const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
//   const imgRef = useRef<HTMLImageElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   // Handle zoom effect
//   useEffect(() => {
//     if (!isZoomed) {
//       setZoomLevel(1);
//       setPosition({ x: 0, y: 0 });
//     }
//   }, [isZoomed]);

//   const toggleZoom = () => {
//     setIsZoomed(!isZoomed);
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isZoomed || !containerRef.current) return;

//     const { left, top, width, height } = containerRef.current.getBoundingClientRect();
//     const x = e.clientX - left;
//     const y = e.clientY - top;

//     setPosition({
//       x: Math.max(0, Math.min(x, width)),
//       y: Math.max(0, Math.min(y, height)),
//     });
//   };

//   const handleThumbnailClick = (index: number) => {
//     setActiveImage(index);
//     setIsZoomed(false);
//   };

//   const navigateImage = (direction: 'prev' | 'next') => {
//     setIsZoomed(false);
//     if (direction === 'prev') {
//       setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     } else {
//       setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }
//   };

//   return (
//     <div className="lg:col-span-5">
//       <div className="sticky top-4 flex flex-row gap-4">
//         {/* Thumbnails on the left */}
//         {images.length > 1 && (
//           <div className="hidden md:flex flex-col gap-2 w-16">
//             {images.map((img, index) => (
//               <button
//                 key={index}
//                 className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
//                   activeImage === index ? 'border-[#9EA647]' : 'border-transparent'
//                 }`}
//                 onClick={() => handleThumbnailClick(index)}
//               >
//                 <img
//                   src={img}
//                   alt={`${productName} thumbnail ${index + 1}`}
//                   className="w-full h-16 object-cover hover:opacity-90"
//                 />
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Main image area */}
//         <div className="flex-1">
//           {/* Main Image with Zoom */}
//           <div
//             ref={containerRef}
//             className="relative bg-white p-4 rounded-xl shadow-md mb-4 overflow-hidden"
//             onMouseMove={handleMouseMove}
//             onMouseLeave={() => setIsZoomed(false)}
//           >
//             <div className="relative w-full">
//               <img
//                 ref={imgRef}
//                 src={images[activeImage]}
//                 alt={productName}
//                 className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
//                   isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
//                 }`}
//                 style={{
//                   transform: isZoomed
//                     ? `scale(${zoomLevel}) translate(${(position.x / 100) * 20}px, ${(position.y / 100) * 20}px)`
//                     : 'scale(1)',
//                 }}
//                 onClick={toggleZoom}
//               />
//             </div>

//             {/* Navigation buttons */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={() => navigateImage('prev')}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 hover:bg-white"
//                   aria-label="Previous image"
//                 >
//                   <ChevronLeft className="w-5 h-5 text-[#9EA647]" />
//                 </button>
//                 <button
//                   onClick={() => navigateImage('next')}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 hover:bg-white"
//                   aria-label="Next image"
//                 >
//                   <ChevronRight className="w-5 h-5 text-[#9EA647]" />
//                 </button>
//               </>
//             )}

//             {/* Zoom button */}
//             {/* <button
//               onClick={toggleZoom}
//               className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md z-10 hover:bg-white"
//               aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
//             >
//               {isZoomed ? (
//                 <ZoomOut className="w-5 h-5 text-[#9EA647]" />
//               ) : (
//                 <ZoomIn className="w-5 h-5 text-[#9EA647]" />
//               )}
//             </button> */}

//             {/* Image counter */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full text-sm shadow-md">
//               {activeImage + 1} / {images.length}
//             </div>
//           </div>

//           {/* Mobile Thumbnails (below main image) */}
//           {images.length > 1 && (
//             <div className="grid grid-cols-5 gap-2 mt-4 md:hidden">
//               {images.map((img, index) => (
//                 <div
//                   key={index}
//                   className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
//                     activeImage === index ? 'border-[#9EA647]' : 'border-transparent'
//                   }`}
//                   onClick={() => handleThumbnailClick(index)}
//                 >
//                   <img
//                     src={img}
//                     alt={`${productName} thumbnail ${index + 1}`}
//                     className="w-full h-20 object-cover hover:opacity-90"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Mobile Gallery Button */}
//           {/* <button
//             className="lg:hidden mt-4 w-full py-2 bg-[#9EA647] text-white rounded-lg flex items-center justify-center gap-2"
//             onClick={() => setIsGalleryOpen(true)}
//           >
//             <ZoomIn className="w-4 h-4" />
//             View All Images ({images.length})
//           </button> */}
//         </div>
//       </div>

//       {/* Image Gallery Modal */}
//       {isGalleryOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-bold text-white">Product Images</h3>
//             <button
//               onClick={() => setIsGalleryOpen(false)}
//               className="text-white p-2"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div className="grid grid-cols-1 gap-4 pb-8">
//               {images.map((img, index) => (
//                 <div key={index} className="bg-white rounded-lg overflow-hidden">
//                   <img
//                     src={img}
//                     alt={`${productName} gallery ${index + 1}`}
//                     className="w-full h-auto max-h-[70vh] object-contain"
//                   />
//                   <div className="p-3 text-center text-sm text-gray-600">
//                     Image {index + 1} of {images.length}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-center gap-2 mt-4">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setActiveImage(index);
//                   setIsGalleryOpen(false);
//                 }}
//                 className={`w-3 h-3 rounded-full ${
//                   activeImage === index ? 'bg-[#9EA647]' : 'bg-gray-500'
//                 }`}
//                 aria-label={`Go to image ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductImageGallery;


import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  // const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
    setIsZoomed(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    setIsZoomed(false);
    if (direction === 'prev') {
      setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !containerRef.current || !imageRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomPosition({ x: 50, y: 50 }); // Center the zoom initially
    }
  };

  return (
    <div className="lg:col-span-5">
      <div className="sticky top-4 flex flex-row gap-4">
        {/* Thumbnails on the left */}
        {images.length > 1 && (
          <div className="hidden md:flex flex-col gap-2 w-16">
            {images.map((img, index) => (
              <button
                key={index}
                className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  activeImage === index ? 'border-[#9EA647]' : 'border-transparent'
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-16 object-cover hover:opacity-90"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main image area */}
        <div className="flex-1">
          <div
            ref={containerRef}
            className="relative bg-white p-4 rounded-xl shadow-md mb-4 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {/* Main Image Container */}
            <div className="relative w-full flex items-center justify-center overflow-hidden">
              <img
                ref={imageRef}
                src={images[activeImage]}
                alt={productName}
                className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                style={{
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
                onClick={toggleZoom}
              />
            </div>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-[#9EA647]" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-[#9EA647]" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full text-sm shadow-md">
              {activeImage + 1} / {images.length}
            </div>

            {/* Zoom indicator */}
            {isZoomed && (
              <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm shadow-md">
                Zoomed 2x
              </div>
            )}
          </div>

          {/* Mobile Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-4 md:hidden">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    activeImage === index ? 'border-[#9EA647]' : 'border-transparent'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={img}
                    alt={`${productName} thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover hover:opacity-90"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;