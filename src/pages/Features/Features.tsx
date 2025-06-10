import sp from "@/assets/securePayment.avif";
import fd from "@/assets/fastDelivary.avif";
import nt from "@/assets/nature.jpg";

const features = [
  {
    title: "নিরাপদ পেমেন্ট",
    description: "বিভিন্ন পেমেন্ট পদ্ধতি থেকে বেছে নিন",
    icon: sp,
  },
  {
    title: "গ্রিন ডেলিভারি",
    description: "৩-৫ দিনের মধ্যে আপনার পণ্য পৌঁছে যাবে",
    icon: fd,
  },
  {
    title: "১০০% ন্যাচারাল",
    description: "প্রাকৃতিক উপাদান ব্যবহার করতে আমরা প্রতিশ্রুতিবদ্ধ",
    icon: nt,
  },
];

export default function Features() {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 text-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 transition"
            >
              <div className="w-20 h-20 flex items-center justify-center">
                <img src={feature.icon} alt={feature.title} />
              </div>
              <div className="ml-2">
                <h3 className="text-xl font-semibold text-[#2e7d32]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
