import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen w-[90%]">
      <h2 className="text-3xl font-bold mb-6">অর্ডার সফল হয়েছে!</h2>
      <p className="text-lg mb-4">
        আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। আমাদের সঙ্গে কেনাকাটার জন্য ধন্যবাদ!
      </p>

      <div className="flex gap-4 mt-6 flex-wrap">
        {/* হোম পেজ লিংক */}
        <Link
          to="/"
          className="px-6 py-3 text-white font-semibold rounded-lg shadow bg-[#4952b2] hover:bg-[#3712c2] transition duration-300"
        >
          হোম পেজে ফিরে যান
        </Link>

        {/* অর্ডার ইতিহাস পেজ লিংক */}
        <Link
          to="/my-orders"
          className="px-6 py-3 text-white font-semibold rounded-lg shadow bg-green-600 hover:bg-green-700 transition duration-300"
        >
          অর্ডার ইতিহাস দেখুন
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
