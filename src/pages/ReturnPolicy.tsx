import { Link } from "react-router-dom";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen  bg-gray-100">
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">Return Policy</h1>
          <p className="text-lg mb-4">
            Our return policy allows you to return items within 30 days of
            purchase. The items must be in their original condition and
            packaging. For more details, please contact our support team.
          </p>
          <Link
            to="/"
            className="my-10 px-6 py-3  text-white rounded-lg bg-[#4952b2] hover:bg-[#3712c2] transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
