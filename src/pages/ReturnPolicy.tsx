import { Link } from "react-router-dom";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">প্রত্যর্পণ নীতি</h1>
          <p className="text-lg mb-4">
            <span className="font-semibold">১. ফেরতের সময়সীমা:</span> কেনা আম ও
            অন্যান্য পণ্য ৩ দিনের মধ্যে ফেরত দিতে হবে।
            <br />
            <span className="font-semibold">২. পণ্যের অবস্থা:</span> পণ্যগুলো
            অবশ্যই অপরিবর্তিত অবস্থায় এবং মূল প্যাকেটে থাকতে হবে।
            <br />
            <span className="font-semibold">৩. ফেরতের অর্থ:</span> ডেলিভারি
            চার্জ বাদ যাবে, শুধু পণ্যের মূল্য ফেরত দেওয়া হবে।
            <br />
            <span className="font-semibold">৪. সহায়তা:</span> কোনো সমস্যা থাকলে
            গ্রাহক সেবার সাথে যোগাযোগ করুন।
          </p>
          <Link
            to="/"
            className="my-10 px-6 py-3 rounded-lg text-white bg-[#9EA647] hover:bg-[#8d973f] transition-colors"
          >
            হোমপেজে ফিরে যান
          </Link>
        </div>
      </main>
    </div>
  );
}
