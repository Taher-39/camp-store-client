import { Loader2 } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import {
  useGetSingleOrderByIdQuery,
  useGetSingleUserOrdersQuery,
} from "@/redux/features/order/orderApi";

export default function TrackOrder() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar (always visible on desktop) */}
      <div className="hidden w-64 border-r bg-white shadow-md sm:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <TrackOrderLayout />
        </div>
      </div>
    </div>
  );
}

function TrackOrderLayout() {
  const [orderId, setOrderId] = useState("");
  const [searchId, setSearchId] = useState("");

  // Fetch user's orders data
  const {
    data: ordersData,
    isLoading,
    isError,
  } = useGetSingleUserOrdersQuery();

  // Fetch specific order by ID
  const { data: searchedOrder, isLoading: isSearching } =
    useGetSingleOrderByIdQuery(searchId, {
      skip: !searchId,
    });

  // Determine which order to display
  const displayOrder = searchId ? searchedOrder?.data : ordersData?.data?.[0];
  const orderStatus = displayOrder?.orderStatus || "pending";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchId(orderId);
  };

  if (isLoading || isSearching) {
    return (
      <main className="py-12 px-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#4952b2]" />
          <p className="mt-4 text-lg">অর্ডার তথ্য লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="py-12 px-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">তথ্য লোড করতে সমস্যা হয়েছে</p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-3 text-white rounded-lg bg-[#4952b2] hover:bg-[#3712c2] transition-colors"
          >
            হোমপেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12 px-4 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          আপনার অর্ডার ট্র্যাক করুন
        </h1>

        {/* Order ID Search Form */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="আপনার অর্ডার আইডি লিখুন"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4952b2]"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 text-white rounded-lg bg-[#4952b2] hover:bg-[#3712c2] transition-colors"
            >
              খুঁজুন
            </button>
          </form>
          {!searchId && (
            <p className="mt-2 text-sm text-gray-500">
              আপনার সর্বশেষ অর্ডার দেখানো হচ্ছে। নির্দিষ্ট অর্ডার ট্র্যাক করতে
              আইডি লিখুন।
            </p>
          )}
        </div>

        {displayOrder ? (
          <>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-800">
                <span className="font-semibold">অর্ডার আইডি:</span>{" "}
                {displayOrder._id}
              </p>
              <p className="text-gray-800 mt-1">
                <span className="font-semibold">অর্ডার তারিখ:</span>{" "}
                {new Date(displayOrder.createdAt ?? "").toLocaleDateString(
                  "bn-BD"
                )}
              </p>
              <p className="text-gray-800 mt-1">
                <span className="font-semibold">মোট মূল্য:</span>{" "}
                {displayOrder.totalPrice} ৳
              </p>
            </div>

            {/* Order Progress */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                অর্ডার স্ট্যাটাস
              </h2>

              {/* Progress Steps */}
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-4 top-4 h-full w-1 bg-gray-200 -z-10"></div>
                <div
                  className={`absolute left-4 top-4 h-full w-1 bg-[#4952b2] -z-10 transition-all duration-500`}
                  style={{
                    height:
                      orderStatus === "pending"
                        ? "25%"
                        : orderStatus === "processing"
                        ? "50%"
                        : orderStatus === "shipped"
                        ? "75%"
                        : "100%",
                  }}
                ></div>

                {/* Steps */}
                <div className="space-y-8">
                  {/* Step 1 - Pending */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus === "pending"
                          ? "bg-[#4952b2] text-white"
                          : ["processing", "shipped", "delivered"].includes(
                              orderStatus
                            )
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      ১
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          ["processing", "shipped", "delivered"].includes(
                            orderStatus
                          )
                            ? "text-green-600"
                            : orderStatus === "pending"
                            ? "text-[#4952b2]"
                            : "text-gray-600"
                        }`}
                      >
                        অর্ডার প্রাপ্তি
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        আমরা আপনার অর্ডারটি পেয়েছি এবং প্রসেসিং এর জন্য
                        প্রস্তুত করছি
                      </p>
                    </div>
                  </div>

                  {/* Step 2 - Processing */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus === "processing"
                          ? "bg-[#4952b2] text-white"
                          : ["shipped", "delivered"].includes(orderStatus)
                          ? "bg-green-500 text-white"
                          : orderStatus === "pending"
                          ? "bg-gray-200"
                          : "bg-gray-200"
                      }`}
                    >
                      ২
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          ["shipped", "delivered"].includes(orderStatus)
                            ? "text-green-600"
                            : orderStatus === "processing"
                            ? "text-[#4952b2]"
                            : "text-gray-600"
                        }`}
                      >
                        প্রসেসিং হচ্ছে
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        আপনার অর্ডারটি প্রস্তুত করা হচ্ছে এবং শীঘ্রই পাঠানো হবে
                      </p>
                    </div>
                  </div>

                  {/* Step 3 - Shipped */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus === "shipped"
                          ? "bg-[#4952b2] text-white"
                          : orderStatus === "delivered"
                          ? "bg-green-500 text-white"
                          : ["pending", "processing"].includes(orderStatus)
                          ? "bg-gray-200"
                          : "bg-gray-200"
                      }`}
                    >
                      ৩
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          orderStatus === "delivered"
                            ? "text-green-600"
                            : orderStatus === "shipped"
                            ? "text-[#4952b2]"
                            : "text-gray-600"
                        }`}
                      >
                        পাঠানো হয়েছে
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        আপনার অর্ডারটি ডেলিভারির জন্য পাঠানো হয়েছে
                      </p>
                    </div>
                  </div>

                  {/* Step 4 - Delivered */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus === "delivered"
                          ? "bg-green-500 text-white"
                          : ["pending", "processing", "shipped"].includes(
                              orderStatus
                            )
                          ? "bg-gray-200"
                          : "bg-gray-200"
                      }`}
                    >
                      ৪
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          orderStatus === "delivered"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        ডেলিভারি সম্পন্ন
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        আপনার অর্ডারটি সফলভাবে ডেলিভারি করা হয়েছে
                      </p>
                    </div>
                  </div>
                  {/* Step 5 - Cancelled */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus === "cancelled"
                          ? "bg-red-500 text-white"
                          : [
                              "pending",
                              "processing",
                              "shipped",
                              "delivered",
                            ].includes(orderStatus)
                          ? "bg-gray-200"
                          : "bg-gray-200"
                      }`}
                    >
                      ৫
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          orderStatus === "cancelled"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        বাতিল করা হয়েছে
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        আপনার অর্ডারটি বাতিল করা হয়েছে
                      </p>
                    </div>
                  </div>

                  {/* Step 6 - Refunded */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus === "refunded"
                          ? "bg-blue-500 text-white"
                          : [
                              "pending",
                              "processing",
                              "shipped",
                              "delivered",
                              "cancelled",
                            ].includes(orderStatus)
                          ? "bg-gray-200"
                          : "bg-gray-200"
                      }`}
                    >
                      ৬
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          orderStatus === "refunded"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        টাকা ফেরত দেওয়া হয়েছে
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        আপনার অর্ডারের টাকা ফেরত দেওয়া হয়েছে
                      </p>
                    </div>
                  </div>

                  {/* Step 7 - Failed */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus === "failed"
                          ? "bg-red-500 text-white"
                          : [
                              "pending",
                              "processing",
                              "shipped",
                              "delivered",
                              "cancelled",
                              "refunded",
                            ].includes(orderStatus)
                          ? "bg-gray-200"
                          : "bg-gray-200"
                      }`}
                    >
                      ৭
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          orderStatus === "failed"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        ডেলিভারি ব্যর্থ
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        আপনার অর্ডার ডেলিভারি করতে ব্যর্থ হয়েছে
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg text-gray-600 mb-4">
              {searchId
                ? "প্রদানকৃত আইডির সাথে কোন অর্ডার পাওয়া যায়নি"
                : "আপনার কোন অর্ডার পাওয়া যায়নি"}
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 text-white rounded-lg bg-[#4952b2] hover:bg-[#3712c2] transition-colors"
            >
              পণ্য ব্রাউজ করুন
            </Link>
          </div>
        )}

        <Link
          to="/"
          className="mt-10 inline-block px-6 py-3 text-white rounded-lg bg-[#4952b2] hover:bg-[#3712c2] transition-colors"
        >
          হোমপেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
