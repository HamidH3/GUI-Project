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
  ]);

  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  );
}
// const [count, setCount] = useState(0);
// const api = {
//   key: "c8ffc42e99e658f8b2a37c1adff8e908",
//   base: "https://api.openweathermap.org/data/2.5",
// };

// return (
//   <>
//     <div className="App">
//       {/* THIS IS BACKGROUND IMAGE */}
//       <HourlyForecast />
//       {/* THIS IS BACKGROUND IMAGE */}
//       <Background />
//     </div>
//   </>
// );

export default App;
