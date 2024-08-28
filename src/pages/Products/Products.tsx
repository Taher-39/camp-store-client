import { useState } from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOrder, setSortOrder] = useState("");

  const products = [
    {
      id: 1,
      name: "Deluxe Camping Tent",
      category: "camping-gear",
      description: "A spacious and durable tent for all weather conditions.",
      price: 150,
      image: "https://example.com/images/camping-tent.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Sleeping Bag",
      category: "camping-gear",
      description: "Warm and comfortable sleeping bag suitable for cold climates.",
      price: 75,
      image: "https://example.com/images/sleeping-bag.jpg",
    },
    {
      id: 3,
      name: "Portable Camping Stove",
      category: "camping-gear",
      description: "Lightweight and compact stove for outdoor cooking.",
      price: 60,
      image: "https://example.com/images/camping-stove.jpg",
    },
    {
      id: 4,
      name: "Hiking Backpack",
      category: "camping-gear",
      description: "Ergonomic backpack with multiple compartments for all your hiking needs.",
      price: 120,
      image: "https://example.com/images/hiking-backpack.jpg",
    },
    {
      id: 5,
      name: "Waterproof Jacket",
      category: "outdoor-clothing",
      description: "Stay dry with this high-quality waterproof jacket.",
      price: 90,
      image: "https://example.com/images/waterproof-jacket.jpg",
    },
    {
      id: 6,
      name: "Thermal Gloves",
      category: "outdoor-clothing",
      description: "Keep your hands warm with these insulated gloves.",
      price: 30,
      image: "https://example.com/images/thermal-gloves.jpg",
    },
    {
      id: 7,
      name: "Survival Knife",
      category: "survival-tools",
      description: "A must-have survival knife with a durable blade and multi-functional features.",
      price: 45,
      image: "https://example.com/images/survival-knife.jpg",
    },
    {
      id: 8,
      name: "Fire Starter Kit",
      category: "survival-tools",
      description: "Reliable fire starter kit for any emergency situation.",
      price: 20,
      image: "https://example.com/images/fire-starter-kit.jpg",
    },
    {
      id: 9,
      name: "First Aid Kit",
      category: "survival-tools",
      description: "Compact first aid kit with essential supplies.",
      price: 25,
      image: "https://example.com/images/first-aid-kit.jpg",
    },
    {
      id: 10,
      name: "Camping Chair",
      category: "camping-gear",
      description: "Comfortable folding chair for outdoor relaxation.",
      price: 40,
      image: "https://example.com/images/camping-chair.jpg",
    },
  ];

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.price - b.price
        : sortOrder === "desc"
        ? b.price - a.price
        : 0
    );

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setPriceRange([0, 100]);
    setSortOrder("");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full max-w-xs"
        />

        <div className="flex space-x-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">All Categories</option>
            <option value="camping-gear">Camping Gear</option>
            <option value="outdoor-clothing">Outdoor Clothing</option>
            <option value="survival-tools">Survival Tools</option>
            {/* Add more categories as needed */}
          </select>

          <input
            type="range"
            min="0"
            max="100"
            // value={priceRange}
            onChange={(e) =>
              setPriceRange([0, Number(e.target.value)])
            }
            className="slider"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 p-4 rounded-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-500">${product.price}</p>
            <Link
              to={`/product/${product.id}`}
              className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
