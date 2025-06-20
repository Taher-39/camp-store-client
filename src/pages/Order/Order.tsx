import { useState } from "react";
import { ShoppingCart, Loader2, Link } from "lucide-react";
import { IOrder } from "@/types";
import { 
  useGetOrdersQuery, 
  useGetSingleUserOrdersQuery,
  useUpdateOrderMutation 
} from "@/redux/features/order/orderApi";
import Modal from "react-modal";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/Auth/authSlice";
import Sidebar from "@/components/Sidebar/Sidebar";


const Orders = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar (always visible on desktop) */}
      <div className="hidden w-64 border-r bg-white shadow-md sm:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <OrdersLayout />
        </div>
      </div>
    </div>
  );
};


// Modal styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    width: "600px",
    borderRadius: "12px",
    padding: "0",
    border: "none",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

Modal.setAppElement("#root");

const OrdersLayout = () => {
  const authUser = useAppSelector(useCurrentUser);
  const isAdmin = authUser?.role !== "customer"
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [status, setStatus] = useState("");
  
  // Use different queries based on user role
  const { 
    data: adminData, 
    isLoading: adminLoading, 
    isError: adminError, 
    refetch: adminRefetch 
  } = useGetOrdersQuery(undefined, { skip: !isAdmin });
  
  const { 
    data: userData, 
    isLoading: userLoading, 
    isError: userError, 
    refetch: userRefetch 
  } = useGetSingleUserOrdersQuery(undefined, { skip: isAdmin });
  
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  
  const orders = isAdmin ? adminData?.data || [] : userData?.data || [];
  const isLoading = isAdmin ? adminLoading : userLoading;
  const isError = isAdmin ? adminError : userError;
  const refetch = isAdmin ? adminRefetch : userRefetch;

  const openModal = (order: IOrder) => {
    setSelectedOrder(order);
    setStatus(order.orderStatus ?? 'pending');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
    setStatus("");
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !status) return;
    
    try {
      await updateOrder({
        id: selectedOrder._id,
        updatedOrder: { orderStatus: status },
      }).unwrap();
      
      toast.success("Order status updated successfully!");
      refetch();
      closeModal();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <main className="flex-grow px-4 sm:px-6 py-8 md:py-12 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6 md:mb-8 text-center text-gray-800">
          {isAdmin ? "📋 All Orders" : "🧾 Your Orders"}
        </h1>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center text-gray-500 my-5">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-2"></div>
            <p>Loading orders...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center my-5">
            <p className="text-red-500 mb-3">Failed to load orders.</p>
            <button
              onClick={() => refetch()}
              className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-full transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content based on user role */}
        {isAdmin ? (
          /* Admin View - Table Layout */
          orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order: IOrder) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-[120px]">
                        {order._id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt ?? '').toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {order?.name || "Guest"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {order.orderItems.length}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                        ৳{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            order.orderStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.orderStatus === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.orderStatus === "delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => openModal(order)}
                          className="text-orange-600 hover:underline text-sm"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border rounded-xl py-12 md:py-20 px-4 md:px-6 bg-gray-50 flex flex-col items-center text-center shadow-sm">
              <ShoppingCart className="w-10 h-10 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                No orders found
              </p>
              <p className="text-sm text-gray-500 mb-6">
                There are no orders in the system yet.
              </p>
            </div>
          )
        ) : (
          /* Customer View - Card Layout */
          orders.length > 0 ? (
            <div className="space-y-4 md:space-y-6">
              {orders.map((order: IOrder) => (
                <div
                  key={order._id}
                  className="border rounded-lg md:rounded-xl p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => openModal(order)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs md:text-sm text-gray-500 truncate max-w-[180px] md:max-w-none">
                      Order ID: <span className="font-medium">{order._id}</span>
                    </p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        order.orderStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.orderStatus === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.orderStatus === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600 mb-2">
                    Placed on:{" "}
                    {new Date(order?.createdAt ?? "").toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  {/* List of items */}
                  <ul className="space-y-1 text-xs md:text-sm text-gray-700 mb-3">
                    {order.orderItems.slice(0, 2).map((item: any, i: number) => (
                      <li key={i}>
                        • {item?.name} - {item?.quantity} pcs × {item?.price}৳
                      </li>
                    ))}
                    {order.orderItems.length > 2 && (
                      <li className="text-gray-500">
                        + {order.orderItems.length - 2} more items
                      </li>
                    )}
                  </ul>

                  <div className="flex justify-between items-center text-sm font-medium text-gray-800">
                    <span>Total: ৳{order.totalPrice.toFixed(2)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(order);
                      }}
                      className="text-orange-600 hover:underline text-xs md:text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-xl py-12 md:py-20 px-4 md:px-6 bg-gray-50 flex flex-col items-center text-center shadow-sm">
              <ShoppingCart className="w-10 h-10 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                No orders yet
              </p>
              <p className="text-sm text-gray-500 mb-6">
                You haven't placed any orders. Head to the store and start shopping!
              </p>
              <Link
                to="/products"
                className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-6 py-2 rounded-full transition"
              >
                Go to Store
              </Link>
            </div>
          )
        )}
      </main>

      {/* Order Details Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={isAdmin ? "Order Management" : "Order Details"}
      >
        {selectedOrder && (
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isAdmin ? "Order Management" : "Order Details"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Order ID: <span className="font-medium">{selectedOrder._id}</span>
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedOrder._id ?? '');
                    toast.success("Order ID copied to clipboard!");
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>

              {isAdmin && (
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">
                    Customer: <span className="font-medium">{selectedOrder?.name || "Guest"}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Date:{" "}
                    <span className="font-medium">
                      {new Date(selectedOrder.createdAt ?? '').toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </p>
                </div>
              )}

              {isAdmin && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-800 mb-3">Update Status</h3>
                  <div className="flex items-center space-x-4">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                      <option value="failed">Failed</option>
                    </select>
                    <button
                      onClick={handleStatusUpdate}
                      disabled={isUpdating}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:bg-orange-400"
                    >
                      {isUpdating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium text-gray-800 mb-2">Items</h3>
                <ul className="space-y-3">
                  {selectedOrder.orderItems.map((item: any, i: number) => (
                    <li key={i} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">
                          {item.quantity} × ৳{item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">
                        ৳{(item.quantity * item.price).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Subtotal:</span>
                  <span>৳{selectedOrder.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Shipping:</span>
                  <span>৳{selectedOrder.shippingCost?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-3">
                  <span>Total:</span>
                  <span>
                    ৳
                    {(
                      selectedOrder.totalPrice +
                      (selectedOrder.shippingCost || 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium text-gray-800 mb-2">
                  Shipping Address
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedOrder.shippingAddress?.address},{" "}
                  {selectedOrder.shippingAddress?.city},{" "}
                  {selectedOrder.shippingAddress?.postalCode},{" "}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;