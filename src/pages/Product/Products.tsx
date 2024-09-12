import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Define types for product and category
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  status: string;
}

interface Category {
  category: string;
  _id: string;
}

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // 3 rows * 3 products per row

  const { data, isLoading, isSuccess } = useGetProductsQuery(undefined);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-4xl text-gray-600" />
      </div>
    );
  if (!isSuccess || data?.data?.length === 0) {
    return <div className="h-screen">No products available.</div>;
  }

  const products: Product[] = data?.data;

  const uniqueCategories: Category[] = products.reduce<Category[]>(
    (acc, product) => {
      if (!acc.some((item) => item.category === product.category)) {
        acc.push({
          category: product.category,
          _id: product._id,
        });
      }
      return acc;
    },
    []
  );

  const filteredProducts = products
    ?.filter(
      (product: Product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product: Product) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .filter(
      (product: Product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a: Product, b: Product) =>
      sortOrder === "asc"
        ? a.price - b.price
        : sortOrder === "desc"
        ? b.price - a.price
        : 0
    );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setPriceRange([0, 100]);
    setSortOrder("");
  };

  return (
    <div className="container mx-auto py-8 min-h-screen w-[90%]">
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
            {uniqueCategories.map((item: Category) => (
              <option key={item._id} value={item.category}>
                {item.category}
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
            <option value="">Sort By Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>

          <button
            onClick={clearFilters}
            className="bg-[#4952b2] text-white px-4 py-2 rounded-md hover:bg-[#3712c2]"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProducts.map((product: Product) => (
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
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#4952b2] text-white hover:bg-[#3712c2]"
          }`}
        >
          Previous
        </button>

        <div>
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#4952b2] text-white hover:bg-[#3712c2]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
