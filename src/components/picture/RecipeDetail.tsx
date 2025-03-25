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
    <div className="mb-6 w-full p-4 bg-white rounded-lg border">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">{recipe.name}</h2>
          <div className="text-sm text-gray-600">
            <span className="mr-3">Prep: {recipe.prepTime}</span>
            <span className="mr-3">Cook: {recipe.cookTime}</span>
            <span>Serves: {recipe.servings}</span>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Difficulty: {recipe.difficulty}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="text-gray-700">
              {instruction}
            </li>
          ))}
        </ol>
      </div>

      {recipe.allergens.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
          <h3 className="font-medium text-yellow-800 mb-1">
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

      <Button variant="secondary" onClick={onBackClick} className="mt-2">
        Back to Results
      </Button>
    </div>
  );
};
