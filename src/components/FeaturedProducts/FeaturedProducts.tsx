import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: string;
}

export default function FeaturedProductsSection() {
  const { data, isLoading, isSuccess } = useGetProductsQuery(undefined);
  const products: Product[] = data?.data || [];

  // Randomly select 3 products
  const featuredProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="w-5 h-5" />
        Loading...
      </div>
    );

  if (!isSuccess || featuredProducts.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span style={{ color: "#4952b2" }}>Featured</span> Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((product: Product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">$ {product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="inline-block px-6 py-3 text-white bg-[#4952b2] hover:bg-[#3712c2] font-semibold rounded-md"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
