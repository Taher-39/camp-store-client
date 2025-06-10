import { baseApi } from "@/redux/api/baseApi";
import { IOrder } from "@/types";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE Order
    createOrder: builder.mutation({
      query: (orderData) => {
        console.log("orderData from orderApi: ", orderData);
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

    // READ (Get a Specific Order by ID)
    getOrder: builder.query<{ data: IOrder }, string>({
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
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;