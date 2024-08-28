import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 container">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="mb-2">123 Campers Lane</p>
          <p className="mb-2">Campville, CA 90210</p>
          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:support@campersshop.com"
              className="text-gray-400 hover:text-gray-300"
            >
              support@campersshop.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="text-gray-400 hover:text-gray-300"
            >
              +1 (234) 567-890
            </a>
          </p>
        </div>

        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <TwitterIcon className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/" className="text-gray-400 hover:text-gray-300">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="text-gray-400 hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/products"
                className="text-gray-400 hover:text-gray-300"
              >
                Products
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="text-gray-400 hover:text-gray-300">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-gray-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 py-4">
        <div className="mx-auto text-center text-gray-400">
          <p>&copy; 2024 Campers Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
