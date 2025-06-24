import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/features/Auth/authSlice";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart/cartSlice";
import Sidebar from "@/components/Sidebar/Sidebar";
import halalZoneLogo from "@/assets/logo.png";
import halalZoneCicleLogo from "@/assets/circle_logo.png";
import OrderConfirmationModal from "../Order/OrderConfirmationModal";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const authUser = useAppSelector(useCurrentUser);
  const cartItems = useAppSelector((state) => state.cart.items);

  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs for closing dropdowns when clicking outside
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // Categories data
  // const categories = [
  //   // "Mango",
  //   // "Mustard Oil",
  //   // "Ghee",
  //   // "Dates",
  //   // "Honey",
  //   // "Spices",
  //   // "Nuts & Seeds",
  //   // "Tea/Coffee",
  //   // "Dry Fruits",
  // ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }

      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cart total calculation
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Handle cart item quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ _id: id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleOrderClick = () => {
    if (!authUser) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      {/* <div className="bg-[#9EA647] text-white text-center py-2 px-4 text-sm">
        🚚 Free delivery on orders over 1000৳ | 📞 Call us: +8801516-559515
      </div> */}

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="p-2">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            <Link to="/" className="flex items-center">
              <img src={halalZoneCicleLogo} alt="Halal Zone" className="h-10" />
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="p-2"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="p-2 relative"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {cartQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartQuantity}
                    </span>
                  )}
                </button>

                {/* Mobile Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4">
                      <div className="flex justify-between items-center border-b pb-3">
                        <h3 className="font-medium">
                          Your Cart ({cartQuantity})
                        </h3>
                        <button onClick={() => setIsCartOpen(false)}>
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {cartItems.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                          Your cart is empty
                        </div>
                      ) : (
                        <>
                          <div className="max-h-60 overflow-y-auto py-2">
                            {cartItems.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center py-3 border-b"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="ml-3 flex-1">
                                  <h4 className="text-sm font-medium">
                                    {item.name}
                                  </h4>
                                  <div className="flex items-center mt-1">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item._id,
                                          item.quantity - 1
                                        )
                                      }
                                      className="w-6 h-6 border rounded flex items-center justify-center"
                                    >
                                      -
                                    </button>
                                    <span className="mx-2">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item._id,
                                          item.quantity + 1
                                        )
                                      }
                                      className="w-6 h-6 border rounded flex items-center justify-center"
                                    >
                                      +
                                    </button>
                                    <span className="ml-auto font-medium">
                                      ৳{item.price * item.quantity}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t">
                            <div className="flex justify-between font-medium mb-4">
                              <span>Total:</span>
                              <span>৳{cartTotal}</span>
                            </div>
                            <Link
                              to="/cart"
                              className="block w-full bg-[#9EA647] text-white text-center py-2 rounded-lg hover:bg-[#818a27] transition"
                              onClick={() => setIsCartOpen(false)}
                            >
                              View Cart
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Top Bar */}
          <div className="hidden md:flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={halalZoneCicleLogo} alt="Halal Zone" className="h-12" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Halal Zone
              </span>
            </Link>

            {/* Search Bar */}
            <div className="relative mx-4 flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search for halal products..."
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
              />
              <button className="absolute right-3 top-2.5 text-gray-500">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {authUser ? (
                <div className="relative" ref={accountMenuRef}>
                  <button
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-[#9EA647]"
                  >
                    <User className="w-5 h-5" />
                    <span>Account</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isAccountMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Account Dropdown */}
                  {isAccountMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b text-sm text-gray-700">
                          {authUser?.email}{" "}
                        </div>
                        {authUser?.role &&
                          ["super_admin", "admin", "modaretor"].includes(
                            authUser.role
                          ) && (
                            <>
                              <Link
                                to="/admin/product-management"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                P.Management
                              </Link>
                              <Link
                                to="/admin/orders"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Orders
                              </Link>
                            </>
                          )}
                        {authUser?.role === "customer" && (
                          <>
                            <Link
                              to="/my-orders"
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              My Orders
                            </Link>
                            <Link
                              to="/track-order"
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Track Order
                            </Link>
                          </>
                        )}
                        <Link
                          to="/account/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/account/settings"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#9EA647]"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}

              {/* Cart */}
              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#9EA647] relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartQuantity}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4">
                      <div className="flex justify-between items-center border-b pb-3">
                        <h3 className="font-medium">
                          Your Cart ({cartQuantity})
                        </h3>
                        <button onClick={() => setIsCartOpen(false)}>
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {cartItems.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                          Your cart is empty
                        </div>
                      ) : (
                        <>
                          <div className="max-h-60 overflow-y-auto py-2">
                            {cartItems.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center py-3 border-b"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="ml-3 flex-1">
                                  <h4 className="text-sm font-medium">
                                    {item.name}
                                  </h4>
                                  <div className="flex items-center mt-1">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item._id,
                                          item.quantity - 1
                                        )
                                      }
                                      className="w-6 h-6 border rounded flex items-center justify-center"
                                    >
                                      -
                                    </button>
                                    <span className="mx-2">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item._id,
                                          item.quantity + 1
                                        )
                                      }
                                      className="w-6 h-6 border rounded flex items-center justify-center"
                                    >
                                      +
                                    </button>
                                    <button
                                      onClick={() => handleRemoveItem(item._id)}
                                      className="ml-2 text-xs text-red-500 hover:text-red-700"
                                    >
                                      Remove
                                    </button>
                                    <span className="ml-auto font-medium">
                                      ৳{item.price * item.quantity}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t">
                            <div className="flex justify-between font-medium mb-4">
                              <span>Total:</span>
                              <span>৳{cartTotal}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <Link
                                to="/cart"
                                className="bg-white border border-[#9EA647] text-[#9EA647] py-2 rounded-lg hover:bg-gray-50 transition text-center"
                                onClick={() => setIsCartOpen(false)}
                              >
                                কার্ট দেখুন 
                              </Link>
                              {/* <Link
                                to="/checkout"
                                className="bg-[#9EA647] text-white py-2 rounded-lg hover:bg-[#818a27] transition text-center"
                                onClick={() => setIsCartOpen(false)}
                              >
                                চেক আউট
                              </Link> */}
                              <button
                                className="bg-[#9EA647] text-white py-2 rounded-lg hover:bg-[#818a27] transition text-center"
                                onClick={handleOrderClick}
                              >
                                অর্ডার করুন
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Categories Navigation - Desktop */}
          {/* <div className="hidden md:flex justify-center mt-4">
            <nav className="flex space-x-6">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="py-2 text-gray-700 hover:text-[#9EA647] font-medium transition"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div> */}
        </div>

        {/* Mobile Menu Button */}
        {/* <button 
        className="sm:hidden p-2"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button> */}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="absolute left-0 top-0 h-full w-4/5 bg-white shadow-lg">
              <div className="p-4 border-b flex justify-between items-center">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <img src={halalZoneLogo} alt="Halal Zone" className="h-10" />
                </Link>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Render Sidebar content directly in mobile menu */}
              <div className="h-[calc(100%-64px)] overflow-y-auto">
                <Sidebar mobileView onLinkClick={() => setIsMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Search */}
        {isMobileSearchOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="p-4 border-b flex items-center">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="mr-3"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for halal products..."
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* <div className="p-4">
              <h3 className="font-medium mb-2">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Honey",
                  "Ghee",
                  "Dates",
                  "Mustard Oil",
                  "Organic",
                  "Spices",
                ].map((term, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    onClick={() => {
                      // Handle search
                      setIsMobileSearchOpen(false);
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        )}

        <OrderConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </header>
    </>
  );
}

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   ShoppingCart,
//   LogIn,
//   UserPlus,
//   Menu,
//   X,
//   Search,
//   LogOut,
//   User,
//   ChevronUp,
//   UserCircle,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import camplogo from "@/assets/campVectorLogo.png";
// import { RootState } from "@/redux/store";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { logout } from "@/redux/features/Auth/authSlice";
// import OrderConfirmationModal from "../Order/OrderConfirmationModal";
// import { toast } from "sonner";
// import {
//   removeItemFromCart,
//   updateCartItemQuantity,
// } from "@/redux/features/cart/cartSlice";
// import DeleteConfirmationModal from "@/utils/DeleteConfirmation";
// import { baseApi } from "@/redux/api/baseApi";

// export default function Navbar() {
//   const dispatch = useAppDispatch();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
//   const [isNavbarVisible, setIsNavbarVisible] = useState(true);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [lastScrollTop, setLastScrollTop] = useState(0);
//   const cartItems = useAppSelector((state: RootState) => state.cart.items);
//   const { user } = useAppSelector((state) => state.auth);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
//     id: string;
//   } | null>(null);
//   const [isHoveringCart, setIsHoveringCart] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);

//   const location = useLocation();
//   const isLoginPage = location.pathname === "/login";
//   const isRegisterPage = location.pathname === "/register";

//   const linkPath = isLoginPage
//     ? "/register"
//     : isRegisterPage
//     ? "/login"
//     : "/login";
//   const linkText = isLoginPage
//     ? "Register"
//     : isRegisterPage
//     ? "Login"
//     : "Login";

//   const TooltipText = linkText;
//   const Icon = isLoginPage ? UserPlus : LogIn;
//   const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollTop =
//         window.pageYOffset || document.documentElement.scrollTop;
//       if (currentScrollTop > lastScrollTop) {
//         setIsNavbarVisible(false);
//       } else {
//         setIsNavbarVisible(true);
//       }
//       setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollTop]);

//   // Add these handlers
//   const handleCartMouseEnter = () => {
//     setIsHoveringCart(true);
//   };

//   const handleCartMouseLeave = () => {
//     setIsHoveringCart(false);
//     if (cartItems.length === 0) {
//       setIsCartDialogOpen(false);
//     }
//   };

//   // Modify the useEffect
//   useEffect(() => {
//     if (cartItems.length === 0 && !isHoveringCart) {
//       setIsCartDialogOpen(false);
//     }
//   }, [cartItems, isHoveringCart]);

//   const popularSearches = [
//     "Organic",
//     "Oil",
//     "Honey",
//     "Nuts & Seeds",
//     "Tea/Coffee",
//     "3KG",
//   ];

//   const menuCategories = [
//     "OFFER",
//     "Best Seller",
//     "Mustard Oil",
//     "Ghee (ঘি)",
//     "Dates (খেজুর)",
//     "খেজুর গুড়",
//     "Honey",
//     "Masala",
//     "Nuts & Seeds",
//     "Tea/Coffee",
//   ];
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     dispatch(logout());
//     setIsMenuOpen(false);
//     dispatch(baseApi.util.resetApiState()); // ✅ RTK Query cached data reset
//     // optional:
//     localStorage.clear(); // If you want to fully clear tokens/data
//     navigate("/login");
//   };

//   const handleQuantityChange = (_id: string, newQuantity: number) => {
//     dispatch(updateCartItemQuantity({ _id, quantity: newQuantity }));
//   };

//   const handleRemoveItem = (id: string) => {
//     dispatch(removeItemFromCart(id));
//   };

//   const handleOrderClick = () => {
//     if (!user) {
//       // Not logged in, redirect to login with "from"
//       navigate("/login", { state: { from: location.pathname } });
//       return;
//     }

//     setIsModalOpen(true); // Show order modal
//   };

//   const handleOnlinePayment = () => {
//     toast.success("Online Payment Coming Soon.");
//   };

//   const isOrderPage = location.pathname === "/account/orders";
//   const isSettingsPage = location.pathname === "/account/settings";
//   const isProfilePage = location.pathname === "/account/profile";

//   if (isOrderPage || isSettingsPage || isProfilePage) {
//     return (
//       <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
//         <div className="flex items-center gap-2">
//           <Link to="/" className="flex items-center md:ml-0 mx-auto md:mx-0">
//             <img src={camplogo} alt="Camp Logo" className="w-10 h-10 mr-2" />
//             <span className="text-xl font-bold text-gray-800 hidden md:block">
//               Halal-Zone
//             </span>
//           </Link>
//         </div>
//         <nav className="flex items-center gap-4">
//           {user?.role &&
//             ["super_admin", "admin", "modaretor"].includes(user.role) && (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowMenu(!showMenu)}
//                   className="text-black hover:underline"
//                 >
//                   Management
//                 </button>

//                 {showMenu && (
//                   <div className="absolute bg-white shadow-md mt-1 rounded border w-48 z-10">
//                     <button
//                       onClick={() => {
//                         navigate("/account/product-management");
//                         setShowMenu(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Product Management
//                     </button>
//                     <button
//                       onClick={() => {
//                         navigate("/account/coupon-management");
//                         setShowMenu(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Coupon Management
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           <button
//             onClick={() => navigate("/account/orders")}
//             className="text-black hover:underline"
//           >
//             Orders
//           </button>
//           <button
//             onClick={() => navigate("/track-order")}
//             className="text-black hover:underline"
//           >
//             Track-Order
//           </button>
//           <div className="relative">
//             <button
//               onClick={() => setOpen(!open)}
//               className="flex items-center gap-1"
//             >
//               <UserCircle className="w-6 h-6" />
//               <ChevronUp
//                 className={`w-4 h-4 transition-transform ${
//                   open ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//             {open && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-10">
//                 <div className="px-4 py-2 border-b text-sm text-gray-700">
//                   {user?.email}
//                 </div>
//                 <ul className="text-sm">
//                   <li>
//                     <Link
//                       to="/account/profile"
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/account/settings"
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Settings
//                     </Link>
//                   </li>
//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
//                     >
//                       Log out
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>
//     );
//   }

//   return (
//     <header
//       className={`bg-white shadow-md sticky top-0 z-40 transition-transform duration-300 ${
//         isNavbarVisible
//           ? "transform translate-y-0"
//           : "transform -translate-y-full"
//       }`}
//     >
//       {/* Top Navigation Bar */}
//       <div className="container mx-auto flex items-center justify-between py-3 px-4 relative">
//         {/* Mobile Menu Button (Left side) */}
//         <button
//           onClick={() => setIsMenuOpen(true)}
//           className="md:hidden text-gray-600 hover:text-[#9EA647] group relative"
//           aria-label="Open menu"
//         >
//           <Menu className="w-6 h-6" />
//           <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
//             Menu
//           </span>
//         </button>

//         {/* Logo (Center on mobile, left on desktop) */}
//         <Link to="/" className="flex items-center md:ml-0 mx-auto md:mx-0">
//           <img src={camplogo} alt="Camp Logo" className="w-10 h-10 mr-2" />
//           <span className="text-xl font-bold text-gray-800 hidden md:block">
//             Halal-Zone
//           </span>
//         </Link>

//         {/* Search Bar (Center when expanded) */}
//         {isSearchOpen ? (
//           <div className="absolute left-0 right-0 mx-auto w-full px-4 md:px-20 z-50 bg-white py-2 shadow-md">
//             <div className="relative flex items-center">
//               <input
//                 type="text"
//                 placeholder="Search products"
//                 className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
//                 autoFocus
//               />
//               <Search className="w-5 h-5 absolute left-3 text-gray-400" />
//               <button
//                 onClick={() => setIsSearchOpen(false)}
//                 className="absolute right-3 text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="mt-2 text-sm text-gray-600">
//               <span className="font-medium">Popular Searches: </span>
//               {popularSearches.map((item, index) => (
//                 <span
//                   key={index}
//                   className="mr-2 last:mr-0 hover:text-[#9EA647] cursor-pointer underline"
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsSearchOpen(true)}
//             className="md:hidden text-gray-600 hover:text-[#9EA647] group relative"
//             aria-label="Search"
//           >
//             <Search className="w-6 h-6" />
//             <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
//               Search
//             </span>
//           </button>
//         )}

//         {/* Desktop Search (Hidden on mobile) */}
//         <div className="hidden md:flex flex-1 max-w-xl mx-4">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search products"
//               className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
//             />
//             <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
//           </div>
//         </div>

//         {/* Desktop Navigation (Right side) */}
//         <div className="hidden md:flex items-center space-x-6">
//           {user?.email ? (
//             <div className="group relative">
//               <Link
//                 to="/account/orders"
//                 className="text-gray-600 hover:text-[#9EA647] transition-colors duration-300 flex items-center"
//               >
//                 <User className="w-5 h-5 mr-1" />
//                 <span>Account</span>
//               </Link>
//               <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
//                 My Account
//               </div>
//             </div>
//           ) : (
//             <div className="group relative">
//               <Link
//                 to={linkPath}
//                 className="text-gray-600 hover:text-[#9EA647] transition-colors duration-300 flex items-center"
//               >
//                 <Icon className="w-5 h-5 mr-1" />
//                 <span>{linkText}</span>
//               </Link>
//               <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
//                 {TooltipText}
//               </div>
//               {/* <Link
//                 to="/login"
//                 className="text-gray-600 hover:text-[#9EA647] transition-colors duration-300 flex items-center"
//               >
//                 <LogIn className="w-5 h-5 mr-1" />
//                 <span>Login</span>
//               </Link>
//               <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
//                 Login
//               </div> */}
//             </div>
//           )}
//           <div className="group relative">
//             <button
//               onClick={() => setIsCartDialogOpen(true)}
//               className="text-gray-600 hover:text-[#9EA647] transition-colors duration-300"
//               aria-label="Cart"
//             >
//               <ShoppingCart className="w-6 h-6" />
//               <span
//                 className={`absolute -top-2 -right-2 text-xs rounded-full px-1.5
//                   ${
//                     cartQuantity === 0 ? "bg-gray-400" : "bg-red-500"
//                   } text-white`}
//               >
//                 {cartQuantity}
//               </span>
//             </button>
//             <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
//               Cart
//             </span>
//           </div>
//         </div>

//         {/* Mobile Cart Button (Right side) */}
//         <div className="md:hidden group relative">
//           <button
//             onClick={() => setIsCartDialogOpen(true)}
//             className="text-gray-600 hover:text-[#9EA647]"
//             aria-label="Cart"
//           >
//             <ShoppingCart className="w-6 h-6" />
//             <span
//               className={`absolute -top-2 -right-2 text-xs rounded-full px-1.5
//                   ${
//                     cartQuantity === 0 ? "bg-gray-400" : "bg-red-500"
//                   } text-white`}
//             >
//               {cartQuantity}
//             </span>
//           </button>
//           <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
//             Cart
//           </span>
//         </div>
//       </div>

//       {/* Mobile Menu - Wider Sidebar */}
//       {isMenuOpen && (
//         <div className="md:hidden fixed inset-0 z-50 flex">
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50"
//             onClick={() => setIsMenuOpen(false)}
//           />

//           {/* Sidebar - Increased width */}
//           <div className="relative w-1/2 bg-white h-screen overflow-y-auto shadow-xl">
//             <div className="sticky top-0 bg-white z-10 p-4 flex justify-between items-center border-b">
//               <img src={camplogo} alt="Camp Logo" className="w-10 h-10" />
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-gray-600 hover:text-[#9EA647]"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="p-4">
//               {/* Categories */}
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                   Categories
//                 </h3>
//                 <ul className="space-y-3">
//                   {menuCategories.map((category, index) => (
//                     <li key={index}>
//                       <Link
//                         to={`/category/${category
//                           .toLowerCase()
//                           .replace(/\s+/g, "-")}`}
//                         className="block text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         {category}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               {/* Account Section */}
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                   My Account
//                 </h3>
//                 {user?.email ? (
//                   <>
//                     <Link
//                       to="/account/orders"
//                       className="flex items-center text-gray-600 hover:text-[#9EA647] mb-3 p-3 rounded hover:bg-gray-100"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       <User className="w-5 h-5 mr-3" />
//                       <span>My Account</span>
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center text-red-600 w-full p-3 rounded hover:bg-gray-100"
//                     >
//                       <LogOut className="w-5 h-5 mr-3" />
//                       <span>Logout</span>
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/login"
//                       className="flex items-center text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       <LogIn className="w-5 h-5 mr-3" />
//                       <span>Login</span>
//                     </Link>
//                     <Link
//                       to="/register"
//                       className="flex items-center text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       <LogIn className="w-5 h-5 mr-3" />
//                       <span>Register</span>
//                     </Link>
//                   </>
//                 )}
//               </div>
//               {/* Additional Links */}
//               <div className="border-t border-gray-200 pt-4">
//                 <Link
//                   to="/about"
//                   className="block text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   About Us
//                 </Link>
//                 <Link
//                   to="/contact"
//                   className="block text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Contact
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Dialog */}
//       {isCartDialogOpen && (
//         // <div className="fixed top-0 right-0 m-4 w-80 max-h-[90vh] bg-white shadow-lg rounded-lg overflow-y-auto z-50">
//         <div
//           className="fixed top-0 right-0 m-4 w-80 max-h-[90vh] bg-white shadow-lg rounded-lg overflow-y-auto z-50"
//           onMouseEnter={handleCartMouseEnter}
//           onMouseLeave={handleCartMouseLeave}
//         >
//           <button
//             onClick={() => setIsCartDialogOpen(false)}
//             className="absolute top-2 right-2 text-gray-600 hover:text-[#9EA647] transition-colors duration-300"
//           >
//             <X className="w-6 h-6" />
//           </button>
//           <div className="p-6 pt-8">
//             <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
//             {cartItems.length === 0 ? (
//               <div className="relative">
//                 <ShoppingCart className="w-6 h-6" />
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartItems.length}
//                 </span>
//               </div>
//             ) : (
//               <ul className="space-y-4">
//                 {cartItems.map((item) => (
//                   <li key={item._id} className="flex flex-col border-b pb-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-12 h-12 object-cover rounded"
//                         />
//                         <div>
//                           <p className="text-sm font-medium text-gray-800">
//                             {item.name}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             TK{item.price} x {item.quantity} = TK
//                             {item.price * item.quantity}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Action buttons in new line */}
//                     <div className="flex items-center mt-2 space-x-2">
//                       <button
//                         onClick={() =>
//                           handleQuantityChange(item._id, item.quantity - 1)
//                         }
//                         disabled={item.quantity <= 1}
//                         className="px-2 py-1 text-xs border border-gray-300 rounded"
//                       >
//                         -
//                       </button>
//                       <span className="text-sm">{item.quantity}</span>
//                       <button
//                         onClick={() =>
//                           handleQuantityChange(item._id, item.quantity + 1)
//                         }
//                         disabled={item.quantity >= item.availableStock}
//                         className="px-2 py-1 text-xs border border-gray-300 rounded"
//                       >
//                         +
//                       </button>
//                       <button
//                         onClick={() => setShowDeleteConfirm({ id: item._id })}
//                         className="ml-2 text-xs text-red-500 hover:text-red-700"
//                       >
//                         বাদ দিন
//                       </button>

//                       <DeleteConfirmationModal
//                         isOpen={showDeleteConfirm !== null}
//                         onClose={() => setShowDeleteConfirm(null)}
//                         onConfirm={() => {
//                           if (showDeleteConfirm?.id) {
//                             handleRemoveItem(showDeleteConfirm.id);
//                           }
//                           setShowDeleteConfirm(null);
//                         }}
//                         title="আপনি কি নিশ্চিত?"
//                         message="আপনি কি এই পণ্যটি কার্ট থেকে বাদ দিতে চান?"
//                       />
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <div className="mt-6 flex justify-between items-center">
//               <span className="text-lg font-semibold text-gray-800">
//                 Total: TK{" "}
//                 {cartItems.reduce(
//                   (acc, item) => acc + item.price * item.quantity,
//                   0
//                 )}
//               </span>
//               <Link
//                 to="/cart"
//                 className="bg-[#9EA647] text-white px-2 py-2 rounded-lg hover:bg-[#818a27] transition-colors duration-300"
//                 onClick={() => setIsCartDialogOpen(false)}
//               >
//                 View Cart
//               </Link>
//             </div>
//             <div>
//               {cartItems.length > 0 && (
//                 <div className="space-y-3 mt-3">
//                   <button
//                     onClick={handleOrderClick}
//                     className="w-full bg-[#9EA647] text-white px-4 py-2 rounded-lg hover:bg-[#818a27] transition-colors duration-300 font-medium"
//                   >
//                     ক্যাশ অন ডেলিভারিতে অর্ডার করুন
//                   </button>

//                   <OrderConfirmationModal
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                   />

//                   <button
//                     onClick={handleOnlinePayment}
//                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
//                   >
//                     অনলাইনে পেমেন্ট করুন
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
