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
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Recipe Suggestions</h2>
      {allergies && allergies.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Filtered for your allergies:
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
              className="p-4 border rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => onRecipeClick(recipe)}
            >
              <h3 className="font-medium text-lg">{recipe.name}</h3>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Prep: {recipe.prepTime}</span>
                <span>Cook: {recipe.cookTime}</span>
                <span>Difficulty: {recipe.difficulty}</span>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium">Ingredients:</p>
                <p className="text-sm text-gray-600">
                  {recipe.ingredients.slice(0, 4).join(", ")}
                  {recipe.ingredients.length > 4 &&
                    ` and ${recipe.ingredients.length - 4} more`}
                </p>
              </div>
              <div className="mt-2 text-blue-600 text-sm font-medium">
                Click for full recipe
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No recipes found for the detected products. Try another image!
        </p>
      )}
    </div>
  );
};
