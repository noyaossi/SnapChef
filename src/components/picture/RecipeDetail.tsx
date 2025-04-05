import React from "react";
import { Recipe } from "../../types/pictureTypes";
import { Button } from "../Button";

interface RecipeDetailProps {
  recipe: Recipe;
  onBackClick: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onBackClick,
}) => {
  return (
    <div className="w-full">
      {/* Recipe Info - Removed duplicate title */}
      <div className="mb-6 text-center">
        <div className="flex flex-wrap justify-center gap-6 text-gray-600">
          <div className="flex flex-col items-center">
            <span className="text-sm uppercase text-gray-500">Prep Time</span>
            <span className="font-medium">{recipe.prepTime}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm uppercase text-gray-500">Cook Time</span>
            <span className="font-medium">{recipe.cookTime}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm uppercase text-gray-500">Servings</span>
            <span className="font-medium">{recipe.servings}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm uppercase text-gray-500">Difficulty</span>
            <span className="font-medium">{recipe.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Ingredients Section */}
        <div className="md:w-1/3">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg text-green-700 mb-3 pb-2 border-b border-green-200">
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <div className="min-w-5 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
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
                  </div>
                  <span className="ml-2 text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Allergen Information */}
          {recipe.allergens.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">
                Allergen Information:
              </h3>
              <div className="flex flex-wrap gap-1">
                {recipe.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Instructions Section */}
        <div className="md:w-2/3">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg text-gray-700 mb-3 pb-2 border-b border-gray-200">
              Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="flex items-center justify-center w-7 h-7 bg-green-600 text-white rounded-full text-sm font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Button
          variant="secondary"
          onClick={onBackClick}
          className="py-3 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all bg-white text-green-600 border border-green-600 hover:bg-green-50 inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back to All Recipes
        </Button>
      </div>
    </div>
  );
};
