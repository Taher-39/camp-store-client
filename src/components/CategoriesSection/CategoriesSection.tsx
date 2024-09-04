import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/redux/features/product/productApi";


export default function CategoriesSection() {
  const { data, isLoading, isSuccess } = useGetProductsQuery(undefined);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isSuccess || !data?.data?.length) {
    return <div>No products available.</div>;
  }
  const products = data?.data;

  const uniqueCategories = products.reduce((acc, product) => {
    if (!acc.some((item) => item.category === product.category)) {
      acc.push({
        category: product.category,
        image: product.image, 
        _id: product._id,
      });
    }
    return acc;
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Get everything you <span style={{ color: "#4952b2" }}>need</span>
        </h2>
        <div className="overflow-x-auto flex space-x-6 py-4">
          {uniqueCategories.map((item) => (
            <Link
              key={item._id}
              to={`/category?name=${item.category}`}
              className="flex-shrink-0 bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 w-40"
            >
              <img
                src={item.image}
                alt={item.category}
                className="w-full h-36 object-cover mb-4 rounded-lg"
              />
              <h3 className="mt-2 text-center text-black font-medium">
                {item.category}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
