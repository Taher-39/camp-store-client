// const ContactUs = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen py-12 px-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           যোগাযোগ করুন / Contact Us
//         </h1>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Contact Info */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">আমাদের ঠিকানা</h2>
//             <p className="mb-2">🏠 হায়াত মোড়</p>
//             <p className="mb-2">📍 চাঁপাইনবাবগঞ্জ, রাজশাহী</p>
//             <p className="mb-2">
//               📧 ইমেইল:{" "}
//               <a href="mailto:taherpust@gmail.com" className="text-blue-600 hover:underline">
//                 taherpust@gmail.com
//               </a>
//             </p>
//             <p className="mb-2">
//               📞 ফোন:{" "}
//               <a href="tel:+8801516559515" className="text-blue-600 hover:underline">
//                 +8801516559515
//               </a>
//             </p>
//             <p className="mt-4 text-sm text-gray-600">
//               আমাদের যেকোনো পণ্য বা সেবার বিষয়ে জানতে চাইলে নিচের ফর্মটি পূরণ করুন।
//             </p>
//           </div>

//           {/* Contact Form */}
//           <form className="space-y-4">
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">আপনার নাম</label>
//               <input
//                 type="text"
//                 placeholder="নাম লিখুন"
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">ইমেইল</label>
//               <input
//                 type="email"
//                 placeholder="আপনার ইমেইল"
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">বার্তা</label>
//               <textarea
//                 placeholder="আপনার বার্তা লিখুন"
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="text-white bg-[#9EA647] hover:bg-[#8d973f] px-4 py-2 rounded-lg"
//             >
//               পাঠান / Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
import { useSubmitContactMutation } from '@/redux/features/Auth/authApi';
import { useState } from 'react';
import { toast } from 'sonner';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitContact, { isLoading, isSuccess, isError }] = useSubmitContactMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await submitContact(formData).unwrap();
      toast.success(res.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to submit:', err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          যোগাযোগ করুন / Contact Us
        </h1>

        {isSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
          </div>
        )}

        {isError && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">আমাদের ঠিকানা</h2>
            <p className="mb-2">🏠 হায়াত মোড়</p>
            <p className="mb-2">📍 চাঁপাইনবাবগঞ্জ, রাজশাহী</p>
            <p className="mb-2">
              📧 ইমেইল:{" "}
              <a href="mailto:taherpust@gmail.com" className="text-blue-600 hover:underline">
                taherpust@gmail.com
              </a>
            </p>
            <p className="mb-2">
              📞 ফোন:{" "}
              <a href="tel:+8801516559515" className="text-blue-600 hover:underline">
                +8801516559515
              </a>
            </p>
            <p className="mt-4 text-sm text-gray-600">
              আমাদের যেকোনো পণ্য বা সেবার বিষয়ে জানতে চাইলে নিচের ফর্মটি পূরণ করুন।
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">আপনার নাম</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="নাম লিখুন"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">ইমেইল</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="আপনার ইমেইল"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">বার্তা</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="আপনার বার্তা লিখুন"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
                required
                rows={5}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="text-white bg-[#9EA647] hover:bg-[#8d973f] px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {isLoading ? 'পাঠানো হচ্ছে...' : 'পাঠান / Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;