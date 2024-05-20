import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Home from './Home';
import AddRecipe from "./routes/addRecipe";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Home />
  },
  {
      path: '/addRecipe',
      element: <AddRecipe />
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);
