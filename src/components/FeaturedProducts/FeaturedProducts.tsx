import { Link } from "react-router-dom";
import mountain from "@/assets//mountain.jpg";
import tent from "@/assets/tent-fire.jpg";
import campingTent from "@/assets/campingTent.jpg";

const featuredProducts = [
  {
    id: 1,
    name: "Deluxe Camping Tent",
    image: mountain,
    price: "$299",
  },
  {
    id: 2,
    name: "High-Performance Sleeping Bag",
    image: tent,
    price: "$119",
  },
  {
    id: 3,
    name: "Portable Water Filter",
    image: campingTent,
    price: "$49",
  },
];

export default function FeaturedProductsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span style={{ color: "#4952b2" }}>Featured</span> Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
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
              <p className="text-gray-600 mb-4">{product.price}</p>
              <Link
                to={`/product/${product.id}`}
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
