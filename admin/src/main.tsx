import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layouts/Layout";
import { createRoot } from "react-dom/client";
import "./scss/style.scss";
import "./style/index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Dashboard from "./pages/admin/dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Sent from "./pages/admin/messages/Sent";
import Recieved from "./pages/admin/messages/Recieved";
import Product from "./pages/admin/products/Product";
import Customers from "./pages/admin/customers/Customers";
import Errors from "./pages/admin/errors/Errors";
import Websites from "./pages/admin/websites/Websites";
import TrackersReq from "./pages/admin/messages/TrackersReq";
import Add from "./pages/admin/websites/Add";
import Protected from "./pages/layouts/Protected";
import InverseProtected from "./pages/layouts/InverseProtected";

import { store } from "./redux/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    element: <Protected />,
    path: "/",
    children: [
      // Protected
      {
        element: <Layout />,
        children: [
          {
            element: <Dashboard />,
            index: true,
          },
          {
            element: <TrackersReq />,
            path: `tracker-requests`,
          },
          {
            element: <Sent />,
            path: `sent-messages`,
          },
          {
            element: <Recieved />,
            path: `recieved-messages`,
          },
          {
            element: <Product />,
            path: `products`,
          },
          {
            element: <Customers />,
            path: `customers`,
          },
          {
            element: <Websites />,
            path: `websites`,
          },
          {
            element: <Add />,
            path: `websites-add`,
          },
          {
            element: <Errors />,
            path: `errors`,
          },
        ],
      },
    ],
  },

  // Inverse Protected

  {
    element: (
      // <InverseProtected>
      <Login />
      // </InverseProtected>
    ),
    path: `login`,
  },
]);

const root = createRoot(document.getElementById("root")!);

root.render(<RouterProvider router={router} />);
