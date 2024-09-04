import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOrder, setSortOrder] = useState("");

  const { data, isLoading, isSuccess } = useGetProductsQuery(undefined);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="w-5 h-5" />
        Loading...
      </div>
    );
  if (!isSuccess || data?.data?.length === 0) {
    return <div className="h-screen">No products available.</div>;
  }
  const products = data?.data;

  const uniqueCategories = products.reduce((acc, product) => {
    if (!acc.some((item) => item.category === product.category)) {
      acc.push({
        category: product.category,
        _id: product._id,
      });
    }
    return acc;
  }, []);

  const filteredProducts = products
    ?.filter(
      (product: { name: string; description: string }) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product: { category: string }) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .filter(
      (product: { price: number }) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a: { price: number }, b: { price: number }) =>
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
    <div className="container mx-auto py-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full max-w-xs"
        />

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category._id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>

          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
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
            className="bg-[#4952b2] hover:bg-[#3712c2] text-white px-4 py-2 rounded-md"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map(
          (product: {
            images: string | undefined;
            name: string;
            price: number;
            _id: string;
            status: string;
          }) => (
            <div
              key={product._id}
              className="border border-gray-300 p-4 rounded-md"
            >
              <img
                src={product.image}
                alt="product img"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <div className="flex justify-between">
                <p className="text-gray-500">${product.price}</p>
                <p
                  className={
                    product.status === "in-stock"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {product.status}
                </p>
              </div>
              <Link
                to={`/products/${product._id}`}
                className="text-blue-500 hover:text-[#3712c2] mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
