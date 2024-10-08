import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addItemToCart,
  updateCartItemQuantity,
} from "@/redux/features/cart/cartSlice";
import "./ProductDetails.css";
import { Loader } from "lucide-react";
import { magnify } from "@/utils/ImageMagnifier";
import { toast } from "sonner";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const product = data?.data;
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const cartItems = useAppSelector((state) => state.cart.items);

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

  const handleAddToCart = () => {
    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;
      if (newQuantity > existingProduct.availableStock) {
        toast.info("Cannot add more than available stock");
      } else {
        dispatch(
          updateCartItemQuantity({ _id: product._id, quantity: newQuantity })
        );
        toast.success("Product quantity updated in cart");
      }
    } else {
      if (quantity > product.quantity) {
        toast.info("Cannot add more than available stock");
      } else {
        dispatch(
          addItemToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity,
            availableStock: product.quantity,
            image: product.image,
            status: product.status,
            category: product.category,
            description: product.description,
          })
        );
        toast.success("Product added to cart");
      }
    }
  };

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
            Price:
            <p className="text-gray-500 mx-2"> ${product.price}</p>
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
          <p className="text-sm text-gray-700 my-4">{product.description}</p>
          <p className="text-sm text-gray-600 my-2">
            Category: {product.category}
          </p>
          <p className="text-sm text-gray-600 my-2">
            Stock: {product.quantity} units
          </p>

          <div className="my-4">
            <label htmlFor="quantity" className="block text-sm text-gray-700">
              Quantity:
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
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
                  if (val >= 1 && val <= product.quantity) {
                    setQuantity(val);
                  }
                }}
                min="1"
                max={product.quantity}
                className="border border-gray-300 p-2 rounded-md w-16 text-center mx-2"
              />
              <button
                onClick={() =>
                  setQuantity(
                    quantity < product.quantity ? quantity + 1 : quantity
                  )
                }
                className="bg-gray-200 px-2 py-1 rounded-md"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={quantity > product.quantity || product.quantity === 0}
            className={`mt-4 px-4 py-2 rounded-md text-white ${
              quantity > product.quantity || product.quantity === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#4952b2] hover:bg-[#3712c2]"
            }`}
          >
            Add to Cart
          </button>
          <button className="mt-4 mr-3 px-4 py-2 ml-2 rounded-md text-white bg-[#4952b2] hover:bg-[#3712c2]">
            <Link to="/cart">Go Cart</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
