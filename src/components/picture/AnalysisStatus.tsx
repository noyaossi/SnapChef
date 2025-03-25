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

  return isAnalyzing ? (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg w-full">
      <p className="text-blue-600">Analyzing image...</p>
    </div>
  ) : error ? (
    <div className="mb-6 p-4 bg-red-50 rounded-lg w-full">
      <p className="text-red-600">{error}</p>
    </div>
  ) : null;
};
