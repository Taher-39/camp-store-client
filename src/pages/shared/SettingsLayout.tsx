import ChangePasswordForm from "./ChangePasswordForm";

const SettingsLayout = () => {
  return (
    <div className="min-h-screen px-4 py-12 bg-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-[#9EA647] text-center mb-2">
          Settings
        </h2>
        <h3 className="text-lg text-center text-gray-700 mb-6">Update Password</h3>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default SettingsLayout;
