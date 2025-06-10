import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useUpdateSalesAndStockMutation } from "@/redux/features/product/productApi";

const CheckoutPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("online-payment");
  const shippingCost = 0.0; // 0% sc
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [updateSalesAndStock] = useUpdateSalesAndStockMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const calculateShippingCost = () => {
    return calculateSubtotal() * shippingCost;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + shippingCost;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate user details
    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.phone ||
      !userDetails.address
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    const products = cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    if (paymentMethod === "cod") {
      try {
        const response = await updateSalesAndStock(products).unwrap();

        if (response.success) {
          toast.success("Order placed successfully!");
          dispatch(clearCart());
          // window.location.reload();
          navigate("/success");
        } else {
          throw new Error("Some products could not be updated.");
        }
      } catch (error) {
        console.error("Order Placement Error:", error);
        toast.error("Failed to place order. Please try again.");
      }
    } else if (paymentMethod === "stripe") {
      navigate("/stripe-payment");
    }
  };

  return (
    <div className="container mx-auto py-8 flex w-[90%]">
      {/* Checkout Form */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <form onSubmit={handlePlaceOrder}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="online-payment">Online Payment</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 text-white bg-[#9EA647] hover:bg-[#8d973f] rounded-md"
          >
            অন লাইন পেমেন্ট
          </button>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded-md ml-6 mt-6 lg:mt-0">
        <div className="mb-3 border-b-2 py-4">
          <h3 className="text-md font-semibold mb-2">অর্ডার সারাংশ</h3>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded border"
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-600">
                    Qty: {item.quantity} × Tk {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            পণ্যের দাম: {calculateSubtotal().toFixed(2)} টাকা
          </p>
          <p className="text-sm text-gray-500">
            ডেলিভারি চার্জ: {calculateShippingCost().toFixed(2)} টাকা
          </p>
          <p className="text-lg font-semibold mt-2">
            সর্বমোট: {calculateTotal().toFixed(2)} টাকা
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
