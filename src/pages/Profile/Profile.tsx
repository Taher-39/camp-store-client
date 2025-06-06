import { useState } from "react";
import { Plus, X, Edit, Trash2, Check, AlertTriangle } from "lucide-react";
import { useCurrentUser } from "@/redux/features/Auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetUserByEmailQuery,
  useUpdateProfileMutation,
} from "@/redux/features/Auth/authApi";
import { toast } from "sonner";
import { Tooltip } from "@/utils/Tooltip";
import { IAddress } from "@/types";

const ProfilePage = () => {
  const authUser = useAppSelector(useCurrentUser);
  const [showModal, setShowModal] = useState(false);
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddressIndex, setCurrentAddressIndex] = useState<number | null>(
    null
  );
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [name, setName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    type: "name" | "address";
    index?: number;
  } | null>(null);

  const [addressForm, setAddressForm] = useState<IAddress>({
    phone: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    isDefault: false,
  });

  const email = authUser?.email ?? "";
  const {
    data: userDetails,
    isLoading,
    isError,
    refetch,
  } = useGetUserByEmailQuery(email, {
    skip: !authUser?.email,
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 min-h-screen">Loading user details...</p>
    );
  if (isError || !userDetails)
    return (
      <p className="text-center mt-10 min-h-screen">Loading user details...</p>
    );

  const addresses: IAddress[] = userDetails?.data?.addresses || [];
  const hasAddress = addresses.length > 0;
  const currentName = userDetails?.data.name || "";

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = () => {
    setIsEditing(false);
    setCurrentAddressIndex(null);
    setAddressForm({
      phone: "",
      country: "",
      address: "",
      city: "",
      postalCode: "",
      isDefault: false,
    });
    setShowModal(true);
  };

  const handleEditAddress = (index: number) => {
    setIsEditing(true);
    setCurrentAddressIndex(index);
    setAddressForm(addresses[index]);
    setShowModal(true);
  };

  const handleDeleteAddress = async (index: number) => {
    try {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      await updateProfile({
        addresses: updatedAddresses,
      }).unwrap();
      toast.success("Address deleted successfully!");
      setShowDeleteConfirm(null);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete address");
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAddress = {
        phone: addressForm.phone,
        country: addressForm.country,
        address: addressForm.address,
        city: addressForm.city,
        postalCode: addressForm.postalCode,
        isDefault: addressForm.isDefault,
      };

      let updatedAddresses = [...addresses];
      if (addressForm.isDefault) {
        updatedAddresses = updatedAddresses.map((addr) => ({
          ...addr,
          isDefault: false,
        }));
      }

      if (isEditing && currentAddressIndex !== null) {
        updatedAddresses[currentAddressIndex] = newAddress;
      } else {
        updatedAddresses.push(newAddress);
      }

      await updateProfile({
        addresses: updatedAddresses,
      }).unwrap();

      toast.success(`Address ${isEditing ? "updated" : "added"} successfully!`);
      setShowModal(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${isEditing ? "update" : "add"} address`);
    }
  };

  const handleUpdateName = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      await updateProfile({
        name: name.trim(),
      }).unwrap();
      toast.success("Name updated successfully!");
      setShowNameEdit(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update name");
    }
  };

  const handleDeleteName = async () => {
    try {
      const res = await updateProfile({ name: "" }).unwrap();
      console.log("Delete response:", res);
      toast.success("Name deleted successfully!");

      setName(""); // Update local state
      setShowNameEdit(false);
      setShowDeleteConfirm(null);
      refetch(); // Make sure this refreshes currentName
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete name");
    }
  };

  const renderDeleteConfirmation = () => {
    if (!showDeleteConfirm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
          <div className="flex flex-col items-center text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-yellow-500 hidden" />
            <h3 className="text-xl font-semibold">
              Delete {showDeleteConfirm.type === "name" ? "Name" : "Address"}?
            </h3>
            <p className="text-gray-600 px-4">
              Are you sure you want to permanently delete this{" "}
              {showDeleteConfirm.type}?
            </p>
            <div className="flex gap-4 w-full mt-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (showDeleteConfirm.type === "name") {
                    handleDeleteName();
                  } else if (showDeleteConfirm.index !== undefined) {
                    handleDeleteAddress(showDeleteConfirm.index);
                  }
                }}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-gray-800 relative">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>

      {/* Name & Email Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Email</p>
          <p className="text-lg font-medium">{email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Name</p>
          {!showNameEdit ? (
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">{currentName || "Not set"}</p>
              <div className="flex gap-2">
                <Tooltip text={currentName ? "Edit name" : "Add name"}>
                  <button
                    onClick={() => {
                      setName(currentName);
                      setShowNameEdit(true);
                    }}
                    className="p-1 text-gray-600 hover:text-[#9EA647] rounded-full hover:bg-gray-100"
                  >
                    {currentName ? (
                      <Edit className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                </Tooltip>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#9EA647]"
                placeholder="Enter your name"
                autoFocus
              />
              <div className="flex gap-1">
                <Tooltip text="Save">
                  <button
                    onClick={handleUpdateName}
                    className="p-1 text-[#9EA647] hover:text-[#8d973f] rounded-full hover:bg-gray-100"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </Tooltip>
                <Tooltip text="Cancel">
                  <button
                    onClick={() => setShowNameEdit(false)}
                    className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Addresses</h2>
          <Tooltip text="Add new address">
            <button
              onClick={handleAddAddress}
              className="flex items-center gap-2 text-sm font-medium text-white bg-[#9EA647] hover:bg-[#8d973f] px-4 py-2 rounded-md transition"
            >
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          </Tooltip>
        </div>

        {hasAddress ? (
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50 relative"
              >
                {address.isDefault && (
                  <span className="text-xs text-white bg-[#9EA647] px-2 py-1 rounded-full mb-2 inline-block">
                    Default
                  </span>
                )}
                <div className="pr-8">
                  <p className="font-medium">{address.address}</p>
                  <p className="text-gray-600">
                    {address.city}, {address.postalCode}
                  </p>
                  <p className="text-gray-600">{address.country}</p>
                  {address.phone && (
                    <p className="text-gray-600">📞 {address.phone}</p>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex gap-1">
                  <Tooltip text="Edit address">
                    <button
                      onClick={() => handleEditAddress(index)}
                      className="p-1 text-gray-600 hover:text-[#9EA647] rounded-full hover:bg-gray-200"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip text="Delete address">
                    <button
                      onClick={() =>
                        setShowDeleteConfirm({ type: "address", index })
                      }
                      className="p-1 text-gray-600 hover:text-red-500 rounded-full hover:bg-gray-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic py-4">
            No address added yet.
          </p>
        )}
      </div>

      {/* Address Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Address" : "Add New Address"}
            </h3>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line*
                </label>
                <input
                  type="text"
                  name="address"
                  value={addressForm.address}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#9EA647]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  name="city"
                  value={addressForm.city}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#9EA647]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code*
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={addressForm.postalCode}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#9EA647]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country*
                </label>
                <input
                  type="text"
                  name="country"
                  value={addressForm.country}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#9EA647]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={addressForm.phone}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#9EA647]"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={addressForm.isDefault}
                  onChange={handleAddressChange}
                  className="h-4 w-4 text-[#9EA647] focus:ring-[#9EA647] border-gray-300 rounded"
                />
                <label
                  htmlFor="isDefault"
                  className="ml-2 text-sm text-gray-700"
                >
                  Set as default address
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 text-sm text-white bg-[#9EA647] hover:bg-[#8d973f] rounded-md transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {isEditing ? "Updating..." : "Saving..."}
                    </>
                  ) : isEditing ? (
                    "Update Address"
                  ) : (
                    "Save Address"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {renderDeleteConfirmation()}
    </div>
  );
};

export default ProfilePage;
