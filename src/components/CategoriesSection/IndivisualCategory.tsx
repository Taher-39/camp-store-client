import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { Loader } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const IndivisualCategory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");

  const { data, isLoading, isSuccess } = useGetProductsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-4xl text-gray-600" />
      </div>
    );
  }

  if (!isSuccess || data?.data?.length === 0) {
    return <div className="h-screen">No products available.</div>;
  }

  const filteredProducts = data?.data?.filter(
    (product: { category: string }) => product.category === name
  );

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center my-8">
        {name} Category Products
      </h1>
      <div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto">
            {filteredProducts.map(
              (product: {
                images: string[] | undefined;
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
                    src={product.images?.[0] || "/placeholder.jpg"}
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
                    className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
                  >
                    View Details
                  </Link>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="text-2xl text-center my-4">
            This category's product is not available.
          </div>
        )}
      </div>
    </div>
  );
};

export default IndivisualCategory;
