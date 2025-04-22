import React from "react";
import backgroundImage from "../assets/newBackground.jpeg";

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full">
      {/* Background container */}
      <div
        className="fixed inset-0 bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundColor: "#f5f5f5", // Fallback color
          height: "100vh", // Ensure it covers full height
          width: "100vw", // Ensure it covers full width
        }}
      />

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-10 z-0"></div>

      {/* Content container */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4 overflow-y-auto antialiased">
        {children}
      </main>
    </div>
  );
};

export { ContentContainer };
