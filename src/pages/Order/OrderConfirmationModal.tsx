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
import { useCurrentUser } from "@/redux/features/Auth/authSlice";

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
  const authUser = useAppSelector(useCurrentUser);
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

      // Ensure user is logged in
      if (!authUser) {
        toast.error("অর্ডার করতে লগইন করুন!");
        navigate("/login");
        return;
      }


      const orderItems = cartItems.map((item) => ({
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        productId: item._id,
      }));

      // Extract city from address (or use a separate city field if needed)
      const addressParts = formData.address.split(",");
      const city =
        addressParts.length > 1
          ? addressParts[addressParts.length - 1].trim()
          : "Unknown";

      const payload = {
        orderItems,
        name: formData.name,
        shippingAddress: {
          phone: formData.phone,
          address: formData.address,
          city: city,
        },
        couponCodeUsed: formData.coupon || undefined, // Send undefined instead of empty string
        note: formData.note || undefined,
        subtotal: subtotal,
        shipping: formData.shipping,
        shippingCost: shippingCost,
        totalPrice: totalPrice,
        paymentMethod: Payment_Type.CASH_ON_DELIVERY,
        userEmail: authUser?.email,
      };

      const res = await createOrder(payload).unwrap();
      toast.success(res?.data?.message);
      dispatch(clearCart());
      navigate("/success");
      onClose();
    } catch (error: any) {
      toast.error(error.data.message);
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
