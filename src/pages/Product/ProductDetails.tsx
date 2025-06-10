import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import {
//   addItemToCart,
//   updateCartItemQuantity,
// } from "@/redux/features/cart/cartSlice";
import "./ProductDetails.css";
import { Loader, MessageCircleMore } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { magnify } from "@/utils/ImageMagnifier";
import OrderConfirmationModal from "../Order/OrderConfirmationModal";
import { toast } from "sonner";
import {
  addItemToCart,
  updateCartItemQuantity,
} from "@/redux/features/cart/cartSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { toast } from "sonner";

// import { toast } from "sonner";

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

  useEffect(() => {
    if (product && product.image) {
      magnify("productImage", 3);
    }
  }, [product]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-4xl text-gray-600" />
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

    // যদি কার্ট খালি থাকে তাহলে প্রোডাক্ট ডিরেক্টলি পাঠাও
    if (cartItems.length === 0 && product) {
      dispatch(
        addItemToCart({
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          weight: product.weight,
          availableStock: product.quantity,
          image: product.image,
          status: product.status,
          category: product.category,
          description: product.description,
        })
      );
    } else if (cartItems.length !== 0 && product) {
      //cart not empty but if this product don't stay cart this time 
      // add this then total cart show in orderConfirmationModal
      const existingProduct = cartItems.find(
        (item) => item._id !== product._id
      );
      const sameProduct = cartItems.find(
        (item) => item._id === product._id
      );
      if (existingProduct && !sameProduct) {
        dispatch(
          addItemToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            weight: product.weight,
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

    setIsModalOpen(true);
  };

  const handleOrderSubmit = (data: any) => {
    console.log("🔔 অর্ডার কনফার্মড ✅", data);
    // এখানে তুমি POST করে backend-এ পাঠাতে পারো
  };

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
    <div className="container mx-auto py-8 min-h-screen w-[90%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="img-magnifier-container relative">
          <img
            id="productImage"
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-black-600 mb-4">
              <span className="font-bold">মূল্যঃ </span>
              {product.price} টাকা
            </p>
            <p className="text-black-600 mb-4 ">
              <span className="font-bold">পরিমাণঃ </span>
              {product.weight} কেজি
            </p>
          </div>
          {/* <p className="text-sm text-gray-700 my-4">{product.description}</p> */}
          <div className="grid grid-cols-2 gap-4">
            <p>
              Status:
              <span
                className={
                  product.quantity > 0
                    ? "text-green-500 ml-3"
                    : "text-red-500 ml-3"
                }
              >
                {product.status}
              </span>
            </p>
            <p className="text-sm text-black-600 my-2">
              <span className="font-bold">Category:</span> {product.category}
            </p>
          </div>
          {/* <p className="text-sm text-gray-600 my-2">
            Stock: {product.quantity} units
          </p>  */}

          {/* <div className="my-4">
            <label htmlFor="quantity" className="block text-sm text-gray-700">
              Quantity:
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(quantity > 10 ? quantity - 10 : 10)}
                className="bg-gray-200 px-2 py-1 rounded-md"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 10 && val <= product.quantity) {
                    setQuantity(val);
                  }
                }}
                min="10"
                max={product.quantity}
                className="border border-gray-300 p-2 rounded-md w-16 text-center mx-2"
              />
              <button
                onClick={() =>
                  setQuantity(
                    quantity < product.quantity ? quantity + 10 : quantity
                  )
                }
                className="bg-gray-200 px-2 py-1 rounded-md"
              >
                +
              </button>
            </div>
          </div> */}

          {/* Extra Order Options */}
          <p className="text-sm text-green-600 font-medium">
            🥭 আপনি শুধুমাত্র Mango-আম অর্ডার করলে, ডেলিভারি অপশন অনুযায়ী চার্জ
            কমতে পারে।{" "}
          </p>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleAddToCart()}
              disabled={quantity > product.quantity || product.quantity === 0}
              className={`px-4 py-2 text-center rounded-md text-white w-full ${
                quantity > product.quantity || product.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#9EA647] hover:bg-[#8d973f]"
              }`}
            >
              ব্যাগে যোগ করুন
            </button>
            <button
              onClick={handleOrderClick}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              ক্যাশ অন ডেলিভারিতে অর্ডার করুন
            </button>

            <OrderConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleOrderSubmit}
            />

            <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Pay Online
            </button>

            <div className="flex gap-4 items-center mt-4">
              <Link
                to="https://m.me/halzobd"
                target="_blank"
                className="w-full flex items-center gap-2 bg-[#0084FF] text-white px-4 py-2 rounded hover:bg-[#006edc]"
              >
                <MessageCircleMore />
                Chat with us
              </Link>

              <Link
                to="https://wa.me/8801516559515"
                target="_blank"
                className="w-full flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <FaWhatsapp />
                WhatsApp Us
              </Link>
            </div>

            {/* Description Accordion */}
            <details className="mt-6 border p-4 rounded-md cursor-pointer bg-gray-100">
              <summary className="font-semibold text-lg">Description</summary>
              <div className="mt-2 text-gray-700 text-sm">
                {product.description}
              </div>
            </details>

            {/* Hotline and WhatsApp Info */}
            <div className="mt-6 text-sm text-gray-700">
              আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:
              <br />
              📞 <strong>+8801516-559515</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
