import React from "react";

interface AnalysisStatusProps {
  isAnalyzing: boolean;
  error: string | null;
}

export const AnalysisStatus: React.FC<AnalysisStatusProps> = ({
  isAnalyzing,
  error,
}) => {
  if (!isAnalyzing && !error) {
    return null;
  }

  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-8 w-full">
      {isAnalyzing ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
          <p className="text-green-600 font-medium text-lg">
            Analyzing your ingredients...
          </p>
          <p className="text-gray-600 mt-2 text-center">
            Our AI is identifying ingredients and finding the perfect recipes
            for you
          </p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-red-600 font-semibold mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600">{error}</p>
          <p className="text-gray-700 mt-2">
            Please try again or use a different image with clearer ingredients
          </p>
        </div>
      ) : null}
    </div>
  );
};
