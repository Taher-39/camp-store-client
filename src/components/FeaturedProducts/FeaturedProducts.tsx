import {
  addItemToCart,
  updateCartItemQuantity,
} from "@/redux/features/cart/cartSlice";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  status: string;
}

export default function FeaturedProductsSection() {
  const { data, isLoading, isSuccess } = useGetProductsQuery(undefined);
  const products: Product[] = data?.data || [];
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-4xl text-gray-600" />
      </div>
    );

  if (!isSuccess || products.length === 0) {
    return <div>No products available.</div>;
  }

  const handleAddToCart = (product: Product) => {
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
            availableStock: product.quantity,
            image: product.image,
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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span style={{ color: "#4952b2" }}>Our</span> Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product: Product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">TK {product.price}</p>
              {/* <div>
                <Link
                  to={`/products/${product._id}`}
                  className="inline-block px-6 py-3 text-white bg-[#4952b2] hover:bg-[#3712c2] font-semibold rounded-md"
                >
                  বিস্তারিত
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={
                    quantity > product.quantity || product.quantity === 0
                  }
                  className={`mx-2 px-6 py-3 rounded-md text-white ${
                    quantity > product.quantity || product.quantity === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#4952b2] hover:bg-[#3712c2]"
                  }`}
                >
                  ব্যাগে যোগ করুন
                </button>
              </div> */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4">
                <Link
                  to={`/products/${product._id}`}
                  className="px-4 py-3 text-center text-white bg-[#4952b2] hover:bg-[#3712c2] font-semibold rounded-md"
                >
                  বিস্তারিত
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={
                    quantity > product.quantity || product.quantity === 0
                  }
                  className={`px-4 py-3 text-center rounded-md text-white ${
                    quantity > product.quantity || product.quantity === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#4952b2] hover:bg-[#3712c2]"
                  }`}
                >
                  ব্যাগে যোগ করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
