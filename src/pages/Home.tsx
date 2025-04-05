import React from "react";
import { ContentContainer } from "../components/ContentContainer";
import { Button } from "../components/Button";

const Home = () => {
  return (
    <ContentContainer>
      <div className="text-center max-w-3xl mx-auto">
        <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all mb-8">
          <h1 className="text-5xl font-bold mb-6 text-green-600">SnapChef</h1>
          <p className="text-2xl font-medium text-black mb-8">
            Snap a photo, find a recipe
          </p>

          <div className="mb-4 text-center">
            <p className="text-xl text-black mb-4">
              Take or upload a picture of your ingredients and get personalized
              recipe suggestions instantly
            </p>
            <p className="text-lg text-black">
              Our AI analyzes your available ingredients, considers your dietary
              preferences, and suggests delicious recipes you can make right now
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons - increased margin-top to move buttons down */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto mt-12">
        <Button
          variant="primary"
          to="/camera"
          className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700"
        >
          Take Photo
        </Button>

        <Button
          variant="secondary"
          to="/upload"
          className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-white text-green-600 border border-green-600 hover:bg-green-50"
        >
          Upload Image
        </Button>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-xl font-semibold text-green-600 mb-3">
            Smart Recognition
          </h3>
          <p className="text-gray-600">
            Our AI identifies multiple ingredients from a single photo
          </p>
        </div>

        <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-xl font-semibold text-green-600 mb-3">
            Personalized Results
          </h3>
          <p className="text-gray-600">
            Recipes tailored to your dietary needs and preferences
          </p>
        </div>

        <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-xl font-semibold text-green-600 mb-3">
            Waste Reduction
          </h3>
          <p className="text-gray-600">
            Use what you have and reduce food waste with creative recipes
          </p>
        </div>
      </div>
    </ContentContainer>
  );
};

export { Home };
