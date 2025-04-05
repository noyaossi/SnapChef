import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import backgroundImage from "../assets/homepage.jpg";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  ); // Default to back camera
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();

  // Detect if user is on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      if (/android|iphone|ipad|ipod|webos/i.test(userAgent)) {
        setIsMobile(true);
      }
    };

    checkIfMobile();
  }, []);

  // Function to stop camera stream
  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // Function to start the camera
  const startCamera = async (mode: "user" | "environment") => {
    // Stop any existing stream first
    stopCameraStream();

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
        audio: false,
      });

      setStream(mediaStream);
      setFacingMode(mode);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Could not access the camera. Please make sure you have granted camera permissions."
      );
    }
  };

  // Initialize camera on component mount
  useEffect(() => {
    startCamera(facingMode);

    // Cleanup function to stop the camera when component unmounts
    return () => {
      stopCameraStream();
    };
  }, []);

  // Add an event listener for before the user navigates away
  useEffect(() => {
    const handleBeforeUnload = () => {
      stopCameraStream();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Handle page navigation in single-page app
    const handleNavigateAway = () => {
      stopCameraStream();
    };

    // Clean up event listeners
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Make sure to stop the stream when component unmounts
      stopCameraStream();
    };
  }, [stream]);

  const switchCamera = () => {
    const newMode = facingMode === "user" ? "environment" : "user";
    startCamera(newMode);
  };

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL (base64 encoded image)
        const imageDataUrl = canvas.toDataURL("image/png");

        // Stop the camera stream before navigating
        stopCameraStream();

        // Navigate to the allergies page with the image data
        navigate("/allergies", { state: { imageData: imageDataUrl } });
      }
    }
  };

  const goBack = () => {
    // Ensure camera is stopped before navigation
    stopCameraStream();
    navigate("/");
  };

  return (
    <div
      className="relative min-h-screen w-full bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-12 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all mb-8">
            <h1 className="text-3xl font-bold mb-4 text-green-600">
              Capture Your Ingredients
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Take a clear photo of your ingredients so our AI can identify them
              and suggest personalized recipes
            </p>
          </div>
        </div>

        {error ? (
          <div className="w-full max-w-2xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-8">
            <div className="text-red-500 p-4 bg-red-50 rounded-lg mb-4">
              {error}
            </div>
            <Button
              variant="primary"
              onClick={() => startCamera(facingMode)}
              className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="w-full max-w-2xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-8">
              <div className="relative rounded-lg overflow-hidden border-4 border-green-500 bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-auto"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Camera Controls */}
              <div className="mt-4 flex justify-center">
                {isMobile && (
                  <button
                    onClick={switchCamera}
                    className="mx-2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                      <path d="M16 21h5v-5"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
              <Button
                variant="primary"
                onClick={takePicture}
                className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center"
              >
                Take Photo
              </Button>
              <Button
                variant="secondary"
                onClick={goBack}
                className="flex-1 text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-white text-green-600 border border-green-600 hover:bg-green-50 flex items-center justify-center"
              >
                Back to Home
              </Button>
            </div>
          </>
        )}

        {/* Tips Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Good Lighting
            </h3>
            <p className="text-gray-600">
              Take photos in well-lit areas for better ingredient recognition
            </p>
          </div>

          <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Clear Arrangement
            </h3>
            <p className="text-gray-600">
              Spread out ingredients so they're clearly visible to the AI
            </p>
          </div>

          <div className="p-6 bg-white bg-opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Stable Position
            </h3>
            <p className="text-gray-600">
              Hold your device steady to ensure a clear, sharp image
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Camera };
