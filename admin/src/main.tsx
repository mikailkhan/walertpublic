import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import { createRoot } from "react-dom/client";
import "./scss/style.scss";
import "./style/index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Dashboard from "./pages/admin/dashboard/Dashboard";
import Login from "./pages/admin/Login";
import Sent from "./pages/admin/messages/Sent";
import Recieved from "./pages/admin/messages/Recieved";
import Product from "./pages/admin/products/Product";
import Customers from "./pages/admin/customers/Customers";
import Errors from "./pages/admin/errors/Errors";
import Websites from "./pages/admin/websites/Websites";
import TrackersReq from "./pages/admin/messages/TrackersReq";

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
        path: `/`,
      },
      {
        element: <TrackersReq />,
        path: `/tracker-requests`,
      },
      {
        element: <Sent />,
        path: `/sent-messages`,
      },
      {
        element: <Recieved />,
        path: `/recieved-messages`,
      },
      {
        element: <Product />,
        path: `/products`,
      },
      {
        element: <Customers />,
        path: `/customers`,
      },
      {
        element: <Websites />,
        path: `/websites`,
      },
      {
        element: <Errors />,
        path: `/errors`,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root")!);

root.render(<RouterProvider router={router} />);
