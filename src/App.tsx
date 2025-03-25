import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col h-screen inset-0">
      <Outlet />
    </div>
  );
};

export default App;
