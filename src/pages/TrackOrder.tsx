import { Link } from "react-router-dom";


export default function TrackOrder() {
  return (
    <>
      <main className="py-12 px-4 bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">Track Your Order</h1>
          <p className="text-lg mb-4">
            To track your order, enter your tracking number below. You'll receive updates on the status of your shipment via email.
          </p>
          <Link
            to="/"
            className="my-10 px-6 py-3  text-white rounded-lg bg-[#4952b2] hover:bg-[#3712c2] transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </main>
    </>
  );
}
