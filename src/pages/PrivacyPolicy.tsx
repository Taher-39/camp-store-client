const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Privacy Policy / গোপনীয়তা নীতিমালা
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            1. Introduction / পরিচিতি
          </h2>
          <p className="text-gray-700">
            Welcome to Halal Zone. We are committed to protecting your personal information and your right to privacy.
            <br />
            হালাল জোন-এ স্বাগতম। আমরা আপনার ব্যক্তিগত তথ্য এবং গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ।
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            2. What Information We Collect / আমরা কী তথ্য সংগ্রহ করি
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Your name, email, and phone number (আপনার নাম, ইমেইল ও ফোন নম্বর)</li>
            <li>Delivery address (পণ্য পৌঁছানোর ঠিকানা)</li>
            <li>Order history and preferences (আপনার অর্ডার ইতিহাস ও পছন্দ)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            3. How We Use Your Information / আমরা কীভাবে আপনার তথ্য ব্যবহার করি
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>To deliver your products (আপনার পণ্য পৌঁছাতে)</li>
            <li>To contact you for support or order updates (সাপোর্ট বা অর্ডার আপডেটের জন্য যোগাযোগে)</li>
            <li>To improve our services (আমাদের সেবা উন্নত করতে)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            4. Information Sharing / তথ্য ভাগাভাগি
          </h2>
          <p className="text-gray-700">
            We do not sell or rent your personal information to third parties. 
            <br />
            আমরা তৃতীয় পক্ষের কাছে আপনার তথ্য বিক্রি করি না বা ভাড়া দিই না।
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            5. Cookies / কুকি
          </h2>
          <p className="text-gray-700">
            Our website uses cookies to enhance your browsing experience. 
            <br />
            আমাদের ওয়েবসাইটে আপনার অভিজ্ঞতা উন্নত করতে কুকি ব্যবহার করা হয়।
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            6. Your Rights / আপনার অধিকার
          </h2>
          <p className="text-gray-700">
            You can request to view, update, or delete your personal data at any time.
            <br />
            আপনি চাইলে আপনার ব্যক্তিগত তথ্য দেখতে, আপডেট করতে বা মুছতে পারেন।
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            7. Contact Us / যোগাযোগ করুন
          </h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us:
            <br />
            যদি আপনার এই গোপনীয়তা নীতিমালা সম্পর্কে কোনো প্রশ্ন থাকে, আমাদের সাথে যোগাযোগ করুন:
            <br />
            📧 Email: <a href="mailto:taherpust@gmail.com" className="text-blue-600">taherpust@gmail.com</a>
            <br />
            📞 Phone: <a href="tel:+8801516559515" className="text-blue-600">+8801516559515</a>
          </p>
        </section>

        <p className="text-center text-gray-500 text-sm mt-8">
          Updated: June 9, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
