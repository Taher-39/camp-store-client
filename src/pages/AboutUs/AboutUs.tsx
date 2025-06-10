import { useState, useEffect } from "react";
import { FacebookIcon, InstagramIcon, TwitterIcon, Loader } from "lucide-react";
import teamMember1 from "@/assets/pp.jpg";
import teamMember2 from "@/assets/nayeem.png"

const AboutUsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto py-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin text-4xl text-gray-600" />
        </div>
      ) : (
        <div className="mx-auto w-[90%]">
          {/* যোগাযোগের তথ্য */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">যোগাযোগ</h2>
            <p>ফোন: +৮৮০১৫১৬৫৫৯৫১৫</p>
            <p>ইমেইল: taherpust@gmail.com</p>
            <p>ঠিকানা: হায়াত মোড়, চাঁপাইনবাবগঞ্জ, রাজশাহী</p>
          </section>

          {/* গুগল ম্যাপ */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">আমাদের অবস্থান</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.5914464906833!2d88.285334!3d24.594817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdad8e5efb1a6b%3A0x8e0ee503f70d7d8d!2z4Kas4Ka-4Ka54KeN4Kao4Ka_4Kac4Ka_IOCmqOCnjeCmrOCmv-CmrOCmuCDgpqzgpr7gpqTgpr_gp43gpqgg4KaV4Kao4Ka_4Ka84Kao4Ka_4Ka-4Ka5!5e0!3m2!1sen!2sbd!4v1717930632292!5m2!1sen!2sbd"
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </section>

          {/* সোশ্যাল মিডিয়া */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">আমাদের অনুসরণ করুন</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/halzobd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="text-3xl text-blue-600" />
              </a>
              <a
                href="https://www.twitter.com/halzobd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="text-3xl text-blue-400" />
              </a>
              <a
                href="https://www.instagram.com/halzobd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="text-3xl text-pink-600" />
              </a>
            </div>
          </section>

          {/* আমাদের লক্ষ্য */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">আমাদের লক্ষ্য</h2>
            <p>
              Halal Zone-এর লক্ষ্য হলো নিরাপদ, পবিত্র এবং প্রাকৃতিক পণ্য
              সরবরাহের মাধ্যমে সমাজে হালাল জীবনধারা প্রসারিত করা। আমরা চাই
              প্রতিটি পরিবার হালাল ও স্বাস্থ্যসম্মত পণ্য ব্যবহার করুক – দ্বীনি
              দায়িত্ব ও স্বাস্থ্য সচেতনতা দুটোই বজায় রেখে।
            </p>
          </section>

          {/* টিম মেম্বার */}
          <section>
            <h2 className="text-2xl font-bold mb-4">আমাদের টিম</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <img
                  src={teamMember1}
                  alt="Abu Taher"
                  className="w-40 h-40 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">আবু তাহের</h3>
                <p className="text-gray-500">প্রতিষ্ঠাতা ও সিইও</p>
                <p className="mt-2">
                  আবু তাহের একজন উদ্যোক্তা যিনি হালাল জীবনধারায় বিশ্বাসী এবং
                  সমাজে বিশুদ্ধতা ও সততা ছড়িয়ে দেওয়ার স্বপ্ন নিয়ে Halal Zone
                  শুরু করেছেন।
                </p>
              </div>
              <div className="text-center">
                <img
                  src={teamMember2}
                  alt="Naeem"
                  className="w-40 h-40 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">নাঈম</h3>
                <p className="text-gray-500">মার্কেটিং এক্সপার্ট</p>
                <p className="mt-2">
                  নাঈম, আল জামিয়াহ আস-সালাফিয়াহ, রাজশাহীর একজন ছাত্র। তিনি
                  তরুণদের মধ্যে হালাল ও ইসলামী পণ্যের সচেতনতা বৃদ্ধি করতে কাজ
                  করছেন।
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AboutUsPage;
