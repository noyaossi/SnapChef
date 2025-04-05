import React from "react";

interface ImagePreviewProps {
  imageData: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageData }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-green-600 mb-3">Your Image</h2>
      <div className="rounded-lg overflow-hidden border-4 border-green-500 bg-black max-w-xs mx-auto">
        <img
          src={imageData}
          alt="Your ingredients"
          className="max-w-full h-auto object-contain mx-auto max-h-52"
        />
      </div>
      <p className="text-sm text-gray-600 text-center mt-2">
        This is the image we used to identify your ingredients
      </p>
    </div>
  );
};
