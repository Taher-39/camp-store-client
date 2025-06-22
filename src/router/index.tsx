import IndivisualCategory from "@/components/CategoriesSection/IndivisualCategory";
import MainLayout from "@/components/Layouts/MainLayouts";
import { ProtectedRoute } from "@/components/Layouts/ProtectedRoute";
import AboutUsPage from "@/pages/AboutUs/AboutUs";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import VerificationPage from "@/pages/Auth/VarificationPage";
import CartPage from "@/pages/Cart/Cart";
import CheckoutPage from "@/pages/Checkout/Checkout";
import ContactUs from "@/pages/ContactUs";
import CouponManagement from "@/pages/CouponManagement/CouponManagement";
import Home from "@/pages/Home/Home";
import Orders from "@/pages/Order/Order";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ProductDetailsPage from "@/pages/Product/ProductDetails";
import ProductsPage from "@/pages/Product/Products";
import ProductManagementPage from "@/pages/ProductManagement/ProductManagement";
import ProfilePage from "@/pages/Profile/Profile";
import ReturnPolicy from "@/pages/ReturnPolicy";
import NotFound from "@/pages/shared/NotFound";
import SettingsLayout from "@/pages/shared/SettingsLayout";
import SuccessPage from "@/pages/SuccessPage";
import TermsAndConditions from "@/pages/TermsAndConditions";
import TrackOrder from "@/pages/TrackOrder";
import Wishlist from "@/pages/Wishlist";
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify",
        element: <VerificationPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/admin/orders",
        element: (
          <ProtectedRoute requiredRoles={["admin", "super_admin", "modaretor"]}>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <ProtectedRoute requiredRoles={["customer"]}>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account/profile",
        element: (
          <ProtectedRoute
            requiredRoles={["admin", "super_admin", "modaretor", "customer"]}
          >
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account/settings",
        element: (
          <ProtectedRoute
            requiredRoles={["admin", "super_admin", "modaretor", "customer"]}
          >
            <SettingsLayout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/product-management",
        element: (
          <ProtectedRoute requiredRoles={["admin", "super_admin", "modaretor"]}>
            <ProductManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/coupon-management",
        element: (
          <ProtectedRoute requiredRoles={["admin", "super_admin", "modaretor"]}>
            <CouponManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/category",
        element: <IndivisualCategory />,
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
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/track-order",
        element: (
          <ProtectedRoute
            requiredRoles={["admin", "super_admin", "modaretor", "customer"]}
          >
            <TrackOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
