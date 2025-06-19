// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// // import {
// //   addItemToCart,
// //   updateCartItemQuantity,
// // } from "@/redux/features/cart/cartSlice";
// import "./ProductDetails.css";
// import { Loader, MessageCircleMore } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa6";
// import { magnify } from "@/utils/ImageMagnifier";
// import OrderConfirmationModal from "../Order/OrderConfirmationModal";
// import { toast } from "sonner";
// import {
//   addItemToCart,
//   updateCartItemQuantity,
// } from "@/redux/features/cart/cartSlice";
// import ReviewSection from "@/components/Review/ReviewSection";
// // import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// // import { toast } from "sonner";

// // import { toast } from "sonner";

// const ProductDetailsPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { id } = useParams<{ id: string }>();
//   const { data, isLoading, isError } = useGetSingleProductQuery(id);
//   const product = data?.data;
//   const dispatch = useAppDispatch();
//   const [quantity] = useState(1);
//   const cartItems = useAppSelector((state) => state.cart.items);
//   const { user } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     if (product && product.image) {
//       magnify("productImage", 3);
//     }
//   }, [product]);

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader className="animate-spin text-4xl text-gray-600" />
//       </div>
//     );

//   if (isError || !product) {
//     return (
//       <div className="min-h-screen text-center text-4xl mt-6">
//         Product not found
//       </div>
//     );
//   }

//   const handleOrderClick = () => {
//     if (!user) {
//       navigate("/login", { state: { from: location.pathname } });
//       return;
//     }

//     // যদি কার্ট খালি থাকে তাহলে প্রোডাক্ট ডিরেক্টলি পাঠাও
//     if (cartItems.length === 0 && product) {
//       dispatch(
//         addItemToCart({
//           _id: product._id,
//           name: product.name,
//           price: product.price,
//           quantity: 1,
//           weight: product.weight,
//           availableStock: product.quantity,
//           image: product.image,
//           status: product.status,
//           category: product.category,
//           description: product.description,
//         })
//       );
//     } else if (cartItems.length !== 0 && product) {
//       //cart not empty but if this product don't stay cart this time
//       // add this then total cart show in orderConfirmationModal
//       const existingProduct = cartItems.find(
//         (item) => item._id !== product._id
//       );
//       const sameProduct = cartItems.find((item) => item._id === product._id);
//       if (existingProduct && !sameProduct) {
//         dispatch(
//           addItemToCart({
//             _id: product._id,
//             name: product.name,
//             price: product.price,
//             quantity: 1,
//             weight: product.weight,
//             availableStock: product.quantity,
//             image: product.image,
//             status: product.status,
//             category: product.category,
//             description: product.description,
//           })
//         );
//         toast.success("Product added to cart");
//       }
//     }

//     setIsModalOpen(true);
//   };

//   const handleOrderSubmit = (data: any) => {
//     console.log("🔔 অর্ডার কনফার্মড ✅", data);
//     // এখানে তুমি POST করে backend-এ পাঠাতে পারো
//   };

//   const handleAddToCart = () => {
//     const existingProduct = cartItems.find((item) => item._id === product._id);
//     if (existingProduct) {
//       const newQuantity = existingProduct.quantity + quantity;
//       if (newQuantity > existingProduct.availableStock) {
//         toast.info("Cannot add more than available stock");
//       } else {
//         dispatch(
//           updateCartItemQuantity({ _id: product._id, quantity: newQuantity })
//         );
//         toast.success("Product quantity updated in cart");
//       }
//     } else {
//       if (quantity > product.quantity) {
//         toast.info("Cannot add more than available stock");
//       } else {
//         dispatch(
//           addItemToCart({
//             _id: product._id,
//             name: product.name,
//             price: product.price,
//             quantity,
//             weight: product.weight,
//             availableStock: product.quantity,
//             image: product.image,
//             status: product.status,
//             category: product.category,
//             description: product.description,
//           })
//         );
//         toast.success("Product added to cart");
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto py-8 min-h-screen w-[90%]">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="img-magnifier-container relative">
//           <img
//             id="productImage"
//             src={product.image}
//             alt={product.name}
//             className="w-full h-auto object-cover rounded-md"
//           />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <p className="text-black-600 mb-4">
//               <span className="font-bold">মূল্যঃ </span>
//               {product.price} টাকা
//             </p>
//             <p className="text-black-600 mb-4 ">
//               <span className="font-bold">পরিমাণঃ </span>
//               {product.weight} কেজি
//             </p>
//           </div>
//           {/* <p className="text-sm text-gray-700 my-4">{product.description}</p> */}
//           <div className="grid grid-cols-2 gap-4">
//             <p>
//               Status:
//               <span
//                 className={
//                   product.quantity > 0
//                     ? "text-green-500 ml-3"
//                     : "text-red-500 ml-3"
//                 }
//               >
//                 {product.status}
//               </span>
//             </p>
//             <p className="text-sm text-black-600 my-2">
//               <span className="font-bold">Category:</span> {product.category}
//             </p>
//           </div>
//           {/* <p className="text-sm text-gray-600 my-2">
//             Stock: {product.quantity} units
//           </p>  */}

//           {/* <div className="my-4">
//             <label htmlFor="quantity" className="block text-sm text-gray-700">
//               Quantity:
//             </label>
//             <div className="flex items-center">
//               <button
//                 onClick={() => setQuantity(quantity > 10 ? quantity - 10 : 10)}
//                 className="bg-gray-200 px-2 py-1 rounded-md"
//               >
//                 -
//               </button>
//               <input
//                 id="quantity"
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => {
//                   const val = Number(e.target.value);
//                   if (val >= 10 && val <= product.quantity) {
//                     setQuantity(val);
//                   }
//                 }}
//                 min="10"
//                 max={product.quantity}
//                 className="border border-gray-300 p-2 rounded-md w-16 text-center mx-2"
//               />
//               <button
//                 onClick={() =>
//                   setQuantity(
//                     quantity < product.quantity ? quantity + 10 : quantity
//                   )
//                 }
//                 className="bg-gray-200 px-2 py-1 rounded-md"
//               >
//                 +
//               </button>
//             </div>
//           </div> */}

//           {/* Extra Order Options */}
//           <p className="text-sm text-green-600 font-medium">
//             🥭 আপনি শুধুমাত্র Mango-আম অর্ডার করলে, ডেলিভারি অপশন অনুযায়ী চার্জ
//             কমতে পারে।{" "}
//           </p>
//           <div className="mt-8 space-y-4">
//             <button
//               onClick={() => handleAddToCart()}
//               disabled={quantity > product.quantity || product.quantity === 0}
//               className={`px-4 py-2 text-center rounded-md text-white w-full ${
//                 quantity > product.quantity || product.quantity === 0
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-[#9EA647] hover:bg-[#8d973f]"
//               }`}
//             >
//               ব্যাগে যোগ করুন
//             </button>
//             <button
//               onClick={handleOrderClick}
//               className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               ক্যাশ অন ডেলিভারিতে অর্ডার করুন
//             </button>

//             <OrderConfirmationModal
//               isOpen={isModalOpen}
//               onClose={() => setIsModalOpen(false)}
//               onSubmit={handleOrderSubmit}
//             />

//             <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               Pay Online
//             </button>

//             <div className="flex gap-4 items-center mt-4">
//               <Link
//                 to="https://m.me/halzobd"
//                 target="_blank"
//                 className="w-full flex items-center gap-2 bg-[#0084FF] text-white px-4 py-2 rounded hover:bg-[#006edc]"
//               >
//                 <MessageCircleMore />
//                 Chat with us
//               </Link>

//               <Link
//                 to="https://wa.me/8801516559515"
//                 target="_blank"
//                 className="w-full flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 <FaWhatsapp />
//                 WhatsApp Us
//               </Link>
//             </div>

//             {/* Description Accordion */}
//             <details className="mt-6 border p-4 rounded-md cursor-pointer bg-gray-100">
//               <summary className="font-semibold text-lg">Description</summary>
//               <div className="mt-2 text-gray-700 text-sm">
//                 {product.description}
//               </div>
//             </details>

//             {/* Description Section - Improved */}
//             <div className="mt-8 space-y-4">
//               {/* <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//                 <h3 className="text-xl font-semibold mb-4 text-[#9EA647]">
//                   Product Details
//                 </h3>
//                 <div className="prose max-w-none text-gray-700">
//                   {product.description.split("\n").map((paragraph, index) => (
//                     <p
//                       key={index}
//                       className="mb-4 text-justify leading-relaxed"
//                     >
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>
//               </div> */}

//               {/* Features List */}
//               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//                 <h3 className="text-xl font-semibold mb-4 text-[#9EA647]">
//                   Key Features
//                 </h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-start">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>100% Organic & Halal Certified</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>Freshly Harvested from Local Farms</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>No Artificial Preservatives</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>Premium Quality Assurance</span>
//                   </li>
//                 </ul>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//                 <h3 className="text-xl font-semibold mb-4 text-[#9EA647]">
//                   Delivery Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-4 rounded-md">
//                     <h4 className="font-medium text-gray-800 mb-2">
//                       Inside Dhaka
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       • 1-2 business days
//                       <br />
//                       • delivery charge free for Mango
//                       <br />• Home/Point delivary available
//                     </p>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-md">
//                     <h4 className="font-medium text-gray-800 mb-2">
//                       Outside Dhaka
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       • 2-4 business days
//                       <br />
//                       • delivery charge free for Mango
//                       <br />• Home/Point delivary available
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Hotline and WhatsApp Info */}
//             <div className="mt-6 text-sm text-gray-700">
//               আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:
//               <br />
//               📞 <strong>+8801516-559515</strong>
//             </div>
//           </div>
//         </div>
//         <ReviewSection productId={product._id} />
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsPage;
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader, MessageCircleMore } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { magnify } from "@/utils/ImageMagnifier";
import OrderConfirmationModal from "../Order/OrderConfirmationModal";
import { toast } from "sonner";
import { addItemToCart, updateCartItemQuantity } from "@/redux/features/cart/cartSlice";
import ReviewSection from "@/components/Review/ReviewSection";

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

  if (isLoading) return (
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

    if (cartItems.length === 0 && product) {
      dispatch(addItemToCart({
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
      }));
    } else if (cartItems.length !== 0 && product) {
      const existingProduct = cartItems.find((item) => item._id !== product._id);
      const sameProduct = cartItems.find((item) => item._id === product._id);
      if (existingProduct && !sameProduct) {
        dispatch(addItemToCart({
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
        }));
        toast.success("Product added to cart");
      }
    }
    setIsModalOpen(true);
  };

  const handleOrderSubmit = () => {
    toast.info("Feature Comming Soon!");
  };

  const handleAddToCart = () => {
    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;
      if (newQuantity > existingProduct.availableStock) {
        toast.info("Cannot add more than available stock");
      } else {
        dispatch(updateCartItemQuantity({ _id: product._id, quantity: newQuantity }));
        toast.success("Product quantity updated in cart");
      }
    } else {
      if (quantity > product.quantity) {
        toast.info("Cannot add more than available stock");
      } else {
        dispatch(addItemToCart({
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
        }));
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
              <img
                id="productImage"
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-[500px] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Product Details - Middle Column */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-md h-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
            
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-[#9EA647]">{product.price} টাকা</span>
                <span className="text-gray-500">/ {product.weight} কেজি</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  product.quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {product.status}
                </span>
                <span className="text-sm text-gray-600">Category: {product.category}</span>
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
                ব্যাগে যোগ করুন
              </button>
              
              <button
                onClick={handleOrderClick}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
              >
                ক্যাশ অন ডেলিভারিতে অর্ডার করুন
              </button>

              <button onClick={handleOrderSubmit} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                Pay Online
              </button>

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
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Product Description</h3>
              <div className="prose max-w-none text-gray-700">
                {product.description.split("\n").map((paragraph: string, index: number) => (
                  <p key={index} className="mb-3">{paragraph}</p>
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
              <h3 className="text-xl font-semibold mb-4 text-[#9EA647] border-b pb-2">Key Features</h3>
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
              <h3 className="text-xl font-semibold mb-4 text-[#9EA647] border-b pb-2">Delivery Information</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Inside Dhaka</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1-2 business days</li>
                    <li>• Delivery charge free for Mango</li>
                    <li>• Home/Point delivery available</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Outside Dhaka</h4>
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