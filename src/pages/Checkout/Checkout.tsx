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
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const shippingCost= 0.03; // 3% sc
  const taxRate = 0.02; // 2% tax
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

  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };
  const calculateShippingCost = () => {
    return calculateSubtotal() * shippingCost;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + shippingCost;
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
    <div className="container mx-auto py-8 flex">
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
              <option value="cod">Cash on Delivery</option>
              <option value="stripe">Stripe</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-[#4952b2] hover:bg-[#3712c2] text-white rounded-md"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded-md ml-6 mt-6 lg:mt-0">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h4 className="text-lg">{item.name}</h4>
              <p className="text-sm text-gray-500">
                {item.quantity} x ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Subtotal: ${calculateSubtotal().toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Tax (2%): ${calculateTax().toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Shipping (3%): ${calculateShippingCost().toFixed(2)}
          </p>
          <p className="text-lg font-semibold mt-2">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
