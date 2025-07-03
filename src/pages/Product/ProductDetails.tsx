import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MessageCircleMore } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import OrderConfirmationModal from "../Order/OrderConfirmationModal";
import { toast } from "sonner";
import {
  addItemToCart,
  updateCartItemQuantity,
} from "@/redux/features/cart/cartSlice";
import ReviewSection from "@/components/Review/ReviewSection";
import HalalLoader from "@/components/Loader/Loader";
import ProductImageGallery from "./ProductImageGallery";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const product = data?.data;
  const dispatch = useAppDispatch();
  const [quantity] = useState(1);
  const cartItems = useAppSelector((state) => state.cart.items);
  const { user } = useAppSelector((state) => state.auth);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <HalalLoader isLoading={isLoading} />
      </div>
    );

  if (isError || !product) {
    return (
      <div className="min-h-screen text-center text-4xl mt-6">
        Product not found
      </div>
    );
  }

  const handleOrderClick = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (cartItems.length === 0 && product) {
      dispatch(
        addItemToCart({
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          weight: product.weight,
          availableStock: product.quantity,
          image: product.images[0],
          status: product.status,
          category: product.category,
          description: product.description,
        })
      );
    } else if (cartItems.length !== 0 && product) {
      const existingProduct = cartItems.find(
        (item) => item._id !== product._id
      );
      const sameProduct = cartItems.find((item) => item._id === product._id);
      if (existingProduct && !sameProduct) {
        dispatch(
          addItemToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            weight: product.weight,
            availableStock: product.quantity,
            image: product.images[0],
            status: product.status,
            category: product.category,
            description: product.description,
          })
        );
        toast.success("Product added to cart");
      }
    }
    setIsModalOpen(true);
  };

  // const handleOrderSubmit = () => {
  //   toast.info("Feature Comming Soon!");
  // };

  const handleAddToCart = () => {
    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;
      if (newQuantity > existingProduct.availableStock) {
        toast.info("Cannot add more than available stock");
      } else {
        dispatch(
          updateCartItemQuantity({ _id: product._id, quantity: newQuantity })
        );
        toast.success("Product quantity updated in cart");
      }
    } else {
      if (quantity > product.quantity) {
        toast.info("Cannot add more than available stock");
      } else {
        dispatch(
          addItemToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity,
            weight: product.weight,
            availableStock: product.quantity,
            image: product.images[0],
            status: product.status,
            category: product.category,
            description: product.description,
          })
        );
        toast.success("Product added to cart");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen max-w-7xl">
      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Product Image - Left Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-4">
            <div className="img-magnifier-container bg-white p-4 rounded-xl shadow-md">
              <ProductImageGallery
                images={product.images}
                productName={product.name}
              />
            </div>
          </div>
        </div>

        {/* Product Details - Middle Column */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-md h-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              {product.name}
            </h1>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-[#9EA647]">
                  {product.price} টাকা
                </span>
                <span className="text-gray-500">/ {product.weight} কেজি</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    product.quantity > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
                <span className="text-sm text-gray-600">
                  Category: {product.category}
                </span>
              </div>

              <p className="text-green-600 font-medium mb-6">
                🥭 আপনি শুধুমাত্র Mango-আম অর্ডার করলে, ডেলিভারি চার্জ ফ্রী
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={quantity > product.quantity || product.quantity === 0}
                className={`w-full py-3 rounded-lg font-medium ${
                  quantity > product.quantity || product.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#9EA647] hover:bg-[#818a27] text-white"
                }`}
              >
                কার্টে যোগ করুন
              </button>

              <button
                onClick={handleOrderClick}
                disabled={quantity > product.quantity || product.quantity === 0}
                className={`w-full py-3 text-white rounded-lg font-medium transition-colors duration-200 ${
                  quantity > product.quantity || product.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                ক্যাশ অন ডেলিভারিতে অর্ডার করুন
              </button>

              {/* <button
                onClick={handleOrderSubmit}
                disabled={quantity > product.quantity || product.quantity === 0}
                className={`w-full py-3 text-white rounded-lg font-medium transition-colors duration-200 ${
                  quantity > product.quantity || product.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#003F2D] hover:bg-[#003f12da]"
                }`}
              >
                Pay Online
              </button> */}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="https://m.me/halzobd"
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-[#0084FF] hover:bg-[#006edc] text-white px-4 py-2 rounded-lg"
                >
                  <MessageCircleMore size={18} />
                  <span>Chat with us</span>
                </Link>

                <Link
                  to="https://wa.me/8801516559515"
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  <FaWhatsapp size={18} />
                  <span>WhatsApp</span>
                </Link>
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Product Description
              </h3>
              <div className="prose max-w-none text-gray-700">
                {product.description
                  .split("\n")
                  .map((paragraph: string, index: number) => (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:
              </p>
              <p className="font-medium text-gray-900">📞 +8801516-559515</p>
            </div>
          </div>
        </div>

        {/* Delivery Info & Features - Right Column */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Features Card */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#9EA647] border-b pb-2">
                Key Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>100% Organic & Halal Certified</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Fresh from Local Farms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>No Artificial Preservatives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Premium Quality Assurance</span>
                </li>
              </ul>
            </div>

            {/* Delivery Info Card */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#9EA647] border-b pb-2">
                Delivery Information
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Inside Dhaka
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1-2 business days</li>
                    <li>• Delivery charge free for Mango</li>
                    <li>• Home/Point delivery available</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Outside Dhaka
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 2-4 business days</li>
                    <li>• Delivery charge free for Mango</li>
                    <li>• Home/Point delivery available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section - Full Width Below */}
      <div className="mt-12">
        <ReviewSection productId={product._id} />
      </div>

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductDetailsPage;
