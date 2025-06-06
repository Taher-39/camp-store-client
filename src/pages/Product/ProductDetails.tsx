import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
// import {
//   addItemToCart,
//   updateCartItemQuantity,
// } from "@/redux/features/cart/cartSlice";
import "./ProductDetails.css";
import { Loader, MessageCircleMore } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { magnify } from "@/utils/ImageMagnifier";
import OrderConfirmationModal from "../Order/OrderConfirmationModal";
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
  // const dispatch = useAppDispatch();
  // const [quantity, setQuantity] = useState(1);
  // const cartItems = useAppSelector((state) => state.cart.items);
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
      // Not logged in, redirect to login with "from"
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setIsModalOpen(true); // Show order modal
  };
  const handleOrderSubmit = (data: any) => {

    console.log("🔔 অর্ডার কনফার্মড ✅", data);
    // এখানে তুমি POST করে backend-এ পাঠাতে পারো
  };

  // const handleAddToCart = () => {
  //   const existingProduct = cartItems.find((item) => item._id === product._id);
  //   if (existingProduct) {
  //     const newQuantity = existingProduct.quantity + quantity;
  //     if (newQuantity > existingProduct.availableStock) {
  //       toast.info("Cannot add more than available stock");
  //     } else {
  //       dispatch(
  //         updateCartItemQuantity({ _id: product._id, quantity: newQuantity })
  //       );
  //       toast.success("Product quantity updated in cart");
  //     }
  //   } else {
  //     if (quantity > product.quantity) {
  //       toast.info("Cannot add more than available stock");
  //     } else {
  //       dispatch(
  //         addItemToCart({
  //           _id: product._id,
  //           name: product.name,
  //           price: product.price,
  //           quantity,
  //           availableStock: product.quantity,
  //           image: product.image,
  //           status: product.status,
  //           category: product.category,
  //           description: product.description,
  //         })
  //       );
  //       toast.success("Product added to cart");
  //     }
  //   }
  // };

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
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="flex mt-4">
            <p className="text-gray-500 mx-2">
              <span className="font-bold text-black">TK {product.price}</span>
              {/* RegularPrice */}
              {/* <span className="mx-2 text-gray-400">
                <del> Tk 850.00 </del>
              </span>
              <span className="px-2 py-1 rounded text-white text-sm bg-[#9EA647]">
                Save TK 100.00
              </span> */}
            </p>
            Status:
            <p
              className={
                product.quantity > 0
                  ? "text-green-500 ml-3"
                  : "text-red-500 ml-3"
              }
            >
              {product.status}
            </p>
          </div>
          {/* <p className="text-sm text-gray-700 my-4">{product.description}</p> */}
          <p className="text-sm text-gray-600 my-2">
            Category: {product.category}
          </p>
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
          <div className="mt-8 space-y-4">
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
                className="flex items-center gap-2 bg-[#0084FF] text-white px-4 py-2 rounded hover:bg-[#006edc]"
              >
                <MessageCircleMore />
                Chat with us
              </Link>

              <Link
                to="https://wa.me/8801516559515"
                target="_blank"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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
