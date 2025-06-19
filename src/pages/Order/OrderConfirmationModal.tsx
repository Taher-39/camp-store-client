// import React, { useState } from "react";
// import { Dialog } from "@headlessui/react";
// import { useSubtotalPrice } from "@/utils/SubTotalPrice";
// import { useLazyValidateCouponQuery } from "@/redux/features/coupon/couponApi";
// import { toast } from "sonner";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useCurrentUser } from "@/redux/features/Auth/authSlice";
// import { useGetUserByEmailQuery } from "@/redux/features/Auth/authApi";
// import { IAddress } from "@/types";
// import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
// import { clearCart } from "@/redux/features/cart/cartSlice";
// import { useNavigate } from "react-router-dom";
// import * as yup from "yup";

// interface OrderModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: OrderData) => void;
// }

// interface OrderData {
//   name: string;
//   phone: string;
//   address: string;
//   shipping: string;
//   coupon: string;
//   note: string;
// }

// enum Payment_Type {
//   CASH_ON_DELIVERY = "cash-on-delivery"
// }

// const OrderConfirmationModal: React.FC<OrderModalProps> = ({
//   isOpen,
//   onClose
// }) => {
//   const [createOrder] = useCreateOrderMutation();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const authUser = useAppSelector(useCurrentUser);
//   const email = authUser?.email ?? "";
//   const { data: userDetails, isLoading } = useGetUserByEmailQuery(email, {
//     skip: !authUser?.email,
//   });
//   const [triggerValidateCoupon, { isLoading: isValidationLoading }] =
//     useLazyValidateCouponQuery();
//   const subtotal = useSubtotalPrice();
//   const addresses: IAddress[] = userDetails?.data?.addresses || [];
//   const cartItems = useAppSelector((state) => state.cart.items);

//   const [useDefaultAddress, setUseDefaultAddress] = useState(false);

//   const currentName = isLoading ? "" : userDetails?.data.name || "";
//   const defaultPhone = addresses[0]?.phone || "";
//   const defaultAddress = isLoading
//     ? ""
//     : addresses[0]?.address + ", " + addresses[0]?.city || "";

//   const [discount, setDiscount] = useState<number>(0);
//   const [formData, setFormData] = useState<OrderData>({
//     name: currentName,
//     phone: defaultPhone,
//     address: defaultAddress,
//     shipping: "",
//     coupon: "",
//     note: "",
//   });

//   const isMangoOnly = cartItems.every(
//     (item) => item.category?.toLowerCase() === "mango-আম"
//   );

//   const handleApplyCoupon = async () => {
//     const couponCode = formData.coupon.trim().toLowerCase();
//     if (!couponCode) {
//       toast.info("অনুগ্রহ করে একটি কুপন কোড লিখুন!");
//       return;
//     }

//     try {
//       const res = await triggerValidateCoupon(couponCode).unwrap();
//       if (res && res.data.discountPercentage) {
//         setDiscount(res.data.discountPercentage);
//         toast.success(
//           `✅ কুপন সফলভাবে অ্যাপ্লাই হয়েছে! আপনি ${(
//             res.data.discountPercentage * 100
//           ).toFixed(2)}% ছাড় পাচ্ছেন ইনশাআল্লাহ।`
//         );
//       } else {
//         toast.error("❌ এই কুপনটি ভ্যালিড নয়।");
//       }
//     } catch (error) {
//       toast.error("❌ কুপন যাচাই করতে ব্যর্থ! দয়া করে সঠিক কুপন কোড লিখুন।");
//     }
//   };

//   let shippingCost = 0;

//   if (isMangoOnly) {
//     if (formData.shipping === "হোম ডেলিভারি") {
//       shippingCost = 0; // যেমন ধরো হোম ডেলিভারির জন্য ১০০ টাকা
//     } else {
//       shippingCost = 0; // পয়েন্ট ডেলিভারির জন্য ফ্রি
//     }
//   } else {
//     shippingCost =
//       formData.shipping === "রাজশাহী সিটির বাহিরে - TK 130" ? 130 : 70;
//   }

//   const newSubtotal = subtotal - subtotal * discount;
//   const totalPrice = newSubtotal + shippingCost;

//   // Client-side validation schema
//   const createOrderSchema = yup.object().shape({
//     userId: yup.string().optional(),
//     orderItems: yup.array().of(
//       yup.object().shape({
//         name: yup.string().required(),
//         image: yup.string().required(),
//         price: yup.number().required(),
//         quantity: yup.number().required(),
//         productId: yup.string().required(), // ObjectId
//       })
//     ).required(),
//     name: yup.string().required(),
//     shippingAddress: yup.object().shape({
//       phone: yup.string().required(),
//       address: yup.string().required(),
//       city: yup.string().required(),
//       postalCode: yup.string().optional(),
//     }).required(),
//     couponCodeUsed: yup.string().optional(),
//     note: yup.string().optional(),
//     subtotal: yup.number().required(),
//     shipping: yup.string().optional(),
//     shippingCost: yup.number().required(),
//     totalPrice: yup.number().required(),
//     paymentMethod: yup.mixed<Payment_Type>().oneOf(Object.values(Payment_Type)).required(),
//     orderStatus: yup.string().optional(),
//   });

//   const handleSubmit = async () => {
//     const { name, phone, address, coupon, note, shipping } = formData;

//     // Prepare order items
//     const orderItems = cartItems.map((item) => ({
//       name: item.name,
//       image: item.image,
//       price: item.price,
//       quantity: item.quantity,
//       productId: item._id, // Assuming item._id is the product ID
//     }));

//     // Prepare shipping address
//     const shippingAddress = {
//       phone,
//       address,
//       city: address.split(',').pop()?.trim() || "", // Extract city from address
//       postalCode: "", // Assuming no postal code field in your form
//     };

//     // Create payload
//     const payload = {
//       userId: userDetails?.data?.id, // Optional: User ID
//       orderItems: orderItems,
//       name: name,
//       shippingAddress: shippingAddress,
//       couponCodeUsed: coupon, // Optional: Coupon code
//       note: note, // Optional: Note
//       subtotal: subtotal,
//       shipping: shipping,
//       shippingCost: shippingCost,
//       totalPrice: totalPrice,
//       paymentMethod: Payment_Type.CASH_ON_DELIVERY,
//     };

//     console.log("Payload before validation:", payload); // Log the payload

//     // Validate payload
//     try {
//       await createOrderSchema.validate(payload, { abortEarly: false });
//       console.log("Payload after validation:", payload); // Log if validation passes
//     } catch (error) {
//       if (error instanceof yup.ValidationError) {
//         // Handle validation errors
//         const errorMessages = error.errors.join(', ');
//         console.error("Validation Error:", error); // Log the full error
//         toast.error(`Validation Error: ${errorMessages}`);
//         return;
//       } else {
//         console.error("Unexpected Validation Error:", error); // Log unexpected errors
//         toast.error("An unexpected validation error occurred.");
//         return;
//       }
//     }

//     try {
//       const res = await createOrder(payload).unwrap();
//       console.log(res);
//       toast.success("✅ অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
//       dispatch(clearCart());
//       navigate("/success");
//       onClose();
//     } catch (error) {
//       console.error("Order Error:", error);
//       toast.error("❌ অর্ডার সম্পন্ন করতে ব্যর্থ!");
//     }
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onClose={onClose}
//       className="fixed z-50 inset-0 overflow-y-auto"
//     >
//       <div className="flex items-center justify-center min-h-screen p-4">
//         <Dialog.Panel className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg border">
//           <Dialog.Title className="text-xl font-semibold mb-4 text-center text-green-600">
//             ক্যাশ অন ডেলিভারি - অর্ডার করুন
//           </Dialog.Title>

//           <div className="flex items-center mb-3">
//             <input
//               type="checkbox"
//               checked={useDefaultAddress}
//               onChange={() => {
//                 const next = !useDefaultAddress;
//                 setUseDefaultAddress(next);
//                 setFormData({
//                   ...formData,
//                   name: next ? currentName : "",
//                   phone: next ? defaultPhone : "",
//                   address: next ? defaultAddress : "",
//                 });
//               }}
//               className="mr-2"
//             />
//             <label>ডিফল্ট ঠিকানা ব্যবহার করুন</label>
//           </div>

//           <div className="space-y-3">
//             <input
//               className="w-full p-2 border rounded"
//               placeholder="আপনার নাম*"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//             />
//             <input
//               className="w-full p-2 border rounded"
//               placeholder="ফোন নাম্বার*"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//             />
//             <textarea
//               className="w-full p-2 border rounded"
//               placeholder="এড্রেস*"
//               value={formData.address}
//               onChange={(e) =>
//                 setFormData({ ...formData, address: e.target.value })
//               }
//             />

//             {isMangoOnly ? (
//               <select
//                 className="w-full p-2 border rounded"
//                 value={formData.shipping}
//                 onChange={(e) =>
//                   setFormData({ ...formData, shipping: e.target.value })
//                 }
//               >
//                 <option>হোম ডেলিভারি</option>
//                 <option>পয়েন্ট ডেলিভারি</option>
//               </select>
//             ) : (
//               <select
//                 className="w-full p-2 border rounded"
//                 value={formData.shipping}
//                 onChange={(e) =>
//                   setFormData({ ...formData, shipping: e.target.value })
//                 }
//               >
//                 <option>রাজশাহী সিটির বাহিরে - TK 130</option>
//                 <option>রাজশাহী সিটির ভিতরে - TK 70</option>
//               </select>
//             )}

//             <div className="flex w-full space-x-2">
//               <input
//                 className="flex-grow p-2 border rounded"
//                 placeholder="কুপন কোড"
//                 value={formData.coupon}
//                 onChange={(e) =>
//                   setFormData({ ...formData, coupon: e.target.value })
//                 }
//               />
//               <button
//                 className="text-white bg-[#9EA647] hover:bg-[#8d973f] px-4 py-2 rounded"
//                 onClick={handleApplyCoupon}
//                 disabled={isValidationLoading}
//               >
//                 {isValidationLoading ? "লোড হচ্ছে..." : "অ্যাপ্লাই"}
//               </button>
//             </div>

//             <textarea
//               className="w-full p-2 border rounded"
//               placeholder="Order note"
//               value={formData.note}
//               onChange={(e) =>
//                 setFormData({ ...formData, note: e.target.value })
//               }
//             />
//           </div>

//           <div className="mt-5 border-t pt-4">
//             <h3 className="text-md font-semibold mb-2">কার্ট আইটেমসমূহ:</h3>
//             <div className="max-h-40 overflow-y-auto space-y-2">
//               {cartItems.map((item) => (
//                 <div key={item._id} className="flex items-center space-x-3">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     width={50}
//                     height={50}
//                     className="rounded border"
//                   />
//                   <div>
//                     <p className="text-sm font-medium">{item.name}</p>
//                     <p className="text-xs text-gray-600">
//                       Qty: {item.quantity} × Tk {item.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mt-5 space-y-1 text-sm text-gray-700">
//             <div>পণ্যের দাম: Tk {subtotal.toFixed(2)}</div>
//             <div>ডেলিভারি চার্জ: Tk {shippingCost.toFixed(2)}</div>
//             <div className="font-bold">সর্বমোট: Tk {totalPrice.toFixed(2)}</div>
//           </div>

//           <div className="mt-5 flex flex-col gap-2">
//             <button
//               onClick={handleSubmit}
//               className="text-white bg-[#9EA647] hover:bg-[#8d973f] py-2 rounded font-bold"
//             >
//               অর্ডার কনফার্ম করুন
//             </button>
//             <button
//               onClick={onClose}
//               className="text-red-500 hover:underline text-sm"
//             >
//               বাতিল করুন
//             </button>
//           </div>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// };

// export default OrderConfirmationModal;

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useSubtotalPrice } from "@/utils/SubTotalPrice";
import { useLazyValidateCouponQuery } from "@/redux/features/coupon/couponApi";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

enum Payment_Type {
  CASH_ON_DELIVERY = "cash-on-delivery",
}

const OrderConfirmationModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const subtotal = useSubtotalPrice();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [triggerValidateCoupon] = useLazyValidateCouponQuery();
  const [discount, setDiscount] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    shipping: "",
    coupon: "",
    note: "",
  });

  const isMangoOnly = cartItems.every(
    (item) => item.category?.toLowerCase() === "mango-আম"
  );

  const handleApplyCoupon = async () => {
    const couponCode = formData.coupon.trim().toLowerCase();
    if (!couponCode) {
      toast.info("অনুগ্রহ করে একটি কুপন কোড লিখুন!");
      return;
    }

    try {
      const res = await triggerValidateCoupon(couponCode).unwrap();
      if (res && res.data.discountPercentage) {
        setDiscount(res.data.discountPercentage);
        toast.success(
          `✅ কুপন সফলভাবে অ্যাপ্লাই হয়েছে! আপনি ${(
            res.data.discountPercentage * 100
          ).toFixed(2)}% ছাড় পাচ্ছেন ইনশাআল্লাহ।`
        );
      } else {
        toast.error("❌ এই কুপনটি ভ্যালিড নয়।");
      }
    } catch (error) {
      toast.error("❌ কুপন যাচাই করতে ব্যর্থ! দয়া করে সঠিক কুপন কোড লিখুন।");
    }
  };

  let shippingCost = 0;
  if (isMangoOnly) {
    shippingCost = formData.shipping === "হোম ডেলিভারি" ? 0 : 0;
  } else {
    shippingCost =
      formData.shipping === "রাজশাহী সিটির বাহিরে - TK 130" ? 130 : 70;
  }

  const newSubtotal = subtotal - subtotal * discount;
  const totalPrice = newSubtotal + shippingCost;

  const createOrderSchema = yup.object().shape({
    name: yup.string().required("নাম আবশ্যক"),
    phone: yup
      .string()
      .required("ফোন নাম্বার আবশ্যক")
      .matches(/^01[3-9]\d{8}$/, "বৈধ বাংলাদেশী ফোন নাম্বার দিন"),
    address: yup.string().required("ঠিকানা আবশ্যক"),
    shipping: yup.string().required("ডেলিভারি অপশন নির্বাচন করুন"),
  });

  const handleSubmit = async () => {
    try {
      await createOrderSchema.validate(formData, { abortEarly: false });

      const orderItems = cartItems.map((item) => ({
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        productId: item._id,
      }));

      const payload = {
        orderItems,
        name: formData.name,
        shippingAddress: {
          phone: formData.phone,
          address: formData.address,
          city: formData.address.split(",").pop()?.trim() || "",
        },
        couponCodeUsed: formData.coupon,
        note: formData.note,
        subtotal,
        shipping: formData.shipping,
        shippingCost,
        totalPrice,
        paymentMethod: Payment_Type.CASH_ON_DELIVERY,
      };

      const res = await createOrder(payload).unwrap();
      toast.success(res?.data?.message);
      dispatch(clearCart());
      navigate("/success");
      onClose();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.forEach((err) => toast.error(err));
      } else {
        console.error("Order Error:", error);
        toast.error("❌ অর্ডার সম্পন্ন করতে ব্যর্থ!");
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      {/* Blurred Background Layer */}
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />

      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl max-w-lg w-full shadow-2xl border border-gray-200 relative z-10">
          <Dialog.Title className="text-xl font-bold mb-4 text-center text-[#9EA647]">
            ক্যাশ অন ডেলিভারি - অর্ডার করুন
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                আপনার নাম*
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9EA647] focus:border-transparent"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ফোন নাম্বার*
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9EA647] focus:border-transparent"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                সম্পূর্ণ ঠিকানা*
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9EA647] focus:border-transparent"
                rows={3}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ডেলিভারি অপশন*
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9EA647] focus:border-transparent"
                value={formData.shipping}
                onChange={(e) =>
                  setFormData({ ...formData, shipping: e.target.value })
                }
              >
                <option value="">-- নির্বাচন করুন --</option>
                {isMangoOnly ? (
                  <>
                    <option value="হোম ডেলিভারি">হোম ডেলিভারি (ফ্রি)</option>
                    <option value="পয়েন্ট ডেলিভারি">
                      পয়েন্ট ডেলিভারি (ফ্রি)
                    </option>
                  </>
                ) : (
                  <>
                    <option value="রাজশাহী সিটির বাহিরে - TK 130">
                      রাজশাহী সিটির বাহিরে - TK 130
                    </option>
                    <option value="রাজশাহী সিটির ভিতরে - TK 70">
                      রাজশাহী সিটির ভিতরে - TK 70
                    </option>
                  </>
                )}
              </select>
            </div>

            <div className="flex gap-2">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  কুপন কোড (যদি থাকে)
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9EA647] focus:border-transparent"
                  value={formData.coupon}
                  onChange={(e) =>
                    setFormData({ ...formData, coupon: e.target.value })
                  }
                />
              </div>
              <button
                className="self-end text-white bg-[#9EA647] hover:bg-[#818a27] px-4 py-3 rounded-lg font-medium"
                onClick={handleApplyCoupon}
              >
                অ্যাপ্লাই
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                অতিরিক্ত নোট (যদি থাকে)
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9EA647] focus:border-transparent"
                rows={2}
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-md font-semibold mb-3">আপনার অর্ডার:</h3>
            <div className="max-h-48 overflow-y-auto space-y-3 mb-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × {item.price} টাকা
                    </p>
                  </div>
                  <p className="font-medium">
                    {item.quantity * item.price} টাকা
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>পণ্যের দাম:</span>
                <span>{subtotal.toFixed(2)} টাকা</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ:</span>
                <span>{shippingCost.toFixed(2)} টাকা</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>ছাড়:</span>
                  <span>-{(subtotal * discount).toFixed(2)} টাকা</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>সর্বমোট:</span>
                <span>{totalPrice.toFixed(2)} টাকা</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#9EA647] hover:bg-[#818a27] text-white rounded-lg font-bold text-lg"
            >
              অর্ডার কনফার্ম করুন
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm"
            >
              বাতিল করুন
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OrderConfirmationModal;
