import { useState } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/product/productApi";
import Modal from "react-modal";
import { PencilIcon, TrashIcon } from "lucide-react";
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


  const customStyles = {
    content: {
      top: '100%',
      left: '100%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-5%, 15%)',
    }
  }


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const res = await deleteProduct(id);
      if (res.data.success) {
        toast.success(res.data.message);
        refetch();
      } else {
        toast.error("Error occured try when delete product.");
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
      let response;

      if (editingProduct?._id) {
        // Update existing product
        response = await updateProduct({
          id: editingProduct._id,
          updatedProduct: product,
        });

        if (response?.data?.success) {
          toast.success("Product updated successfully.");
          refetch();
        } else {
          toast.error(response?.data?.message || "Failed to update product.");
        }
      } else {
        // Create new product
        response = await createProduct(product);

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
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <PencilIcon
                      onClick={() => handleEdit(product)}
                      className="w-5 h-5 text-yellow-500 cursor-pointer hover:text-yellow-600 transform transition-transform duration-200 hover:scale-110"
                    />
                    <TrashIcon
                      onClick={() => handleDelete(product._id)}
                      className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600 transform transition-transform duration-200 hover:scale-110"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array(Math.ceil(products.length / itemsPerPage))
            .fill()
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-[#4952b2] hover:bg-[#3712c2] text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
        </div>

        {/* Modal for Create/Edit Product */}
        <Modal
          isOpen={isModalOpen}
          style={customStyles}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Product Form"
          className="bg-white rounded-md shadow-lg p-6 w-96 mx-auto mt-10 z-50"
        >
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    );
  }
  return content;
};

const ProductForm = ({ product = {}, onSave, onCancel }) => {
  if (!product) return null;

  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    category: product.category || "",
    status: product.status || "",
    price: product.price ? Number(product.price) : "",
    quantity: product.quantity ? Number(product.quantity) : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-4xl mb-4 text-[#4952b2]">
        {product._id ? "Edit Product" : "Create New Product"}
      </h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <input
        type="text"
        name="status"
        value={formData.status}
        onChange={handleChange}
        placeholder="Status"
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#4952b2] hover:bg-[#3712c2] text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductManagementPage;
