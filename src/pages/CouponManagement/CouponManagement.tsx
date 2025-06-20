import { useState } from "react";
import { ICoupon } from "@/types";
import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
} from "@/redux/features/coupon/couponApi";
import DeleteConfirmationModal from "@/utils/DeleteConfirmation";
import Sidebar from "@/components/Sidebar/Sidebar";

const CouponManagementLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar (always visible on desktop) */}
      <div className="hidden w-64 border-r bg-white shadow-md sm:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <CouponManagement />
        </div>
      </div>
    </div>
  );
};


const initialCouponState: Partial<ICoupon> = {
  code: "",
  discountPercentage: 0,
  expiresAt: null,
};

const CouponManagement = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    id: string;
  } | null>(null);
  const { data, refetch, isLoading } = useGetCouponsQuery();
  const coupons: ICoupon[] = data?.data ?? [];

  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const [formData, setFormData] =
    useState<Partial<ICoupon>>(initialCouponState);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "discountPercentage"
          ? Number(value)
          : name === "expiresAt"
          ? new Date(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editId) {
        await updateCoupon({ id: editId, updatedCoupon: formData }).unwrap();
        toast.success("Coupon updated!");
      } else {
        await createCoupon(formData).unwrap();
        toast.success("Coupon created!");
      }
      setFormData(initialCouponState);
      setIsEditing(false);
      setEditId(null);
      refetch();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (coupon: ICoupon) => {
    setFormData({
      ...coupon,
      expiresAt: coupon.expiresAt ? new Date(coupon.expiresAt) : null,
    });
    setIsEditing(true);
    setEditId(coupon._id ?? null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCoupon(id).unwrap();
      toast.success("Coupon deleted!");
      refetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">🎟️ Manage Coupons</h2>

      {/* Coupon Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-4 mb-6 space-y-4"
      >
        <div className="flex gap-4">
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={formData.code}
            onChange={handleChange}
            required
            className="border p-2 rounded w-1/3"
          />
          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount Percentage %"
            value={formData.discountPercentage}
            onChange={handleChange}
            required
            className="border p-2 rounded w-1/3"
          />

          <input
            type="date"
            name="expiresAt"
            value={
              formData.expiresAt
                ? formData.expiresAt.toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            required
            className="border p-2 rounded w-1/3"
          />
        </div>
        <button
          type="submit"
          className=" px-4 py-2 rounded text-white bg-[#9EA647] hover:bg-[#8d973f]"
        >
          {isEditing ? "Update Coupon" : "Create Coupon"}
        </button>
      </form>

      {/* Coupon List */}
      <div className="space-y-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : coupons.length === 0 ? (
          <p className="text-center text-gray-500 font-bold text-2xl my-10">
            No coupons found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons.map((coupon: any) => (
              <div
                key={coupon._id}
                className="flex justify-between items-center border p-4 rounded bg-gray-50"
              >
                <div>
                  <p className="font-medium">
                    Code: <span className="text-blue-600">{coupon.code}</span>
                  </p>
                  <p>Discount Percentage: {(coupon.discountPercentage * 100).toFixed(2)}%</p>
                  <p>
                    Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm({ id: coupon._id })}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                  <DeleteConfirmationModal
                    isOpen={showDeleteConfirm !== null}
                    onClose={() => setShowDeleteConfirm(null)}
                    onConfirm={() => {
                      if (showDeleteConfirm?.id) {
                        handleDelete(showDeleteConfirm.id);
                      }
                      setShowDeleteConfirm(null);
                    }}
                    title="আপনি কি নিশ্চিত?"
                    message="আপনি কি এই কুপনটি বাদ দিতে চান?"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponManagementLayout;
