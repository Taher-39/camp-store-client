import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! Page Not Found</p>
      <p className="text-lg text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3  text-white rounded-lg bg-[#4952b2] hover:bg-[#3712c2] transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
