import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Picture } from "./pages/Picture";
import { Camera } from "./components/Camera";
import { ImageUpload } from "./components/ImageUpload";
import { Allergies } from "./components/Allergies";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

export const browserRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/camera",
        element: <Camera />,
      },
      {
        path: "/upload",
        element: <ImageUpload />,
      },
      {
        path: "/allergies",
        element: <Allergies />,
      },
      {
        path: "/picture",
        element: <Picture />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
