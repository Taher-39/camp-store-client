import Sidebar from "@/components/Sidebar/Sidebar";
import { HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";


const Wishlist = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar (always visible on desktop) */}
      <div className="hidden w-64 border-r bg-white shadow-md sm:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <WishlistLayout />
        </div>
      </div>
    </div>
  );
};


const WishlistLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <HeartIcon className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Wishlist</h1>
      <p className="text-lg text-gray-600 mb-6">This feature is coming soon! Stay tuned.</p>
      <div className="text-white bg-[#9EA647] hover:bg-[#8d973f] px-4 py-2 rounded-md text-lg">
        <Link to='/'>Explore Other Products</Link>
      </div>
    </div>
  );
};

export default Wishlist;
