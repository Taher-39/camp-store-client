import { baseApi } from "@/redux/api/baseApi";
import { IOrder } from "@/types";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE Order
    createOrder: builder.mutation({
      query: (orderData) => {
        return {
        url: '/orders',
        method: 'POST',
        body: orderData,
      };
    },
    }),

    // READ (Get All Orders)
    getOrders: builder.query<{ data: IOrder[] }, void>({
      query: () => ({
        url: '/orders',
        method: 'GET',
      })
    }),

    // READ (Get Orders by userId)
    getSingleUserOrders: builder.query<{ data: IOrder[] }, void>({
      query: () => ({
        url: '/orders/single-user-orders',
        method: 'GET',
      })
    }),
    // READ (Get a Specific Order by ID)
    getSingleOrderById: builder.query<{ data: IOrder }, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      })
    }),

    // UPDATE Order (e.g., Order Status)
    updateOrder: builder.mutation({
      query: ({ id, updatedOrder }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: updatedOrder,
      })
    }),

    // DELETE Order
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      })
     }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetSingleUserOrdersQuery,
  useGetOrdersQuery,
  useGetSingleOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;