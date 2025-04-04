import React from "react";
import { ContentContainer } from "../components/ContentContainer";
import { Button } from "../components/Button";

const Home = () => {
  return (
    <ContentContainer>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          SnapChef - Snap a photo, find a recipe
        </h1>

        <div className="mb-12 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Take/upload a picture of your food products and get personalized
            recipe suggestions
          </p>
          <p className="text-gray-500">
            Our AI will analyze your products, consider your allergies, and
            suggest delicious recipes you can make with what you have
          </p>
        </div>

        <div className="flex space-x-6">
          <Button
            variant="primary"
            to="/camera"
            className="text-xl py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Take Photo
          </Button>

          <Button
            variant="secondary"
            to="/upload"
            className="text-xl py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Upload Product Image
          </Button>
        </div>
      </div>
    </ContentContainer>
  );
};

export { Home };
