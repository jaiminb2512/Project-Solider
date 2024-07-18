import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/routes/homePage/homePage";
import ListPage from "./components/routes/listPage/listPage";
import Layout from "./components/routes/layout/layout";
import SinglePage from "./components/routes/singlePage/singlePage";
import ProfilePage from "./components/routes/profilePage/profilePage";
import "./index.scss";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />
        },
        {
          path: "/:id",
          element: <SinglePage />
        },
        {
          path: "/profile",
          element: <ProfilePage />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}>
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Route />
        </div>
      </div>
    </RouterProvider>
  );
}

export default App;
