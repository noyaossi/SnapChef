import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { ContentContainer } from "./ContentContainer";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to start the camera
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        setStream(mediaStream);

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

    startCamera();

    // Cleanup function to stop the camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

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

        // Navigate to the allergies page with the image data
        navigate("/allergies", { state: { imageData: imageDataUrl } });
      }
    }
  };

  return (
    <ContentContainer>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Camera</h1>

        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : (
          <>
            <div className="relative mb-4 bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="max-w-full h-auto"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex space-x-4">
              <Button variant="primary" onClick={takePicture}>
                Take Product Photo
              </Button>
              <Button variant="secondary" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </>
        )}
      </div>
    </ContentContainer>
  );
};

export { Camera };
