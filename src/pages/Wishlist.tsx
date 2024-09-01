import { HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";


const Wishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <HeartIcon className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Wishlist</h1>
      <p className="text-lg text-gray-600 mb-6">This feature is coming soon! Stay tuned.</p>
      <div className="bg-[#9EA647] hover:bg-[#3712c2] text-white px-4 py-2 rounded-md text-lg">
        <Link to='/products'>Explore Other Products</Link>
      </div>
    </div>
  );
};

export default Wishlist;
