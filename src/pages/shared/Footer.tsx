import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 container">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {/* যোগাযোগ */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">যোগাযোগ করুন</h3>
          <p className="mb-2">হায়াত মোড়</p>
          <p className="mb-2">চাঁপাইনবাবগঞ্জ, রাজশাহী</p>
          <p className="mb-2">
            ইমেইল:{" "}
            <a
              href="mailto:taherpust@gmail.com"
              className="text-gray-400 hover:text-gray-300"
            >
              taherpust@gmail.com
            </a>
          </p>
          <p>
            ফোন:{" "}
            <a
              href="tel:+8801516559515"
              className="text-gray-400 hover:text-gray-300"
            >
              +8801516559515
            </a>
          </p>
        </div>

        {/* সামাজিক যোগাযোগ মাধ্যম */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">আমাদের সাথে থাকুন</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/halzobd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/halzobd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <TwitterIcon className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/halzobd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/halzobd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* দ্রুত লিংকসমূহ */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">দ্রুত লিংক</h3>
          <ul>
            <li className="mb-2">
              <Link to="/login" className="text-gray-400 hover:text-gray-300">
                লগইন
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="text-gray-400 hover:text-gray-300">
                আমাদের সম্পর্কে
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="text-gray-400 hover:text-gray-300">
                যোগাযোগ
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-gray-300"
              >
                প্রাইভেসি পলিসি
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* নিচের অংশ */}
      <div className="bg-gray-900 py-4">
        <div className="mx-auto text-center text-gray-400">
          <p>&copy; ২০২৫ হালাল জোন - সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
