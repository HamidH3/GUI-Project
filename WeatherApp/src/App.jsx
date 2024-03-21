import { useState } from "react";
import "./App.css";
import Home from "/routes/Home";
import PopUp from "/routes/Popup.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/routes/Popup.jsx",
      element: <PopUp />,
    },
    {
      path: "src/components/map.jsx",
      element: <Map />,
    },
  ]);

  return (
    <div className = "app">
      
      <RouterProvider router={router} />
    </div>
  );
}


export default App;
