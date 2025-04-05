import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { ContentContainer } from "../components/ContentContainer";

export const NotFound: React.FC = () => {
  return (
    <ContentContainer>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-8 mb-8 max-w-lg">
          <div className="text-6xl font-bold text-green-600 mb-4">404</div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            variant="primary"
            to="/"
            className="py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700 inline-flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            Back to Home
          </Button>
        </div>
      </div>
    </ContentContainer>
  );
};
