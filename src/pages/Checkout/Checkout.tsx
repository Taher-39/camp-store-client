import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";

const CheckoutPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate user details
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (paymentMethod === "cod") {
      // Process order with Cash on Delivery
      toast.success("Order placed successfully!");
      // Deduct stock and clear cart
      dispatch(clearCart());
      navigate("/success");
    } else if (paymentMethod === "stripe") {
      // Redirect to Stripe payment page
      // Implement actual Stripe integration here
      navigate("/stripe-payment"); 
    }
  };

  return (
    <div className="container mx-auto py-8">
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
          <label className="block text-gray-700 mb-2">Delivery Address</label>
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
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="mr-2"
            />
            <label className="mr-4">Cash on Delivery</label>

            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
              className="mr-2"
            />
            <label>Stripe</label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#9EA647] hover:bg-[#3712c2] text-white px-4 py-2 rounded-md"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
