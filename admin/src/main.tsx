import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import { createRoot } from "react-dom/client";
import "./scss/style.scss";
import "./style/index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      // Admin
      {
        element: <Login />,
        path: `/login`,
      },
      {
        element: <Dashboard />,
        path: `/dashboard`,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root")!);

root.render(<RouterProvider router={router} />);
