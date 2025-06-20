/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import Modal from "react-modal";
import {
  PencilIcon,
  TrashIcon,
  Loader,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/product/productApi";
import "./ProductManagement.css";
import { TProduct } from "@/types";
import { CloudinaryUploadWidget } from "@/components/Review/CloudinaryUploadWidget";
import Sidebar from "@/components/Sidebar/Sidebar";


const ProductManagementPage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar (always visible on desktop) */}
      <div className="hidden w-64 border-r bg-white shadow-md sm:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <ProductManagementPageLayout />
        </div>
      </div>
    </div>
  );
};



// Initialize Modal
Modal.setAppElement("#root");

// Define additional types
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface UpdateProductArgs {
  id: string;
  updatedProduct: Omit<TProduct, "_id">;
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  weight: string;
  image: string;
}

const ProductManagementPageLayout: React.FC = () => {
  const { data, isLoading, isSuccess, refetch, isError } =
    useGetProductsQuery(undefined);
  const products: TProduct[] = data?.data || [];

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string } | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([
    "Mango-আম",
    "Ata-আটা",
  ]);

  const customStyles: Modal.Styles = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "500px",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm?.id) return;
    setIsDeleting(true);
    try {
      const res = (await deleteProduct(
        deleteConfirm.id
      ).unwrap()) as ApiResponse<null>;
      if (res.success) {
        toast.success(res.message);
        refetch();
      } else {
        toast.error("Error occurred while deleting product.");
      }
    } catch (err) {
      toast.error("Failed to delete product.");
    } finally {
      setIsDeleting(false);
      setDeleteConfirm(null);
    }
  };

  // Handle Edit Product
  const handleEdit = (product: TProduct) => {
    setEditingProduct(product);
    setImageUrl(product.image || "");
    setIsModalOpen(true);
  };

  // Handle Create Product
  const handleCreate = () => {
    setEditingProduct({
      name: "",
      description: "",
      category: "",
      price: 0,
      quantity: 0,
      weight: 0,
      status: "out-of-stock",
      image: "",
    });
    setImageUrl("");
    setIsModalOpen(true);
  };

  // Handle Save (Create or Update)
  const handleSave = async (productData: ProductFormData) => {
    if (!editingProduct) return;

    const formattedProduct: Omit<TProduct, "_id"> = {
      name: productData.name,
      description: productData.description,
      category: productData.category,
      price: Number(productData.price),
      quantity: Number(productData.quantity),
      weight: Number(productData.weight),
      status: Number(productData.quantity) > 0 ? "in-stock" : "out-of-stock",
      image: imageUrl || editingProduct.image,
    };

    try {
      let response: ApiResponse<TProduct>;
      if (editingProduct._id) {
        const args: UpdateProductArgs = {
          id: editingProduct._id,
          updatedProduct: formattedProduct,
        };
        response = await updateProduct(args).unwrap();
        toast.success("Product updated successfully.");
      } else {
        response = await createProduct(formattedProduct).unwrap();
        toast.success("Product created successfully.");
        console.log(response);
      }
      refetch();
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(
        err?.data?.message || "An error occurred while saving the product."
      );
    }
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    toast.success("Image uploaded successfully.");
  };


  // Add New Category
  const addNewCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      toast.success("New category added successfully.");
    } else if (newCategory && categories.includes(newCategory)) {
      toast.error("Category already exists.");
    } else {
      toast.error("Category name cannot be empty.");
    }
  };

  // Pagination Logic
  const itemsPerPage: number = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastProduct: number = currentPage * itemsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - itemsPerPage;
  const currentProducts: TProduct[] = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Content Rendering
  let content: JSX.Element;
  if (isLoading) {
    content = (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-4xl text-gray-600" />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="container mx-auto py-8 custom-scrollbar w-[90%]">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-md mb-4 text-white bg-[#9EA647] hover:bg-[#8d973f]]"
        >
          Create New Product
        </button>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2">Image</th>
              <th className="w-1/4 px-4 py-2">Name</th>
              <th className="w-1/4 px-4 py-2">Price/Kg</th>
              <th className="w-1/4 px-4 py-2">Category</th>
              <th className="w-1/4 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product: TProduct) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">
                  💵 {product.price.toFixed(2)}
                </td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2 relative">
                  <button
                    onClick={() => handleEdit(product)}
                    className="mr-2 group relative text-[#9EA647]"
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-0.5 hidden group-hover:inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded">
                      Edit
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-gray-700"></span>
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      if (product._id) {
                        handleDelete(product._id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 group relative"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-0.5 hidden group-hover:inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded">
                      Delete
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-gray-700"></span>
                    </span>
                  </button>

                  {/* Confirmation Modal */}
                  {deleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <AlertTriangle className="w-12 h-12 text-yellow-500" />
                          <h3 className="text-xl font-semibold">
                            Delete Product?
                          </h3>
                          <p className="text-gray-600 px-4">
                            Are you sure you want to permanently delete this
                            product?
                          </p>
                          <div className="flex gap-4 w-full mt-4">
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              disabled={isDeleting}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={confirmDelete}
                              className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                              disabled={isDeleting}
                            >
                              <Trash2 className="w-4 h-4" />
                              {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination mt-4">
          {Array.from({
            length: Math.ceil(products.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-[#9EA647] text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Product Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
        >
          <div className="w-[75%] max-w-lg mx-auto p-4 sm:p-6 md:p-2 bg-white rounded-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct?._id ? "Edit Product" : "Create New Product"}
            </h2>
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const productData: ProductFormData = {
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,
                  category: formData.get("category") as string,
                  price: formData.get("price") as string,
                  quantity: formData.get("quantity") as string,
                  weight: formData.get("weight") as string,
                  image: formData.get("image") as string,
                };
                handleSave(productData);
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={editingProduct?.name}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    defaultValue={editingProduct?.description}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={2}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="category" className="block font-medium">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    defaultValue={editingProduct?.category}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addNewCategory}
                    className="mt-2 text-sm text-gray-500 hover:underline"
                  >
                    Add new category
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Add Photo</p>
                  <CloudinaryUploadWidget
                    onUpload={handleImageUpload}
                    folder="halal-zone/reviews"
                  />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Product"
                      className="mt-2 w-10 h-10 object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label htmlFor="quantity" className="block font-medium">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    defaultValue={editingProduct?.quantity}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="weight" className="block font-medium">
                    Weight
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    defaultValue={editingProduct?.weight}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="price" className="block font-medium">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    defaultValue={editingProduct?.price}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-white bg-[#9EA647] hover:bg-[#8d973f]"
                >
                  {editingProduct?._id ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 text-gray-600 px-4 py-2 rounded-md border hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex justify-center items-center h-screen">
        <p>Error: "Something went wrong."</p>
      </div>
    );
  } else {
    content = <div>No products found.</div>;
  }

  return content;
};

export default ProductManagementPage;
