import Sidebar from "@/components/Sidebar/Sidebar";
import ChangePasswordForm from "./ChangePasswordForm";

const SettingsLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar (always visible on desktop) */}
      <div className="hidden w-64 border-r bg-white shadow-md sm:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <Settings />
        </div>
      </div>
    </div>
  );
};



const Settings = () => {
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
