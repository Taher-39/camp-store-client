import { useGetBestSellingProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";

export default function BestSellingSection() {
  const { data, isLoading, isError } =
    useGetBestSellingProductsQuery(undefined);
  const products = data?.data || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="w-5 h-5" />
        Loading...
      </div>
    );

  if (isError) return <div>Failed to load best-selling products</div>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          <span style={{ color: "#4952b2" }}>Best Selling </span>Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product: TProduct) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-medium text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600">${product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block px-6 py-3 text-white bg-[#4952b2] hover:bg-[#3712c2]"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
