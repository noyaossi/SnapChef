import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { ContentContainer } from "./ContentContainer";

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
      <div className="text-center max-w-3xl mx-auto">
        <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all mb-8">
          <h1 className="text-3xl font-bold mb-4 text-green-600">
            Upload Ingredients Image
          </h1>

          <p className="text-lg text-gray-700 mb-4">
            Upload a clear photo of your ingredients so our AI can identify them
            and suggest personalized recipes
          </p>

          {error && (
            <div className="text-red-500 mb-4 p-2 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* Image Preview or Upload Area */}
      <div className="w-full max-w-2xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-md overflow-hidden mb-8">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain p-2"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              Preview
            </div>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-green-500 transition-colors m-4"
            onClick={triggerFileInput}
          >
            <div className="text-gray-500">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
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
              <p className="mt-1 text-lg font-medium">
                Click to select an image or drag and drop
              </p>
              <p className="text-sm text-gray-500 mt-2">
                PNG, JPG, JPEG up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
        {previewUrl ? (
          <>
            <Button
              variant="primary"
              onClick={handleUpload}
              className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center"
            >
              Continue to Allergies
            </Button>
            <Button
              variant="secondary"
              onClick={triggerFileInput}
              className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-white text-green-600 border border-green-600 hover:bg-green-50 flex items-center justify-center"
            >
              Choose Different Image
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              onClick={triggerFileInput}
              className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center"
            >
              Select Image
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-white text-green-600 border border-green-600 hover:bg-green-50 flex items-center justify-center"
            >
              Back to Home
            </Button>
          </>
        )}
      </div>

      {/* Tips Section */}
      {!previewUrl && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Good Lighting
            </h3>
            <p className="text-gray-600">
              Take photos in well-lit areas for better ingredient recognition
            </p>
          </div>

          <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Clear Arrangement
            </h3>
            <p className="text-gray-600">
              Spread out ingredients so they're clearly visible to the AI
            </p>
          </div>

          <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Multiple Items
            </h3>
            <p className="text-gray-600">
              Include all ingredients you want to use in a single photo
            </p>
          </div>
        </div>
      )}
    </ContentContainer>
  );
};

export { ImageUpload };
