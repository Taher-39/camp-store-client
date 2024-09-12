import { Link } from "react-router-dom"; 

const SuccessPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen w-[90%]" >
      <h2 className="text-3xl font-bold mb-6">Order Successful!</h2>
      <p className="text-lg mb-4">
        Your order has been placed successfully. Thank you for shopping with us!
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 text-white font-semibold rounded-lg shadow bg-[#4952b2] hover:bg-[#3712c2]"
      >
        Home
      </Link>
    </div>
  );
};

export default SuccessPage;
