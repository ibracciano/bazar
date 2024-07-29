import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Cart from "./routes/Cart";
import Product from "./routes/Product";
import Login from "./routes/Login";
import DashboardLayout from "./routes/admin/DashboardLayout";
import Dashboard from "./routes/admin/Dashboard";
import AddProduct from "./routes/admin/AddProduct";
import Purchases from "./routes/admin/Purchases";
import { isAdmin } from "./utils/hook";
import PaymentDone from "./routes/PaymentDone";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "payment",
        element: <PaymentDone />,
      },

      {
        path: "dashboard",
        // Verifier si l'utilisation es connecté avant d'afficher le admin
        loader: isAdmin,
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "purchases",
            element: <Purchases />,
          },
        ],
      }
    ],

  },
]);

const App = () => {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;