import { useState } from "react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/Auth/authApi";
import { logout, useCurrentUser } from "@/redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const ChangePasswordForm = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const [changePassword] = useChangePasswordMutation();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm password don't match.");
      return;
    }
    try {
      const payload = {
        email: user?.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.confirmPassword,
      };
      const result = await changePassword(payload).unwrap();
      toast.success(result.message);
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      dispatch(logout());
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="password"
        name="oldPassword"
        placeholder="Old Password"
        value={formData.oldPassword}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
        required
      />
      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={formData.newPassword}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
        required
      />
      <button type="submit" className="w-full px-4 py-2 bg-[#9EA647] hover:bg-[#8a943c] text-white font-medium rounded-md transition">
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
