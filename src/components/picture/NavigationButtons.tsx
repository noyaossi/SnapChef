import React from "react";
import { Button } from "../Button";

interface NavigationButtonsProps {
  onTakeAnotherPicture: () => void;
  onBackToHome: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onTakeAnotherPicture,
  onBackToHome,
}) => {
  return (
    <div className="flex space-x-4">
      <Button variant="primary" onClick={onTakeAnotherPicture}>
        Take Another Picture
      </Button>
      <Button variant="secondary" onClick={onBackToHome}>
        Back to Home
      </Button>
    </div>
  );
};
