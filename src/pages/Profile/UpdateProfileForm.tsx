import { useUpdateProfileMutation } from "@/redux/features/Auth/authApi";
import React, { useState } from "react";
import { toast } from "sonner";
import { IUser } from "@/types";

interface UpdateProfileFormProps {
  userDetails: {
    data: IUser;
  };
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  userDetails,
}) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [name, setName] = useState(userDetails?.data?.name || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {};
    if (name && name !== userDetails?.data?.name) {
      payload.name = name;
    }

    if (Object.keys(payload).length === 0) {
      return toast.info("No changes to update");
    }

    try {
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md p-4 bg-white shadow rounded-xl"
    >
      <div>
        <label className="block text-sm text-gray-600">Name</label>
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 text-sm text-white bg-[#9EA647] hover:bg-[#8d973f] rounded"
      >
        {isLoading ? "Updating..." : "Update Name"}
      </button>
    </form>
  );
};

export default UpdateProfileForm;
