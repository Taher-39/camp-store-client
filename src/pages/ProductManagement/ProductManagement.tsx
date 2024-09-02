import { useState } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/product/productApi";
import Modal from "react-modal";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

// Initialize Modal
Modal.setAppElement("#root");

const ProductManagementPage = () => {
  const { data, isLoading, isSuccess, refetch } =
    useGetProductsQuery(undefined);
  const products = data?.data || [];
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([
    "Camping Tents",
    "Camping Shelters and Tarps",
    "Sleeping Equipment",
    "Camping Furniture & Equipment",
    "Camping Cooking Equipment",
    "Hydration and Food",
    "Outdoor Dining & Picnicware",
    "Camp Lighting",
    "Camping Accessories",
    "Outdoor Clothes",
    "Camping Spare Parts & Care",
    "Camping Trends",
  ]);

  const customStyles = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const res = await deleteProduct(id);
      if (res.data.success) {
        toast.success(res.data.message);
        refetch();
      } else {
        toast.error("Error occurred while deleting product.");
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct({
      name: "",
      description: "",
      category: "",
      status: "",
      price: "",
      quantity: "",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (product) => {
    try {
      // Convert price and quantity to numbers
      const formattedProduct = {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
        status: product.quantity > 0 ? "in-stock" : "out-of-stock",
      };

      let response;

      if (editingProduct?._id) {
        // Update existing product
        response = await updateProduct({
          id: editingProduct._id,
          updatedProduct: formattedProduct,
        });

        if (response?.data?.success) {
          toast.success("Product updated successfully.");
          refetch();
        } else {
          toast.error(response?.data?.message || "Failed to update product.");
        }
      } else {
        // Create new product
        response = await createProduct(formattedProduct);
        if (response?.data?.success) {
          toast.success("Product created successfully.");
          refetch();
        } else {
          toast.error(response?.data?.message || "Failed to create product.");
        }
      }

      setEditingProduct(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("An error occurred while saving the product.");
    }
  };

  const addNewCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      toast.success("New category added successfully.");
    } else if (categories.includes(newCategory)) {
      toast.error("Category already exists.");
    } else {
      toast.error("Category name cannot be empty.");
    }
  };

  // Pagination Logic
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let content;
  if (isLoading) {
    content = <p className="text-2xl text-center my-6">Loading...</p>;
  } else if (isSuccess) {
    content = (
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>
        <button
          onClick={handleCreate}
          className="text-white px-4 py-2 rounded-md mb-4 bg-[#4952b2] hover:bg-[#3712c2]"
        >
          Create New Product
        </button>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2">Image</th>
              <th className="w-1/4 px-4 py-2">Name</th>
              <th className="w-1/4 px-4 py-2">Price</th>
              <th className="w-1/4 px-4 py-2">Category</th>
              <th className="w-1/4 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">
                  <img
                    // src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2 relative">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:text-blue-700 mr-2 group relative"
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-0.5 hidden group-hover:inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded">
                      Edit
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-700"></span>
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700 group relative"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-0.5 hidden group-hover:inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded">
                      Delete
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-700"></span>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({
            length: Math.ceil(products.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === index + 1
                  ? "bg-[#4952b2] text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  } else {
    content = (
      <p className="text-2xl text-center my-6">Error loading products.</p>
    );
  }

  return (
    <>
      {content}

      {/* Modal for creating/updating product */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Product Modal"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#4952b2]">
          {editingProduct?._id ? "Edit Product" : "Create Product"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const productData = Object.fromEntries(formData);
            handleSave(productData);
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={editingProduct?.name}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={editingProduct?.description}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              name="category"
              defaultValue={editingProduct?.category}
              className="w-full px-3 py-2 border rounded"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addNewCategory}
              className="text-blue-500 hover:text-blue-700 mt-2"
            >
              Add New Category
            </button>
          </div>
          <div className="flex justify-between ">
            <div className="mr-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                defaultValue={editingProduct?.price}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                defaultValue={editingProduct?.quantity}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="text-gray-700 px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white px-4 py-2 rounded bg-[#4952b2] hover:bg-[#3712c2]"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProductManagementPage;
