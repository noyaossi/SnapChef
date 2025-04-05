import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./Button";
import { ContentContainer } from "./ContentContainer";

interface AllergiesProps {}

const Allergies: React.FC<AllergiesProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageData = location.state?.imageData as string;
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  // Enhanced allergens list with image paths
  const allergensList = [
    { id: "dairy", name: "Dairy", image: "/src/assets/dairy.jpg" },
    { id: "eggs", name: "Eggs", image: "/src/assets/eggs.webp" },
    { id: "peanuts", name: "Peanuts", image: "/src/assets/peanuts.jpg" },
    { id: "treeNuts", name: "Tree Nuts", image: "/src/assets/treenuts.jpg" },
    { id: "soy", name: "Soy", image: "/src/assets/soy.jpg" },
    { id: "wheat", name: "Wheat", image: "/src/assets/wheat.jpg" },
    { id: "fish", name: "Fish", image: "/src/assets/fish.jpg" },
    { id: "kosher", name: "Kosher", image: "/src/assets/kosher.jpg" },
    { id: "sesame", name: "Sesame", image: "/src/assets/sesame.jpg" },
    { id: "gluten", name: "Gluten", image: "/src/assets/gluten.jpg" },
    { id: "vegan", name: "Vegan", image: "/src/assets/vegan.jpg" },
    {
      id: "vegetarian",
      name: "Vegetarian",
      image: "/src/assets/vegetarian.jpg",
    },
  ];

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyId)
        ? prev.filter((id) => id !== allergyId)
        : [...prev, allergyId]
    );
  };

  const handleContinue = () => {
    if (!imageData) {
      // If no image data, go back to home
      navigate("/");
      return;
    }

    // Navigate to the picture page with both the image data and allergies
    navigate("/picture", {
      state: { imageData, allergies: selectedAllergies },
    });
  };

  return (
    <ContentContainer>
      <div className="text-center max-w-3xl mx-auto">
        <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all mb-8">
          <h1 className="text-3xl font-bold mb-4 text-green-600">
            Select Your Dietary Preferences
          </h1>

          {!imageData && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg text-yellow-700">
              No image selected. Please go back and take or upload an image of
              your ingredients first.
            </div>
          )}

          <p className="text-lg text-gray-700 mb-4">
            Help us suggest recipes that match your dietary needs by selecting
            any allergies or preferences you have.
          </p>

          {imageData && (
            <div className="mt-4 mb-6 bg-gray-50 rounded-lg p-4 inline-block">
              <div className="text-sm text-gray-500 mb-2">
                Your uploaded image:
              </div>
              <img
                src={imageData}
                alt="Uploaded ingredients"
                className="h-36 object-cover rounded-lg mx-auto"
              />
            </div>
          )}
        </div>
      </div>

      {/* Allergies Grid */}
      <div className="w-full max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {allergensList.map((allergen) => (
            <button
              key={allergen.id}
              onClick={() => toggleAllergy(allergen.id)}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center hover:shadow-md ${
                selectedAllergies.includes(allergen.id)
                  ? "bg-green-50 border-green-600 shadow-md transform scale-105"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-24 h-24 flex items-center justify-center mb-3">
                <img
                  src={allergen.image}
                  alt={allergen.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src =
                      "/api/placeholder/120/120";
                  }}
                />
              </div>
              <span
                className={`text-center font-medium text-lg ${
                  selectedAllergies.includes(allergen.id)
                    ? "text-green-700"
                    : "text-gray-700"
                }`}
              >
                {allergen.name}
              </span>
              <div
                className={`mt-2 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                  selectedAllergies.includes(allergen.id)
                    ? "bg-green-600 border-green-600"
                    : "border-gray-300"
                }`}
              >
                {selectedAllergies.includes(allergen.id) && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
        <Button
          variant="primary"
          onClick={handleContinue}
          className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center"
        >
          Find Recipes
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-white text-green-600 border border-green-600 hover:bg-green-50 flex items-center justify-center"
        >
          Back
        </Button>
      </div>

      {/* Selected Allergies Summary */}
      {selectedAllergies.length > 0 && (
        <div className="mt-8 p-4 bg-white bg-opacity-90 rounded-xl shadow-md max-w-lg mx-auto">
          <h3 className="text-lg font-medium text-green-600 mb-2">
            Your Selected Preferences:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedAllergies.map((allergyId) => {
              const allergen = allergensList.find((a) => a.id === allergyId);
              return (
                <div
                  key={allergyId}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {allergen?.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent button
                      toggleAllergy(allergyId);
                    }}
                    className="ml-1 w-4 h-4 rounded-full bg-green-200 flex items-center justify-center"
                  >
                    <span className="text-green-800">×</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ContentContainer>
  );
};

export { Allergies };
