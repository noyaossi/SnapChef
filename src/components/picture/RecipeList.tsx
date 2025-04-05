import React from "react";
import { Recipe } from "../../types/pictureTypes";

interface RecipeListProps {
  recipes: Recipe[];
  allergies?: string[];
  onRecipeClick: (recipe: Recipe) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  allergies,
  onRecipeClick,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-600 mb-4">
        Recipe Suggestions
      </h2>

      {allergies && allergies.length > 0 && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700 mb-1 font-medium">
            Recipes filtered for your dietary preferences:
          </p>
          <div className="flex flex-wrap gap-1">
            {allergies.map((allergy) => (
              <span
                key={allergy}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}

      {recipes.length > 0 ? (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 border rounded-lg bg-white hover:shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
              onClick={() => onRecipeClick(recipe)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg text-green-700">
                  {recipe.name}
                </h3>
                <div className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-lg">
                  {recipe.difficulty}
                </div>
              </div>

              <div className="flex flex-wrap text-sm text-gray-600 mt-2 gap-x-4">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Prep: {recipe.prepTime}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Cook: {recipe.cookTime}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Serves: {recipe.servings}
                </span>
              </div>

              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">
                  Main Ingredients:
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {recipe.ingredients.slice(0, 6).map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                  {recipe.ingredients.length > 6 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{recipe.ingredients.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3 text-blue-600 text-sm font-medium flex items-center">
                <span>View full recipe</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 border rounded-lg bg-white text-center">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-gray-600 font-medium">
            No recipes found for the detected products.
          </p>
          <p className="text-gray-500 mt-1">
            Try another image with different ingredients!
          </p>
        </div>
      )}
    </div>
  );
};
