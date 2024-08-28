import MainLayout from "@/components/Layouts/MainLayouts";
import Home from "@/pages/Home/Home";
import ProductsPage from "@/pages/Products/Products";
import ReturnPolicy from "@/pages/ReturnPolicy";
import NotFound from "@/pages/shared/NotFound";
import TrackOrder from "@/pages/TrackOrder";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/product/:id",
        element: null,
      },
      {
        path: "/return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "/track-order",
        element: <TrackOrder />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
