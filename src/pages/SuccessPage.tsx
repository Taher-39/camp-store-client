import { Link } from "react-router-dom"; // Correct import for Link

const SuccessPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen" >
      <h2 className="text-3xl font-bold mb-6">Order Successful!</h2>
      <p className="text-lg mb-4">
        Your order has been placed successfully. Thank you for shopping with us!
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
      >
        Home
      </Link>
    </div>
  );
};

export default SuccessPage;
