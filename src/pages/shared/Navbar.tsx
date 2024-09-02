import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import camplogo from "@/assets/campVectorLogo.png";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

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

  return (
    <header
      className={`bg-white shadow-md py-4 sticky top-0 z-40 transition-transform duration-300 ${
        isNavbarVisible
          ? "transform translate-y-0"
          : "transform -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={camplogo} alt="Camp Logo" className="w-12 h-12 mr-2" />
          <span className="text-xl font-bold text-gray-800">CampStore</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/about"
            className="text-gray-600 hover:text-[#3712c2] font-medium transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/products"
            className="text-gray-600 hover:text-[#3712c2] font-medium transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            to="/product-management"
            className="text-gray-600 hover:text-[#3712c2] font-medium transition-colors duration-300"
          >
            Management
          </Link>
          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-[#3712c2] transition-colors duration-300"
          >
            <Heart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              0
            </span>
          </Link>
          <button
            onClick={() => setIsCartDialogOpen(true)}
            className="relative text-gray-600 hover:text-[#3712c2] transition-colors duration-300"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {cartQuantity}
              </span>
            )}
          </button>
        </nav>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-600 hover:text-[#3712c2] transition-colors duration-300"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-md py-2">
          <Link
            to="/about"
            className="text-gray-600 hover:text-[#3712c2] font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/products"
            className="text-gray-600 hover:text-[#3712c2] font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/product-management"
            className="text-gray-600 hover:text-[#3712c2] font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Management
          </Link>
          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-[#3712c2] py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart className="w-6 h-6 inline-block" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              0
            </span>
            Wishlist
          </Link>
          <button
            onClick={() => {
              setIsCartDialogOpen(true);
              setIsMenuOpen(false);
            }}
            className="relative text-gray-600 hover:text-[#3712c2] py-2"
          >
            <ShoppingCart className="w-6 h-6 inline-block" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {cartQuantity} 
              </span>
            )}
            Cart
          </button>
        </div>
      )}
      {/* Cart Dialog */}
      {isCartDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <button
              onClick={() => setIsCartDialogOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-[#3712c2] transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <img
                      src={item.images}
                      alt={item.name}
                      className="w-12 h-12 object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {item.name}
                    </span>
                    <span className="font-medium text-gray-600">
                      x{item.quantity}
                    </span>
                    <span className="font-medium text-gray-800">
                      ${item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                Total: $
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </span>
              <Link
                to="/cart"
                className="bg-[#3712c2] text-white px-4 py-2 rounded-lg hover:bg-[#4952b2] transition-colors duration-300"
                onClick={() => setIsCartDialogOpen(false)}
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
