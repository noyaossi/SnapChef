import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContentContainer } from "../components/ContentContainer";
import { ImagePreview } from "../components/picture/ImagePreview";
import { AnalysisStatus } from "../components/picture/AnalysisStatus";
import { ProductList } from "../components/picture/ProductList";
import { RecipeList } from "../components/picture/RecipeList";
import { RecipeDetail } from "../components/picture/RecipeDetail";
import { NavigationButtons } from "../components/picture/NavigationButtons";
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
        const response = await fetch("http://localhost:3000/api/analyze", {
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
        <ErrorView onNavigateToCamera={handleTakeAnotherPicture} />
        <NavigationButtons
          onTakeAnotherPicture={handleTakeAnotherPicture}
          onBackToHome={handleBackToHome}
        />
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">
          {selectedRecipe ? "Recipe Details" : "Analysis Results"}
        </h1>

        {!selectedRecipe && <ImagePreview imageData={imageData} />}

        <AnalysisStatus isAnalyzing={isAnalyzing} error={error} />

        {!isAnalyzing && !error && results && !selectedRecipe && (
          <>
            <div className="w-full mb-6">
              <h2 className="text-xl font-semibold mb-3">Detected Products</h2>
              <ProductList products={results.detectedProducts} />
            </div>

            <div className="w-full mb-6">
              <h2 className="text-xl font-semibold mb-3">Suggested Recipes</h2>
              <RecipeList
                recipes={results.recipes}
                allergies={allergies}
                onRecipeClick={handleRecipeClick}
              />
            </div>
          </>
        )}

        {selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onBackClick={handleBackToRecipes}
          />
        )}

        <NavigationButtons
          onTakeAnotherPicture={handleTakeAnotherPicture}
          onBackToHome={handleBackToHome}
        />
      </div>
    </ContentContainer>
  );
};
