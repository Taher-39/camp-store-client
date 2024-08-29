import MainLayout from "@/components/Layouts/MainLayouts";
import CartPage from "@/pages/Cart/Cart";
import CheckoutPage from "@/pages/Checkout/Checkout";
import Home from "@/pages/Home/Home";
import ProductDetailsPage from "@/pages/Product/ProductDetails";
import ProductsPage from "@/pages/Product/Products";
import ReturnPolicy from "@/pages/ReturnPolicy";
import NotFound from "@/pages/shared/NotFound";
import SuccessPage from "@/pages/SuccessPage";
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
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
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
