import React from "react";
import { Button } from "../Button";

interface ErrorViewProps {
  onNavigateToCamera: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ onNavigateToCamera }) => {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="bg-red-100 rounded-full p-4 mb-4">
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-3 text-red-600">No Image Found</h1>
      <p className="text-gray-700 mb-6 max-w-md">
        It looks like you haven't taken or uploaded an image of your ingredients
        yet. Start by taking a photo so we can suggest recipes for you.
      </p>
      <Button
        variant="primary"
        onClick={onNavigateToCamera}
        className="py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        Take a Photo Now
      </Button>
    </div>
  );
};
