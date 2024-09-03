import { useState } from "react";
import { toast } from "sonner";
import Modal from "react-modal";
import { PencilIcon, TrashIcon, PlusIcon, Loader2Icon } from "lucide-react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/product/productApi";

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
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
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
      width: "500px",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await deleteProduct(id);
        if (res.data.success) {
          toast.success(res.data.message);
          refetch();
        } else {
          toast.error("Error occurred while deleting product.");
        }
      } catch (error) {
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setImageUrl(product.image || "");
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
      image: "",
    });
    setImageUrl("");
    setIsModalOpen(true);
  };

  const handleSave = async (product) => {
    const formattedProduct = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
      status: product.quantity > 0 ? "in-stock" : "out-of-stock",
      image: imageUrl || editingProduct?.image,
    };

    try {
      let response;
      if (editingProduct?._id) {
        response = await updateProduct({
          id: editingProduct._id,
          updatedProduct: formattedProduct,
        });
        if (response?.data?.success) {
          toast.success("Product updated successfully.");
        } else {
          toast.error(response?.data?.message || "Failed to update product.");
        }
      } else {
        response = await createProduct(formattedProduct);
        if (response?.data?.success) {
          toast.success("Product created successfully.");
        } else {
          toast.error(response?.data?.message || "Failed to create product.");
        }
      }
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("An error occurred while saving the product.");
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "CampStore");
    data.append("cloud_name", "do0ujomfx");
    try {
      if (!image) {
        return toast.error("Please upload an image.");
      }

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/do0ujomfx/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();
      console.log("cloudData", cloudData);
      if (cloudData.url) {
        setImageUrl(cloudData.url);
        toast.success("Image uploaded successfully.");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      toast.error("Error uploading image.");
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
    content = (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="w-5 h-5" />
        Loading...
      </div>
    );
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
                    src={product.image}
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
          <div className="flex justify-between">
            <div className="flex flex-col mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={editingProduct?.name || ""}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={editingProduct?.description || ""}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <div className="flex items-center space-x-2">
              <select
                name="category"
                defaultValue={editingProduct?.category || ""}
                className="w-full px-3 py-2 border rounded"
                required
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addNewCategory}
                className="flex items-center justify-center p-2 border rounded bg-[#4952b2] text-white"
              >
                <PlusIcon className="h-5 w-5  " />
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                defaultValue={editingProduct?.price || ""}
                className="w-full px-3 py-2 border rounded"
                required
                min="0"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                defaultValue={editingProduct?.quantity || ""}
                className="w-full px-3 py-2 border rounded"
                required
                min="0"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex items-center mt-2">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-[#4952b2] text-white px-4 py-2 rounded"
              >
                Select Image
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {image && (
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="text-white px-4 py-2 rounded-md ml-2 bg-[#4952b2] hover:bg-[#3712c2]"
                >
                  Upload Image
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 mr-2 border rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4952b2] text-white rounded"
            >
              {editingProduct?._id ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProductManagementPage;
