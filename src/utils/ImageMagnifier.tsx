import React, { useState } from 'react';
import '@/styles/ImageMagnifier.css';

const ImageMagnifier: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [isMagnifierVisible, setIsMagnifierVisible] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition({
      top: y - 50,
      left: x - 50,
    });
    setIsMagnifierVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMagnifierVisible(false);
  };

  return (
    <div
      className="image-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="path/to/your/product-image.jpg"
        alt="Product"
        className="product-image"
      />
      {isMagnifierVisible && (
        <div
          className="magnifier"
          style={{
            top: mousePosition.top,
            left: mousePosition.left,
            backgroundImage: `url('path/to/your/product-image.jpg')`,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
