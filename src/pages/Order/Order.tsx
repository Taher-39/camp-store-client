import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* Main Content */}
      <main className="flex-grow px-6 py-12 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
          🧾 Your Orders
        </h1>

        <div className="border rounded-xl py-20 px-6 bg-gray-50 flex flex-col items-center text-center shadow-sm">
          <ShoppingCart className="w-10 h-10 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            No orders yet
          </p>
          <p className="text-sm text-gray-500 mb-6">
            You haven’t placed any orders. Head to the store and start shopping!
          </p>
          <Link
            to="/products"
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-6 py-2 rounded-full transition"
          >
            Go to Store
          </Link>
        </div>
      </main>

      {/* Policy Links */}
      <div className="border-t border-gray-200 px-6 pt-6 pb-4 text-sm text-gray-600 bg-white">
        <div className="flex justify-center gap-6 flex-wrap mb-2">
          <Link to="/refund-policy" className="hover:underline">
            Refund Policy
          </Link>
          <Link to="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
          <Link to="/cancellation-policy" className="hover:underline">
            Cancellation Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
