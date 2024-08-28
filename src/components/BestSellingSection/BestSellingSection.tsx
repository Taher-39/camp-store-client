import { Link } from "react-router-dom";
import campingTent from "@/assets/CampingTent/family/two/main.avif";
import SleepingBag from "@/assets/sleeping-bag/one/1.1/250-artic-dusk-HI-5-large.webp";
import PortableStove from "@/assets/Portable Stove/picture.avif";
const products = [
  {
    id: 1,
    name: "Camping Tent",
    image: campingTent,
    price: "$199",
  },
  {
    id: 2,
    name: "Sleeping Bag",
    image: SleepingBag,
    price: "$79",
  },
  {
    id: 3,
    name: "Portable Stove",
    image: PortableStove,
    price: "$59",
  },
];

export default function BestSellingSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          <span style={{ color: "#4952b2" }}>Best Selling </span>Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
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
              <p className="text-gray-600">{product.price}</p>
              <Link
                to={`/product/${product.id}`}
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
            className="inline-block px-6 py-3 text-white"
            style={{ backgroundColor: "#4952b2" }}
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
