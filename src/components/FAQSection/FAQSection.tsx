import { useState } from "react";
import { ChevronUpIcon } from "lucide-react";

const faqs = [
  {
    question: "What is Campers Shop?",
    answer:
      "Campers Shop is your one-stop destination for all camping essentials, offering a wide range of products from tents to cookware.",
  },
  {
    question: "What are the shipping options?",
    answer:
      "We offer standard, express, and overnight shipping options. You can choose your preferred method during checkout.",
  },
  {
    question: "Can I return or exchange my purchase?",
    answer:
      "Yes, we offer a 30-day return and exchange policy on most items. Please check our <a href='/return-policy' class='text-blue-500 underline'>return policy</a> page for more details.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we only ship within the United States. However, we are working on expanding our services internationally.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email. You can use this number to <a href='/track-order' class='text-blue-500 underline'>track your order</a> on our website.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          FAQ
        </h2>
        <div className="w-full max-w-5xl p-2 mx-auto bg-white rounded-2xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mt-2">
              <button
                className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                onClick={() => handleToggle(index)}
              >
                <span>{faq.question}</span>
                <ChevronUpIcon
                  className={`w-5 h-5 text-gray-500 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pt-4 pb-2 text-gray-600">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
