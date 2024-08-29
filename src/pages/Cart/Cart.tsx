import { Link } from "react-router-dom";
import { updateCartItemQuantity, removeItemFromCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (id: string, newQuantity: number, stock: number) => {
    if (newQuantity >= 1 && newQuantity <= stock) {
      dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeItemFromCart(id));
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="border border-gray-300 p-4 rounded-md">
              <img
                src={(item.images && item.images.length > 0) ? item.images[0] : "default-image-url.jpg"}  // Safely accessing the first image or default
                alt={item.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-500 mb-2">Category: {item.category}</p>
              <p className="text-gray-500 mb-2">Description: {item.description}</p>
              <p className="text-gray-500 mb-2">Status: {item.status}</p>
              <p className="text-gray-500 mb-2">${item.price}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.stock)}
                  disabled={item.quantity <= 1}
                  className="bg-gray-200 px-2 py-1 rounded-md"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.stock)}
                  disabled={item.quantity >= item.stock}
                  className="bg-gray-200 px-2 py-1 rounded-md"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 mt-4"
              >
                Remove
              </button>
            </div>
            
            ))}
          </div>

          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-xl font-bold">Total: ${calculateTotalPrice()}</h3>
            <Link
              to="/checkout"
              className={`mt-4 px-4 py-2 rounded-md text-white ${
                cartItems.some((item) => item.quantity < 1) ? "bg-gray-400 cursor-not-allowed" : "bg-[#9EA647] hover:bg-[#3712c2]"
              }`}
              onClick={(e) => {
                if (cartItems.some((item) => item.quantity < 1)) {
                  e.preventDefault();
                }
              }}
            >
              Place Order
            </Link>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
