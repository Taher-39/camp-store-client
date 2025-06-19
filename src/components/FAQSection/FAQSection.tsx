import { useState } from "react";
import { ChevronUpIcon } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "হালাল জোন কী?",
    answer:
      "হালাল জোন হলো একটি অনলাইন মার্কেটপ্লেস, যেখানে আপনি নিশ্চিত হালাল এবং বিশ্বাসযোগ্য ইসলামিক পণ্য পাবেন।",
  },
  {
    question: "পণ্য ডেলিভারি কতদিনে হয়?",
    answer:
      "আমরা সাধারণত ২-৩ কার্যদিবসের মধ্যে পণ্য ডেলিভারি করি। আপনার লোকেশন অনুযায়ী সময় পরিবর্তিত হতে পারে।",
  },
  {
    question: "আমি কি পণ্য ফেরত দিতে পারি?",
    answer: (
      <>
        হ্যাঁ, আপনি পণ্য গ্রহণের ৩ দিনের মধ্যে ফেরত দিতে পারেন। বিস্তারিত জানতে
        আমাদের{" "}
        <Link to="/return-policy" className="text-blue-500 underline">
          রিটার্ন পলিসি
        </Link>{" "}
        দেখুন।
      </>
    ),
  },
  {
    question: "আপনারা কি আন্তর্জাতিকভাবে ডেলিভারি দেন?",
    answer:
      "বর্তমানে আমরা শুধু বাংলাদেশে পণ্য ডেলিভারি করি। ইনশাআল্লাহ ভবিষ্যতে আন্তর্জাতিক ডেলিভারির ব্যবস্থা থাকবে।",
  },
  {
    question: "আমি কিভাবে অর্ডার ট্র্যাক করব?",
    answer: (
      <>
        অর্ডার শিপমেন্ট হলে আপনার ইমেইলে একটি ট্র্যাকিং নম্বর পাঠানো হবে। আপনি{" "}
        <Link to="/track-order" className="text-blue-500 underline">
          এখানে
        </Link>{" "}
        ক্লিক করে অর্ডার ট্র্যাক করতে পারবেন।
      </>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী
        </h2>
        <div className="w-full max-w-5xl p-2 mx-auto bg-white rounded-2xl shadow-sm">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <button
                className={`flex justify-between w-full px-4 py-3 text-lg font-medium text-left text-gray-900 rounded-lg hover:bg-gray-100 transition-colors ${
                  openIndex === index ? "bg-gray-100" : ""
                }`}
                onClick={() => handleToggle(index)}
              >
                <span>{faq.question}</span>
                <ChevronUpIcon
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pt-2 pb-4 text-gray-600">
                  {typeof faq.answer === "string" ? (
                    <p>{faq.answer}</p>
                  ) : (
                    faq.answer
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}