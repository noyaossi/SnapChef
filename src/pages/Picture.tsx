import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ContentContainer } from "../components/ContentContainer";
import { ImagePreview } from "../components/picture/ImagePreview";
import { AnalysisStatus } from "../components/picture/AnalysisStatus";
import { ProductList } from "../components/picture/ProductList";
import { RecipeList } from "../components/picture/RecipeList";
import { RecipeDetail } from "../components/picture/RecipeDetail";
import { ErrorView } from "../components/picture/ErrorView";
import { LocationState, AnalysisResults, Recipe } from "../types/pictureTypes";

export const Picture: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Get image data and allergies from location state
  const state = location.state as LocationState | undefined;
  const imageData = state?.imageData;
  const allergies = state?.allergies || [];

  useEffect(() => {
    // If no image data, don't proceed
    if (!imageData) {
      return;
    }

    const analyzeImage = async () => {
      setIsAnalyzing(true);
      setError(null);

      try {
        // Use relative URL to work with ngrok and localhost
        const apiUrl = "/api/analyze";
        console.log("Sending request to:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageData,
            allergies,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Unknown error occurred");
        }

        setResults(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to analyze image"
        );
        console.error("Error analyzing image:", err);
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeImage();
  }, [imageData, allergies]);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToRecipes = () => {
    setSelectedRecipe(null);
  };

  const handleTakeAnotherPicture = () => {
    navigate("/upload");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // If no image data, show error
  if (!imageData) {
    return (
      <ContentContainer>
        <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all mb-8 max-w-2xl w-full">
          <ErrorView onNavigateToCamera={handleTakeAnotherPicture} />
        </div>
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
          <Button
            variant="primary"
            onClick={handleTakeAnotherPicture}
            className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center"
          >
            Take Another Picture
          </Button>
          <Button
            variant="secondary"
            onClick={handleBackToHome}
            className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-white text-green-600 border border-green-600 hover:bg-green-50 flex items-center justify-center"
          >
            Back to Home
          </Button>
        </div>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <div className="text-center max-w-4xl mx-auto w-full">
        <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all mb-8">
          <h1 className="text-3xl font-bold mb-4 text-green-600">
            {selectedRecipe ? selectedRecipe.name : "Your Recipe Matches"}
          </h1>
          {!selectedRecipe && (
            <p className="text-lg text-gray-700 mb-4">
              Based on your ingredients, we've found some delicious recipes for
              you to try
            </p>
          )}
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        {!selectedRecipe && (
          <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-8">
            <ImagePreview imageData={imageData} />
          </div>
        )}

        <AnalysisStatus isAnalyzing={isAnalyzing} error={error} />

        {!isAnalyzing && !error && results && !selectedRecipe && (
          <>
            <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-8">
              <ProductList products={results.detectedProducts} />
            </div>

            <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-8">
              <RecipeList
                recipes={results.recipes}
                allergies={allergies}
                onRecipeClick={handleRecipeClick}
              />
            </div>
          </>
        )}

        {selectedRecipe && (
          <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-8">
            <RecipeDetail
              recipe={selectedRecipe}
              onBackClick={handleBackToRecipes}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
          <Button
            variant="primary"
            onClick={handleTakeAnotherPicture}
            className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center"
          >
            Take Another Picture
          </Button>
          <Button
            variant="secondary"
            onClick={handleBackToHome}
            className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-white text-green-600 border border-green-600 hover:bg-green-50 flex items-center justify-center"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </ContentContainer>
  );
};
