import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { useAppDispatch } from "@/redux/hooks";
import { addItemToCart } from "@/redux/features/cart/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const product = data?.data
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, quantity }));
  };

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded-md"
        />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl text-gray-500 my-2">${product.price}</p>
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
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={product.quantity}
              className="border border-gray-300 p-2 rounded-md w-full max-w-xs"
            />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={quantity > product.quantity}
            className={`mt-4 px-4 py-2 rounded-md text-white ${
              quantity > product.quantity
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#4952b2] hover:bg-[#3712c2]"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
