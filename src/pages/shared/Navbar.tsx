import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  LogIn,
  UserPlus,
  Menu,
  X,
  Search,
  LogOut,
  User,
  ChevronUp,
  UserCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import camplogo from "@/assets/campVectorLogo.png";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/Auth/authSlice";
import OrderConfirmationModal from "../Order/OrderConfirmationModal";
import { toast } from "sonner";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart/cartSlice";
import DeleteConfirmationModal from "@/utils/DeleteConfirmation";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const { user } = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    id: string;
  } | null>(null);
  const [isHoveringCart, setIsHoveringCart] = useState(false);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const linkPath = isLoginPage
    ? "/register"
    : isRegisterPage
    ? "/login"
    : "/login";
  const linkText = isLoginPage
    ? "Register"
    : isRegisterPage
    ? "Login"
    : "Login";

  const TooltipText = linkText;
  const Icon = isLoginPage ? UserPlus : LogIn;
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  // Add these handlers
  const handleCartMouseEnter = () => {
    setIsHoveringCart(true);
  };

  const handleCartMouseLeave = () => {
    setIsHoveringCart(false);
    if (cartItems.length === 0) {
      setIsCartDialogOpen(false);
    }
  };

  // Modify the useEffect
  useEffect(() => {
    if (cartItems.length === 0 && !isHoveringCart) {
      setIsCartDialogOpen(false);
    }
  }, [cartItems, isHoveringCart]);

  const popularSearches = [
    "Organic",
    "Oil",
    "Honey",
    "Nuts & Seeds",
    "Tea/Coffee",
    "3KG",
  ];

  const menuCategories = [
    "OFFER",
    "Best Seller",
    "Mustard Oil",
    "Ghee (ঘি)",
    "Dates (খেজুর)",
    "খেজুর গুড়",
    "Honey",
    "Masala",
    "Nuts & Seeds",
    "Tea/Coffee",
  ];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleQuantityChange = (_id: string, newQuantity: number) => {
    dispatch(updateCartItemQuantity({ _id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleOrderClick = () => {
    if (!user) {
      // Not logged in, redirect to login with "from"
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setIsModalOpen(true); // Show order modal
  };
  const handleOrderSubmit = (data: any) => {
    console.log(data);
    console.log("🔔 অর্ডার কনফার্মড ✅", data);
    // এখানে তুমি POST করে backend-এ পাঠাতে পারো
  };

  const handleOnlinePayment = () => {
    toast.success("Online Payment Coming Soon.");
  };

  const isOrderPage = location.pathname === "/account/orders";
  const isSettingsPage = location.pathname === "/account/settings";
  const isProfilePage = location.pathname === "/account/profile";

  if (isOrderPage || isSettingsPage || isProfilePage) {
    return (
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center md:ml-0 mx-auto md:mx-0">
            <img src={camplogo} alt="Camp Logo" className="w-10 h-10 mr-2" />
            <span className="text-xl font-bold text-gray-800 hidden md:block">
              Halal-Zone
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <button
            onClick={() => navigate("/products")}
            className="text-black hover:underline"
          >
            Products
          </button>
          {user?.role &&
            ["super_admin", "admin", "modaretor"].includes(user.role) && (
              <button
                onClick={() => navigate("/account/product-management")}
                className="text-black hover:underline"
              >
                Management
              </button>
            )}
          <button
            onClick={() => navigate("/account/orders")}
            className="text-black hover:underline"
          >
            Orders
          </button>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1"
            >
              <UserCircle className="w-6 h-6" />
              <ChevronUp
                className={`w-4 h-4 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-10">
                <div className="px-4 py-2 border-b text-sm text-gray-700">
                  {user?.email}
                </div>
                <ul className="text-sm">
                  <li>
                    <Link
                      to="/account/profile"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/settings"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={`bg-white shadow-md sticky top-0 z-40 transition-transform duration-300 ${
        isNavbarVisible
          ? "transform translate-y-0"
          : "transform -translate-y-full"
      }`}
    >
      {/* Top Navigation Bar */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4 relative">
        {/* Mobile Menu Button (Left side) */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-gray-600 hover:text-[#9EA647] group relative"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Menu
          </span>
        </button>

        {/* Logo (Center on mobile, left on desktop) */}
        <Link to="/" className="flex items-center md:ml-0 mx-auto md:mx-0">
          <img src={camplogo} alt="Camp Logo" className="w-10 h-10 mr-2" />
          <span className="text-xl font-bold text-gray-800 hidden md:block">
            Halal-Zone
          </span>
        </Link>

        {/* Search Bar (Center when expanded) */}
        {isSearchOpen ? (
          <div className="absolute left-0 right-0 mx-auto w-full px-4 md:px-20 z-50 bg-white py-2 shadow-md">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search products"
                className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
                autoFocus
              />
              <Search className="w-5 h-5 absolute left-3 text-gray-400" />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Popular Searches: </span>
              {popularSearches.map((item, index) => (
                <span
                  key={index}
                  className="mr-2 last:mr-0 hover:text-[#9EA647] cursor-pointer underline"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden text-gray-600 hover:text-[#9EA647] group relative"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Search
            </span>
          </button>
        )}

        {/* Desktop Search (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products"
              className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Desktop Navigation (Right side) */}
        <div className="hidden md:flex items-center space-x-6">
          {user?.email ? (
            <div className="group relative">
              <Link
                to="/account/orders"
                className="text-gray-600 hover:text-[#9EA647] transition-colors duration-300 flex items-center"
              >
                <User className="w-5 h-5 mr-1" />
                <span>Account</span>
              </Link>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                My Account
              </div>
            </div>
          ) : (
            <div className="group relative">
              <Link
                to={linkPath}
                className="text-gray-600 hover:text-[#9EA647] transition-colors duration-300 flex items-center"
              >
                <Icon className="w-5 h-5 mr-1" />
                <span>{linkText}</span>
              </Link>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {TooltipText}
              </div>
              {/* <Link
                to="/login"
                className="text-gray-600 hover:text-[#9EA647] transition-colors duration-300 flex items-center"
              >
                <LogIn className="w-5 h-5 mr-1" />
                <span>Login</span>
              </Link>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Login
              </div> */}
            </div>
          )}
          <div className="group relative">
            <button
              onClick={() => setIsCartDialogOpen(true)}
              className="text-gray-600 hover:text-[#9EA647] transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              <span
                className={`absolute -top-2 -right-2 text-xs rounded-full px-1.5 
                  ${
                    cartQuantity === 0 ? "bg-gray-400" : "bg-red-500"
                  } text-white`}
              >
                {cartQuantity}
              </span>
            </button>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Cart
            </span>
          </div>
        </div>

        {/* Mobile Cart Button (Right side) */}
        <div className="md:hidden group relative">
          <button
            onClick={() => setIsCartDialogOpen(true)}
            className="text-gray-600 hover:text-[#9EA647]"
            aria-label="Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            <span
              className={`absolute -top-2 -right-2 text-xs rounded-full px-1.5 
                  ${
                    cartQuantity === 0 ? "bg-gray-400" : "bg-red-500"
                  } text-white`}
            >
              {cartQuantity}
            </span>
          </button>
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#818a27] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Cart
          </span>
        </div>
      </div>

      {/* Mobile Menu - Wider Sidebar */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar - Increased width */}
          <div className="relative w-1/2 bg-white h-screen overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white z-10 p-4 flex justify-between items-center border-b">
              <img src={camplogo} alt="Camp Logo" className="w-10 h-10" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-[#9EA647]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Categories
                </h3>
                <ul className="space-y-3">
                  {menuCategories.map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`/category/${category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Account Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  My Account
                </h3>
                {user?.email ? (
                  <>
                    <Link
                      to="/account/orders"
                      className="flex items-center text-gray-600 hover:text-[#9EA647] mb-3 p-3 rounded hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5 mr-3" />
                      <span>My Account</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-red-600 w-full p-3 rounded hover:bg-gray-100"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-5 h-5 mr-3" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-5 h-5 mr-3" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>
              {/* Additional Links */}
              <div className="border-t border-gray-200 pt-4">
                <Link
                  to="/about"
                  className="block text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-600 hover:text-[#9EA647] p-3 rounded hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Dialog */}
      {isCartDialogOpen && (
        // <div className="fixed top-0 right-0 m-4 w-80 max-h-[90vh] bg-white shadow-lg rounded-lg overflow-y-auto z-50">
        <div
          className="fixed top-0 right-0 m-4 w-80 max-h-[90vh] bg-white shadow-lg rounded-lg overflow-y-auto z-50"
          onMouseEnter={handleCartMouseEnter}
          onMouseLeave={handleCartMouseLeave}
        >
          <button
            onClick={() => setIsCartDialogOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-[#9EA647] transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="p-6 pt-8">
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item._id} className="flex flex-col border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            TK{item.price} x {item.quantity} = TK
                            {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons in new line */}
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 text-xs border border-gray-300 rounded"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.availableStock}
                        className="px-2 py-1 text-xs border border-gray-300 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm({ id: item._id })}
                        className="ml-2 text-xs text-red-500 hover:text-red-700"
                      >
                        বাদ দিন
                      </button>

                      <DeleteConfirmationModal
                        isOpen={showDeleteConfirm !== null}
                        onClose={() => setShowDeleteConfirm(null)}
                        onConfirm={() => {
                          if (showDeleteConfirm?.id) {
                            handleRemoveItem(showDeleteConfirm.id);
                          }
                          setShowDeleteConfirm(null);
                        }}
                        title="আপনি কি নিশ্চিত?"
                        message="আপনি কি এই পণ্যটি কার্ট থেকে বাদ দিতে চান?"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                Total: TK{" "}
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </span>
              <Link
                to="/cart"
                className="bg-[#9EA647] text-white px-2 py-2 rounded-lg hover:bg-[#818a27] transition-colors duration-300"
                onClick={() => setIsCartDialogOpen(false)}
              >
                View Cart
              </Link>
            </div>
            <div>
              <button
                onClick={handleOrderClick}
                className="w-full bg-[#9EA647] text-white px-2 py-2 mt-3 rounded-lg hover:bg-[#818a27] transition-colors duration-300"
              >
                ক্যাশ অন ডেলিভারিতে অর্ডার করুন
              </button>
              <OrderConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleOrderSubmit}
              />
              <button
                onClick={handleOnlinePayment}
                className="w-full py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Pay Online
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
