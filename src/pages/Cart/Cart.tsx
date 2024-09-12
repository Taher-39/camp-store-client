import { Link } from "react-router-dom";
import {
  updateCartItemQuantity,
  removeItemFromCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (_id: string, newQuantity: number) => {
    dispatch(updateCartItemQuantity({ _id, quantity: newQuantity }));
  };

  const handleRemoveItem = (_id: string) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeItemFromCart(_id));
    }
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto py-8 min-h-screen w-[90%]">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length ? (
        <div className="bg-white shadow-lg p-4 rounded-md">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="py-4 flex items-start space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    Category: {item.category}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Status: {item.status}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 border border-gray-300 rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.availableStock}
                      className="px-2 py-1 border border-gray-300 rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 mt-4 block"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 border-t border-gray-300">
            <h3 className="text-xl font-semibold">
              Total: ${calculateTotalPrice()}
            </h3>
            <div className="mt-4">
              <Link
                to="/checkout"
                className={`mt-4 px-4 py-2 rounded-md text-white ${
                  cartItems.some(
                    (item) => item.quantity < 1 || item.availableStock === 0
                  )
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#4952b2] hover:bg-[#3712c2]"
                }`}
                onClick={(e) => {
                  if (
                    cartItems.some(
                      (item) => item.quantity < 1 || item.availableStock === 0
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
