import React from "react";

interface ImagePreviewProps {
  imageData: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageData }) => {
  return (
    <div className="mb-6 bg-black rounded-lg overflow-hidden">
      <img src={imageData} alt="Captured" className="max-w-full h-auto" />
    </div>
  );
};
