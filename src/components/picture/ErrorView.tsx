import React from "react";
import { Button } from "../Button";
import { ContentContainer } from "../ContentContainer";

interface ErrorViewProps {
  onNavigateToCamera: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ onNavigateToCamera }) => {
  return (
    <ContentContainer>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500 mb-4">
          No image data found. Please take a picture first.
        </p>
        <Button variant="primary" onClick={onNavigateToCamera}>
          Go to Camera
        </Button>
      </div>
    </ContentContainer>
  );
};
