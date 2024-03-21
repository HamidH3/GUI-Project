import { useState } from "react";
import "./App.css";
import Home from "/routes/Home";
import PopUp from "/routes/Popup.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/*This is the main page that allows for the system to navigate 
through pages using router-dom*/
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
  ]);

  return (
    <div className = "app">
      
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
