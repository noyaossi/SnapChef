import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContentContainer } from "./ContentContainer";
import { Button } from "./Button";

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    const file = files[0];

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Create a preview URL for the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!selectedFile || !previewUrl) {
      setError("Please select an image first");
      return;
    }

    // Navigate to the allergies page with the image data
    navigate("/allergies", { state: { imageData: previewUrl } });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <ContentContainer>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Upload Product Image</h1>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {previewUrl ? (
          <div className="mb-6 bg-black rounded-lg overflow-hidden">
            <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
          </div>
        ) : (
          <div
            className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={triggerFileInput}
          >
            <div className="text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-1">
                Click to select a product image or drag and drop
              </p>
              <p className="text-sm text-gray-400">
                (PNG, JPG, JPEG up to 10MB)
              </p>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          {previewUrl ? (
            <>
              <Button variant="primary" onClick={handleUpload}>
                Continue to Allergies
              </Button>
              <Button variant="secondary" onClick={triggerFileInput}>
                Choose Different Image
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={triggerFileInput}>
              Select Image
            </Button>
          )}
          <Button variant="secondary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </ContentContainer>
  );
};

export { ImageUpload };
