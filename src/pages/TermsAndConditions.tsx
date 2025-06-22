import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center text-[#9EA647] mb-8">
          হালাল জোনের শর্তাবলী
        </h1>

        <div className="prose max-w-none">
          <p className="text-sm text-gray-500 mb-6">
            সর্বশেষ আপডেট: {new Date().toLocaleDateString("bn-BD")}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ১. শর্তাবলী গ্রহণ
            </h2>
            <p className="text-gray-600 mb-4">
              হালাল জোন প্ল্যাটফর্ম ("সেবা") ব্যবহারের মাধ্যমে আপনি এই শর্তাবলী
              ("শর্তসমূহ") মেনে নিচ্ছেন বলে বিবেচিত হবে। আপনি যদি এই শর্তাবলীর
              কোন অংশের সাথে একমত না হন, তাহলে আপনি এই সেবা ব্যবহার করতে পারবেন
              না।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ২. অ্যাকাউন্ট নিবন্ধন
            </h2>
            <p className="text-gray-600 mb-4">
              আমাদের সেবার কিছু বৈশিষ্ট্য ব্যবহার করতে আপনাকে একটি অ্যাকাউন্ট
              নিবন্ধন করতে হবে। আপনি সম্মত হচ্ছেন:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>আপনার পাসওয়ার্ডের নিরাপত্তা বজায় রাখতে</li>
              <li>
                আপনার অ্যাকাউন্টের অধীনে সংঘটিত সমস্ত কার্যকলাপের জন্য দায়ী হতে
              </li>
              <li>
                আপনার অ্যাকাউন্টের অননুমোদিত ব্যবহার সম্পর্কে আমাদের অবিলম্বে
                জানাতে
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ৩. হালাল পণ্য
            </h2>
            <p className="text-gray-600 mb-4">
              হালাল জোন খাঁটি হালাল পণ্য প্রদানের জন্য প্রতিশ্রুতিবদ্ধ:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>
                সমস্ত পণ্য হালাল-সার্টিফাইড সরবরাহকারীদের কাছ থেকে সংগ্রহ করা
                হয়
              </li>
              <li>আমরা আমাদের সরবরাহ শৃঙ্খল জুড়ে কঠোর হালাল মান বজায় রাখি</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ৪. অর্ডার এবং পেমেন্ট
            </h2>
            <p className="text-gray-600 mb-4">
              অর্ডার দেওয়ার সময় আপনি সম্মত হচ্ছেন:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>সঠিক অর্ডার তথ্য প্রদান করতে</li>
              <li>আপনার অ্যাকাউন্টের মাধ্যমে সৃষ্ট সমস্ত চার্জ পরিশোধ করতে</li>
              <li>
                যে আমরা প্রক্রিয়াকরণের আগে আপনার পেমেন্ট পদ্ধতি যাচাই করতে পারি
              </li>
            </ul>
            <p className="text-gray-600">
              আমরা ক্যাশ অন ডেলিভারি, মোবাইল ব্যাংকিং এবং ক্রেডিট/ডেবিট কার্ড সহ
              বিভিন্ন পেমেন্ট পদ্ধতি গ্রহণ করি।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ৫. ডেলিভারি নীতি
            </h2>
            <p className="text-gray-600 mb-4">
              ডেলিভারির সময় শুধুমাত্র আনুমানিক। আমরা নিম্নলিখিত কারণে বিলম্বের
              জন্য দায়ী নই:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>ভুল ঠিকানা তথ্য</li>
              <li>অনুপস্থিত প্রাপক</li>
              <li>অপ্রতিরোধ্য ঘটনা</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ৬. ফেরত এবং রিফান্ড
            </h2>
            <p className="text-gray-600 mb-4">
              আমরা নিম্নলিখিত শর্তে পণ্য ফেরত গ্রহণ করি:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>ডেলিভারির সময় ক্ষতিগ্রস্ত পণ্য</li>
              <li>ভুল পণ্য প্রাপ্তি</li>
              <li>হালাল সম্মতি সংক্রান্ত সমস্যা</li>
            </ul>
            <p className="text-gray-600">
              রিফান্ড ৭-১০ কর্মদিবসের মধ্যে প্রক্রিয়া করা হবে।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ৭. গোপনীয়তা নীতি
            </h2>
            <p className="text-gray-600 mb-4">
              আপনার গোপনীয়তা আমাদের জন্য গুরুত্বপূর্ণ। অনুগ্রহ করে আমাদের{" "}
              <Link
                to="/privacy-policy"
                className="text-[#9EA647] hover:underline"
              >
                গোপনীয়তা নীতি
              </Link>{" "}
              পর্যালোচনা করুন যা ব্যাখ্যা করে আমরা কীভাবে আপনার ব্যক্তিগত তথ্য
              সংগ্রহ, ব্যবহার এবং সুরক্ষা করি।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ৮. বুদ্ধিবৃত্তিক সম্পত্তি
            </h2>
            <p className="text-gray-600 mb-4">
              আমাদের প্ল্যাটফর্মের সমস্ত বিষয়বস্তু (লোগো, টেক্সট, গ্রাফিক্স)
              হালাল জোনের মালিকানাধীন এবং কপিরাইট আইন দ্বারা সুরক্ষিত।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ৯. দায়িত্ব সীমাবদ্ধতা
            </h2>
            <p className="text-gray-600 mb-4">
              আমাদের সেবা ব্যবহারের ফলে সৃষ্ট কোনও পরোক্ষ, আকস্মিক বা ফলস্বরূপ
              ক্ষতির জন্য হালাল জোন দায়ী থাকবে না।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ১০. শর্তাবলীতে পরিবর্তন
            </h2>
            <p className="text-gray-600 mb-4">
              আমরা যে কোনও সময় এই শর্তাবলী পরিবর্তন করতে পারি। পরিবর্তনের পর
              আমাদের সেবা ব্যবহার অব্যাহত রাখা নতুন শর্তাবলী গ্রহণের সমতুল্য।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ১১. আইনগত অধিক্ষেত্র
            </h2>
            <p className="text-gray-600">
              এই শর্তাবলী বাংলাদেশের আইন অনুযায়ী ব্যাখ্যা ও নিয়ন্ত্রিত হবে।
            </p>
          </section>

          <div className="mt-12 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              যোগাযোগ করুন
            </h3>
            <p className="text-gray-600">
              এই শর্তাবলী সম্পর্কে আপনার কোন প্রশ্ন থাকলে, আমাদের সাথে যোগাযোগ
              করুন:
            </p>
            <p className="text-gray-600 mt-2">
              ইমেইল:{" "}
              <a
                href="mailto:taherpust@gmail.com"
                className="text-[#9EA647] hover:underline"
              >
                taherpust@gmail.com
              </a>
            </p>
            <p className="text-gray-600">
              ফোন:{" "}
              <a
                href="tel:+8801516559515"
                className="text-[#9EA647] hover:underline"
              >
                +8801516-559515
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;