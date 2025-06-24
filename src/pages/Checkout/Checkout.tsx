// import React, { useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { clearCart } from "@/redux/features/cart/cartSlice";
// import { useUpdateSalesAndStockMutation } from "@/redux/features/product/productApi";

// const CheckoutPage = () => {
//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("online-payment");
//   const shippingCost = 0.0; // 0% sc
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const cartItems = useAppSelector((state) => state.cart.items);
//   const [updateSalesAndStock] = useUpdateSalesAndStockMutation();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserDetails({
//       ...userDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const calculateSubtotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };
//   const calculateShippingCost = () => {
//     return calculateSubtotal() * shippingCost;
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal() + shippingCost;
//   };

//   const handlePlaceOrder = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate user details
//     if (
//       !userDetails.name ||
//       !userDetails.email ||
//       !userDetails.phone ||
//       !userDetails.address
//     ) {
//       toast.error("Please fill out all fields.");
//       return;
//     }

//     const products = cartItems.map((item) => ({
//       productId: item._id,
//       quantity: item.quantity,
//     }));

//     if (paymentMethod === "cod") {
//       try {
//         const response = await updateSalesAndStock(products).unwrap();

//         if (response.success) {
//           toast.success("Order placed successfully!");
//           dispatch(clearCart());
//           // window.location.reload();
//           navigate("/success");
//         } else {
//           throw new Error("Some products could not be updated.");
//         }
//       } catch (error) {
//         console.error("Order Placement Error:", error);
//         toast.error("Failed to place order. Please try again.");
//       }
//     } else if (paymentMethod === "stripe") {
//       navigate("/stripe-payment");
//     }
//   };

//   return (
//     <div className="container mx-auto py-8 flex w-[90%]">
//       {/* Checkout Form */}
//       <div className="w-full lg:w-2/3">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//         <form onSubmit={handlePlaceOrder}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={userDetails.name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={userDetails.email}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={userDetails.phone}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={userDetails.address}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Payment Method</label>
//             <select
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             >
//               <option value="online-payment">Online Payment</option>
//               <option value="cod">Cash on Delivery</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="px-6 py-2 text-white bg-[#9EA647] hover:bg-[#8d973f] rounded-md"
//           >
//             অন লাইন পেমেন্ট
//           </button>
//         </form>
//       </div>

//       {/* Cart Summary */}
//       <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded-md ml-6 mt-6 lg:mt-0">
//         <div className="mb-3 border-b-2 py-4">
//           <h3 className="text-md font-semibold mb-2">অর্ডার সারাংশ</h3>
//           <div className="max-h-40 overflow-y-auto space-y-2">
//             {cartItems.map((item) => (
//               <div key={item._id} className="flex items-center space-x-3">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   width={50}
//                   height={50}
//                   className="rounded border"
//                 />
//                 <div>
//                   <p className="text-sm font-medium">{item.name}</p>
//                   <p className="text-xs text-gray-600">
//                     Qty: {item.quantity} × Tk {item.price}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mt-4">
//           <p className="text-sm text-gray-500">
//             পণ্যের দাম: {calculateSubtotal().toFixed(2)} টাকা
//           </p>
//           <p className="text-sm text-gray-500">
//             ডেলিভারি চার্জ: {calculateShippingCost().toFixed(2)} টাকা
//           </p>
//           <p className="text-lg font-semibold mt-2">
//             সর্বমোট: {calculateTotal().toFixed(2)} টাকা
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;


import React, { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useUpdateSalesAndStockMutation } from "@/redux/features/product/productApi";
import { useCurrentUser } from "@/redux/features/Auth/authSlice";
import { useLazyValidateCouponQuery } from "@/redux/features/coupon/couponApi";

const CheckoutPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    district: "",
    address: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [differentShipping, setDifferentShipping] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online-payment");
  // const [searchTerm, setSearchTerm] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingDate, setShippingDate] = useState("");
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const authUser = useAppSelector(useCurrentUser);
  const [updateSalesAndStock] = useUpdateSalesAndStockMutation();
  const [validateCoupon] = useLazyValidateCouponQuery();

  // Calculate shipping date (2 days from now)
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setShippingDate(formattedDate);
  }, []);

  // All 64 districts of Bangladesh in Bangla
  const allDistricts = useMemo(() => [
    "বাগেরহাট", "বান্দরবান", "বরগুনা", "বরিশাল", "ভোলা", "বগুড়া", "ব্রাহ্মণবাড়িয়া", 
    "চাঁদপুর", "চাঁপাইনবাবগঞ্জ", "চট্টগ্রাম", "চুয়াডাঙ্গা", "কক্সবাজার", 
    "কুমিল্লা", "ঢাকা", "দিনাজপুর", "ফরিদপুর", "ফেনী", "গাইবান্ধা", "গাজীপুর", 
    "গোপালগঞ্জ", "হবিগঞ্জ", "জামালপুর", "যশোর", "ঝালকাঠি", "ঝিনাইদহ", 
    "জয়পুরহাট", "খাগড়াছড়ি", "খুলনা", "কিশোরগঞ্জ", "কুড়িগ্রাম", "কুষ্টিয়া", 
    "লক্ষ্মীপুর", "লালমনিরহাট", "মাদারীপুর", "মাগুরা", "মানিকগঞ্জ", "মেহেরপুর", 
    "মৌলভীবাজার", "মুন্সিগঞ্জ", "ময়মনসিংহ", "নওগাঁ", "নড়াইল", "নারায়ণগঞ্জ", 
    "নরসিংদী", "নাটোর", "নেত্রকোণা", "নীলফামারী", "নোয়াখালী", "পাবনা", 
    "পঞ্চগড়", "পটুয়াখালী", "পিরোজপুর", "রাজবাড়ী", "রাজশাহী", "রাঙ্গামাটি", 
    "রংপুর", "সাতক্ষীরা", "শরীয়তপুর", "শেরপুর", "সিরাজগঞ্জ", "সুনামগঞ্জ", 
    "সিলেট", "টাঙ্গাইল", "ঠাকুরগাঁও"
  ], []);

  // Filter districts based on search term
  // const filteredDistricts = useMemo(() => {
  //   return allDistricts.filter(district =>
  //     district.includes(searchTerm))
  // }, [searchTerm, allDistricts]);

  // Check if cart contains only mango products
  const isMangoOnly = useMemo(() => {
    return cartItems.every(item => item.category?.toLowerCase() === "mango-আম");
  }, [cartItems]);

  // Calculate shipping cost based on district and product type
  const shippingCost = useMemo(() => {
    if (isMangoOnly) {
      return 0; // Free shipping for mango products
    }
    
    // Higher shipping cost for remote districts
    const remoteDistricts = ["বান্দরবান", "খাগড়াছড়ি", "রাঙ্গামাটি", "কক্সবাজার"];
    if (remoteDistricts.includes(userDetails.district)) {
      return 250;
    }
    
    // Medium shipping cost for other districts
    return 180;
  }, [userDetails.district, isMangoOnly]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountedAmount = subtotal * discount;
    return (subtotal - discountedAmount) + shippingCost;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("কুপন কোড লিখুন");
      return;
    }

    try {
      const response = await validateCoupon(couponCode).unwrap();
      console.log(response);
      if (response.success) {
        setDiscount(response.data.discountPercentage * 100);
        toast.success(`${response.data.discountPercentage * 100}% ছাড় প্রয়োগ করা হয়েছে`);
      } else {
        toast.error("অবৈধ কুপন কোড");
      }
    } catch (error) {
      toast.error("কুপন যাচাই করতে সমস্যা হয়েছে");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !userDetails.name ||
      !userDetails.district ||
      !userDetails.address ||
      !userDetails.phone
    ) {
      toast.error("সব আবশ্যক তথ্য প্রদান করুন");
      return;
    }

    const products = cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    const orderData = {
      email: authUser ? authUser.email : userDetails.email,
      items: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: {
        name: userDetails.name,
        district: userDetails.district,
        address: userDetails.address,
        phone: userDetails.phone,
      },
      couponCode: couponCode || null,
      subtotal: calculateSubtotal(),
      discount: calculateSubtotal() * discount,
      shippingCost,
      total: calculateTotal(),
      paymentMethod,
      notes: userDetails.notes,
      shippingDate
    };

    if (paymentMethod === "cod") {
      try {
        const response = await updateSalesAndStock(products).unwrap();
        if (response.success) {
          // Here you would typically send the orderData to your backend
          toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
          dispatch(clearCart());
          navigate("/success");
        } else {
          throw new Error("কিছু পণ্য আপডেট করা যায়নি");
        }
      } catch (error) {
        console.error("অর্ডার ত্রুটি:", error);
        toast.error("অর্ডার সম্পন্ন করতে ব্যর্থ");
      }
    } else if (paymentMethod === "online-payment") {
      navigate("/stripe-payment", { state: { orderData } });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Billing Details */}
        <div className="w-full lg:w-3/5">
          <h2 className="text-2xl font-bold mb-6">বিলিং বিবরণ</h2>
          
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">
                নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                জেলা <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                {/* <input
                  type="text"
                  placeholder="জেলা খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mb-2"
                /> */}
                <select
                  name="district"
                  value={userDetails.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="">জেলা নির্বাচন করুন</option>
                  {allDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                ঠিকানা <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
                pattern="01[3-9]\d{8}"
                title="বাংলাদেশী ফোন নম্বর (যেমন: 01712345678)"
              />
            </div>

            { !authUser && <div>
              <label className="block text-gray-700 mb-1">ইমেইল (ঐচ্ছিক)</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>}

            <div className="flex gap-2">
              <div className="flex-grow">
                <label className="block text-gray-700 mb-1">কুপন কোড</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="কুপন কোড লিখুন"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="self-end bg-[#9EA647] text-white px-4 py-2 rounded-md"
              >
                প্রয়োগ করুন
              </button>
            </div>

            <div className="text-sm text-gray-600">
              আরও ভাল অভিজ্ঞতা এবং অর্ডার ইতিহাসের জন্য আমাদের সাথে অ্যাকাউন্ট তৈরি করুন।
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="createAccount"
                checked={createAccount}
                onChange={(e) => setCreateAccount(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="createAccount">অ্যাকাউন্ট তৈরি করবেন?</label>
            </div>

            {createAccount && (
              <div>
                <label className="block text-gray-700 mb-1">পাসওয়ার্ড (ঐচ্ছিক)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="differentShipping"
                checked={differentShipping}
                onChange={(e) => setDifferentShipping(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="differentShipping">ভিন্ন ঠিকানায় ডেলিভারি চান?</label>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">বিশেষ নোট (ঐচ্ছিক)</label>
              <textarea
                name="notes"
                value={userDetails.notes}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="আপনার অর্ডার সম্পর্কে বিশেষ নির্দেশনা, যেমন ডেলিভারির জন্য বিশেষ নোট"
                rows={3}
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-gray-50 p-6 rounded-md border">
            <h2 className="text-2xl font-bold mb-6">আপনার অর্ডার</h2>
            
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between font-medium mb-2">
                <span>পণ্য</span>
                <span>মূল্য</span>
              </div>
              
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{shippingDate} × {item.quantity}</p>
                  </div>
                  <div>৳ {(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>সাবটোটাল</span>
                <span>৳ {calculateSubtotal().toLocaleString()}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>ছাড়</span>
                  <span>-৳ {(calculateSubtotal() * discount).toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span>
                  {isMangoOnly ? "ফ্রি" : "৳ " + shippingCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 pl-4">
                <span>
                  {isMangoOnly 
                    ? "আমের জন্য ফ্রি ডেলিভারি" 
                    : userDetails.district 
                      ? `${userDetails.district}-এ ডেলিভারি`
                      : "ডেলিভারি চার্জ গণনা করা হবে"}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
              <span>সর্বমোট</span>
              <span>৳ {calculateTotal().toLocaleString()}</span>
            </div>

            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mr-2"
                  />
                  <label htmlFor="cod" className="font-medium">
                    ক্যাশ অন ডেলিভারি
                  </label>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  পণ্য পাওয়ার পর পেমেন্ট সম্পন্ন করুন
                </p>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="online-payment"
                    name="paymentMethod"
                    value="online-payment"
                    checked={paymentMethod === "online-payment"}
                    onChange={() => setPaymentMethod("online-payment")}
                    className="mr-2"
                  />
                  <label htmlFor="online-payment" className="font-medium">
                    অনলাইন পেমেন্ট
                  </label>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              আপনার ব্যক্তিগত তথ্য আপনার অর্ডার প্রক্রিয়াকরণ, এই ওয়েবসাইট জুড়ে আপনার অভিজ্ঞতা সমর্থন এবং আমাদের গোপনীয়তা নীতিতে বর্ণিত অন্যান্য উদ্দেশ্যে ব্যবহার করা হবে।
            </p>

            <button
              type="submit"
              onClick={handlePlaceOrder}
              className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
            >
              অর্ডার সম্পন্ন করুন
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full mt-4 px-6 py-3 border border-gray-300 hover:bg-gray-100 rounded-md font-medium"
            >
              কার্টে ফিরে যান
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;