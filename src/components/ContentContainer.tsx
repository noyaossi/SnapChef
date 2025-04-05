import React from "react";
import backgroundImage from "../assets/homepage.jpg";

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  return (
    <div
      className="relative min-h-screen w-full bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundSize: "cover", // This ensures the image covers the entire container
        backgroundPosition: "center", // Centers the image
        backgroundColor: "#f5f5f5", // Background color as fallback
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Content container */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen py-12 px-4 overflow-y-auto antialiased">
        {children}
      </main>
    </div>
  );
};

export { ContentContainer };
