import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  ChevronDown,
  LogIn,
  UserPlus,
} from "lucide-react";
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
  const authUser = useAppSelector(useCurrentUser);
  const cartItems = useAppSelector((state) => state.cart.items);

  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs for dropdowns
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const mobileCartDropdownRef = useRef<HTMLDivElement>(null);
  const desktopCartDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInsideMobile =
        mobileCartDropdownRef.current &&
        mobileCartDropdownRef.current.contains(event.target as Node);
      const isInsideDesktop =
        desktopCartDropdownRef.current &&
        desktopCartDropdownRef.current.contains(event.target as Node);
      const isInsideAccount =
        accountMenuRef.current &&
        accountMenuRef.current.contains(event.target as Node);

      if (isCartOpen && !isInsideMobile && !isInsideDesktop) {
        setIsCartOpen(false);
      }
      if (isAccountMenuOpen && !isInsideAccount) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, isAccountMenuOpen]);

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

  const Icon = isLoginPage ? UserPlus : LogIn;

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

  // Handle remove item from cart
  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  // Handle order click
  const handleOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop event from bubbling up
    if (!authUser) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setIsModalOpen(true);
  };

  // Cart Dropdown Component
  const CartDropdown = ({
    isMobile = false,
    dropdownRef,
  }: {
    isMobile?: boolean;
    dropdownRef: React.RefObject<HTMLDivElement>;
  }) => (
    <div
      ref={dropdownRef}
      className={`absolute right-0 mt-2 ${
        isMobile ? "w-72" : "w-80"
      } bg-white rounded-lg shadow-xl border z-[100] pointer-events-auto`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-medium">Your Cart ({cartQuantity})</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCartOpen(false);
            }}
          >
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
                <div key={item._id} className="flex items-center py-3 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(item._id, item.quantity - 1);
                        }}
                        className="w-6 h-6 border rounded flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(item._id, item.quantity + 1);
                        }}
                        className="w-6 h-6 border rounded flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item._id);
                        }}
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
              <div className={isMobile ? "" : "grid grid-cols-2 gap-3"}>
                <Link
                  to="/cart"
                  className="block mt-3 bg-white border border-[#9EA647] text-[#9EA647] py-2 rounded-lg hover:bg-gray-50 transition text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCartOpen(false);
                  }}
                >
                  কার্ট দেখুন
                </Link>
                <button
                  className="block mt-3 bg-[#9EA647] text-white py-2 rounded-lg hover:bg-[#818a27] transition text-center w-full"
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
  );

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between md:hidden">
            <button
              onClick={() => {
                setIsMenuOpen(true);
              }}
              className="p-2"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            <Link to="/" className="flex items-center">
              <img src={halalZoneCicleLogo} alt="Halal Zone" className="h-10" />
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsMobileSearchOpen(true);
                }}
                className="p-2"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <div className="relative">
                <button
                  onClick={() => {
                    setIsCartOpen(!isCartOpen);
                  }}
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
                  <CartDropdown isMobile dropdownRef={mobileCartDropdownRef} />
                )}
              </div>
            </div>
          </div>

          {/* Desktop Top Bar */}
          <div className="hidden md:flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={halalZoneCicleLogo} alt="Halal Zone" className="h-12" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Halal Zone
              </span>
            </Link>

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

            <div className="flex items-center space-x-6">
              {authUser ? (
                <div className="relative" ref={accountMenuRef}>
                  <button
                    onClick={() => {
                      setIsAccountMenuOpen(!isAccountMenuOpen);
                    }}
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

                  {isAccountMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b text-sm text-gray-700">
                          {authUser?.email}
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
                <>
                  <Link
                    to={linkPath}
                    className="text-gray-600 hover:text-[#9EA647] transition-colors duration-300 flex items-center"
                  >
                    <Icon className="w-5 h-5 mr-1" /> <span>{linkText}</span>
                  </Link>
                </>
              )}

              <div className="relative">
                <button
                  onClick={() => {
                    setIsCartOpen(!isCartOpen);
                  }}
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

                {/* Desktop Cart Dropdown */}
                {isCartOpen && (
                  <CartDropdown dropdownRef={desktopCartDropdownRef} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="absolute left-0 top-0 h-full w-4/5 bg-white shadow-lg">
              <div className="p-4 border-b flex justify-between items-center">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <img src={halalZoneLogo} alt="Halal Zone" className="h-10" />
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
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
                onClick={() => {
                  setIsMobileSearchOpen(false);
                }}
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
          </div>
        )}

        <OrderConfirmationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      </header>
    </>
  );
}

