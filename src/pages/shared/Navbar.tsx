import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Menu } from "lucide-react";
import { useState } from "react";
import camplogo from "@/assets/campVectorLogo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
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
            to="/contact"
            className="text-gray-600 hover:text-[#3712c2] font-medium transition-colors duration-300"
          >
            Contact
          </Link>
          <Link to="/wishlist" className="relative text-gray-600 hover:text-[#3712c2] transition-colors duration-300">
            <Heart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              2
            </span>
          </Link>
          <Link to="/cart" className="relative text-gray-600 hover:text-[#3712c2] transition-colors duration-300">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              3
            </span>
          </Link>
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
            to="/contact"
            className="text-gray-600 hover:text-[#3712c2] font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-[#3712c2] py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart className="w-6 h-6 inline-block" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              2
            </span>
            Wishlist
          </Link>
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-[#3712c2] py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart className="w-6 h-6 inline-block" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              3
            </span>
            Cart
          </Link>
        </div>
      )}
    </header>
  );
}
