import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ContentContainer } from "./ContentContainer";
import { Button } from "./Button";

interface AllergiesProps {}

const Allergies: React.FC<AllergiesProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageData = location.state?.imageData as string;
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const allergensList = [
    { id: "dairy", name: "Dairy" },
    { id: "eggs", name: "Eggs" },
    { id: "peanuts", name: "Peanuts" },
    { id: "treeNuts", name: "Tree Nuts" },
    { id: "soy", name: "Soy" },
    { id: "wheat", name: "Wheat" },
    { id: "fish", name: "Fish" },
    { id: "shellfish", name: "Shellfish" },
    { id: "gluten", name: "Gluten" },
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
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Select Your Allergies</h1>

        {!imageData && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg text-yellow-700">
            No image selected. Please go back and take or upload a product image
            first.
          </div>
        )}

        <p className="text-gray-600 mb-6 text-center">
          Help us suggest recipes that are safe for you by selecting any
          allergies or dietary restrictions you have.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 w-full max-w-md">
          {allergensList.map((allergen) => (
            <button
              key={allergen.id}
              onClick={() => toggleAllergy(allergen.id)}
              className={`p-3 rounded-lg border transition-colors ${
                selectedAllergies.includes(allergen.id)
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 mr-2 rounded-full border ${
                    selectedAllergies.includes(allergen.id)
                      ? "bg-green-500 border-green-500"
                      : "border-gray-400"
                  }`}
                >
                  {selectedAllergies.includes(allergen.id) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
                {allergen.name}
              </div>
            </button>
          ))}
        </div>

        <div className="flex space-x-4">
          <Button variant="primary" onClick={handleContinue}>
            Continue
          </Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </ContentContainer>
  );
};

export { Allergies };
