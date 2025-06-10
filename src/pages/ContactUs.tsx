const ContactUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          যোগাযোগ করুন / Contact Us
        </h1>

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
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">আপনার নাম</label>
              <input
                type="text"
                placeholder="নাম লিখুন"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">ইমেইল</label>
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">বার্তা</label>
              <textarea
                placeholder="আপনার বার্তা লিখুন"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-[#9EA647] hover:bg-[#8d973f] px-4 py-2 rounded-lg"
            >
              পাঠান / Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
