import { useState, useEffect } from "react";
import { AnalysisResults } from "../types/pictureTypes";

export const useImageAnalysis = (
  imageData?: string,
  allergies?: string[]
) => {
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Analyze the image when the hook is called with valid image data
    if (imageData) {
      analyzeImage(imageData, allergies);
    }
  }, [imageData, allergies]);

  const analyzeImage = async (imageData: string, allergies?: string[]) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageData, allergies }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setAnalysisResults(data.results);
      } else {
        setError(data.message || "Failed to analyze image");
      }
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError(
        "Failed to connect to the analysis server. Please try again later."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analysisResults, isAnalyzing, error };
};
