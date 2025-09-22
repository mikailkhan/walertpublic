import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import { createRoot } from "react-dom/client";
import "./scss/style.scss";
import "./style/index.css";
import Home from "./pages/Home";
import About from "./pages/general/about";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <About />,
        path: "/about",
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root")!);

root.render(<RouterProvider router={router} />);
