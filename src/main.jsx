import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Registar from "./components/registar";
import Login from "./components/login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
      children : [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/registar",
          element: <Registar />
        },
        {
          path: "/login",
          element: <Login />
        },
      ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
